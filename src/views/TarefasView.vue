<template>
  <div>
    <FormularioTarefa 
      :tarefaEmEdicao="tarefaEmEdicao" 
      @salvarTarefa="salvarTarefaFormulario"
      @cancelarEdicao="fecharModal"
    />
    <ModalTarefa 
      :aberto="exibirModal" 
      :acao="modoModal"
      :tarefa="tarefaEmEdicao"
      @aoFechar="fecharModal"
      @aoSalvar="salvarTarefa"
    />
    <ListaTarefas v-if="tarefas.length" :tarefas="tarefas" @editar="editarTarefa" @deletar="apagarTarefa" />
    <div v-else>
      <BoxPadrao>
        Você não está muito produtivo hoje :(
      </BoxPadrao>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import FormularioTarefa from '../components/FormularioTarefa.vue';
import ListaTarefas from '../components/ListaTarefas.vue';
import ModalTarefa from '../components/ModalTarefa.vue';
import BoxPadrao from '../components/BoxPadrao.vue';
import IProjeto from '../interfaces/IProjeto';
import { tipoNotificacao } from '@/interfaces/INotificacao';
import useNotificador from '@/hooks/notificador';
import { useStore } from '@/store';
import { useTarefasModal } from '@/composables/useTarefasModal';
import { CRIAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS } from '@/store/tipoAcoes';

interface DadosTarefa {
  descricao: string;
  tempoDecorrido: number;
  projeto: IProjeto;
  id?: string;
}

export default defineComponent({
  name: 'TarefasView',
  setup() {
    const store = useStore();
    const { notificar } = useNotificador();
    const tarefasModal = useTarefasModal();

    onMounted(async () => {
      try {
        await Promise.all([
          store.dispatch(OBTER_TAREFAS),
          store.dispatch(OBTER_PROJETOS)
        ]);
      } catch {
        notificar('Erro ao carregar dados', 'Não foi possível carregar tarefas e projetos.', tipoNotificacao.ERRO);
      }
    });

    async function salvarTarefaFormulario(dados: DadosTarefa): Promise<void> {
      const { descricao, tempoDecorrido, projeto, id } = dados;

      if (id && tarefasModal.tarefaEmEdicao.value) {
        await tarefasModal.salvarTarefa(descricao, tempoDecorrido, projeto.id);
        return;
      }

      try {
        await store.dispatch(CRIAR_TAREFA, {
          descricao,
          tempoDecorrido,
          projeto
        });
        notificar('Tarefa criada', 'A tarefa foi criada com sucesso!', tipoNotificacao.SUCESSO);
        tarefasModal.limparEstadoModal();
      } catch {
        notificar('Erro ao criar tarefa', 'Não foi possível criar a tarefa.', tipoNotificacao.ERRO);
      }
    }

    return {
      ...tarefasModal,
      salvarTarefaFormulario
    };
  },
  components: { FormularioTarefa, ListaTarefas, BoxPadrao, ModalTarefa },
});
</script>

<style></style>
