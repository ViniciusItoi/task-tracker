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
import { defineComponent, computed } from 'vue';
import TemporizadorTarefa from './TemporizadorTarefa.vue';
import { useStore } from '@/store';
import { tipoNotificacao } from '@/interfaces/INotificacao';
import useNotificador from '@/hooks/notificador';


export default defineComponent({
  name: 'FormularioTarefa',
  emits: ['salvarTarefa'],
  components: {
    TemporizadorTarefa
  },
  data() {
    return {
      descricao: '',
      idProjeto: ''
    }
  },
  methods: {
    finalizarTarefa(tempoDecorrido: number): void {
      const projeto = this.projetos.find((p) => p.id === this.idProjeto);
      if (!projeto) {
        this.notificar('Erro ao finalizar a tarefa', `Adicione um projeto.`, tipoNotificacao.ERRO);
        return;
      }
      this.$emit('salvarTarefa', {
        descricao: this.descricao,
        tempoDecorrido,
        projeto: projeto
      });
      this.descricao = '';
    }
  },
  setup() {
    const store = useStore();
    const {notificar} = useNotificador();
    return {
      projetos: computed(() => store.state.projetos),
      notificar
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