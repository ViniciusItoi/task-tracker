<template>
  <div class="box formulario-tarefa">
    <div class="columns">
      <div class="column is-5" role="form" aria-label="Formulário para criação de uma nova tarefa">
        <input id="descricao-tarefa" type="text" class="input" placeholder="Qual tarefa você deseja iniciar?"
          v-model="descricao">
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione o projeto</option>
            <option :value="projeto.id" v-for="projeto in projetos" :key="projeto.id">
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <TemporizadorTarefa @ao-temporizador-finalizado="finalizarTarefa" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType, ref, watch } from 'vue';
import TemporizadorTarefa from './TemporizadorTarefa.vue';
import { useStore } from '@/store';
import { tipoNotificacao } from '@/interfaces/INotificacao';
import useNotificador from '@/hooks/notificador';
import ITarefa from '@/interfaces/ITarefa';


export default defineComponent({
  name: 'FormularioTarefa',
  emits: ['salvarTarefa', 'cancelarEdicao'],
  components: {
    TemporizadorTarefa
  },
  props: {
    tarefaEmEdicao: {
      type: Object as PropType<ITarefa | null>,
      default: null
    }
  },
  setup(props, { emit }) {
    const store = useStore();
    const { notificar } = useNotificador();

    const descricao = ref('');
    const idProjeto = ref('');

    const projetos = computed(() => store.state.projeto.projetos);

    watch(
      () => props.tarefaEmEdicao,
      (nova: ITarefa | null) => {
        if (nova) {
          descricao.value = nova.descricao;
          idProjeto.value = nova.projeto?.id ?? '';
          return;
        }

        descricao.value = '';
        idProjeto.value = '';
      },
      { immediate: true }
    );

    function finalizarTarefa(tempoDecorrido?: number): void {
      const projeto = projetos.value.find((p) => p.id === idProjeto.value);
      if (!projeto) {
        notificar('Erro ao finalizar a tarefa', 'Adicione um projeto.', tipoNotificacao.ERRO);
        return;
      }

      if (!descricao.value.trim()) {
        notificar('Erro', 'Descrição da tarefa é obrigatória.', tipoNotificacao.ERRO);
        return;
      }

      emit('salvarTarefa', {
        descricao: descricao.value,
        tempoDecorrido: tempoDecorrido ?? 0,
        projeto,
        id: props.tarefaEmEdicao?.id
      });
      descricao.value = '';
      idProjeto.value = '';
    }

    function cancelarEdicao(): void {
      descricao.value = '';
      idProjeto.value = '';
      emit('cancelarEdicao');
    }

    return {
      descricao,
      idProjeto,
      projetos,
      finalizarTarefa,
      cancelarEdicao
    }
  }
});
</script>
<style>
.formulario-tarefa {
  background-color: var(--bg-primario);
  color: var(--texto-primario);
}
</style>