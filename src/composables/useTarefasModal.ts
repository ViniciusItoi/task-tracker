import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ITarefa from '@/interfaces/ITarefa';
import { tipoNotificacao } from '@/interfaces/INotificacao';
import useNotificador from '@/hooks/notificador';
import { NOMES_ROTAS } from '@/roteador/nomesRotas';
import { useStore } from '@/store';
import { APAGAR_TAREFA, CRIAR_TAREFA, EDITAR_TAREFA } from '@/store/tipoAcoes';

type ModoModal = 'Criar' | 'Editar';

export function useTarefasModal() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const { notificar } = useNotificador();

    const exibirModal = ref(false);
    const modoModal = ref<ModoModal>('Criar');
    const tarefaEmEdicao = ref<ITarefa | null>(null);

    const tarefas = computed(() => store.state.tarefa?.tarefas ?? []);

    function limparEstadoModal(): void {
        exibirModal.value = false;
        tarefaEmEdicao.value = null;
        modoModal.value = 'Criar';
    }

    function sincronizarModalComRota(): void {
        if (route.name === NOMES_ROTAS.NOVA_TAREFA) {
            modoModal.value = 'Criar';
            tarefaEmEdicao.value = null;
            exibirModal.value = true;
            return;
        }

        const tarefaId = route.params.id as string | undefined;

        if (tarefaId) {
            const tarefa = (store.state.tarefa?.tarefas ?? []).find((item: ITarefa) => item.id === tarefaId);

            if (!tarefa) {
                notificar('Tarefa não encontrada', 'A tarefa solicitada não foi localizada.', tipoNotificacao.ERRO);
                router.replace({ name: NOMES_ROTAS.TAREFAS });
                return;
            }

            modoModal.value = 'Editar';
            tarefaEmEdicao.value = { ...tarefa };
            exibirModal.value = true;
            return;
        }

        limparEstadoModal();
    }

    function abrirModalCriacao(): void {
        router.push({ name: NOMES_ROTAS.NOVA_TAREFA });
    }

    async function salvarTarefa(descricao: string, tempoDecorrido: number, projetoId: string): Promise<void> {
        const projeto = (store.state.projeto?.projetos ?? []).find((item) => item.id === projetoId);

        if (!projeto) {
            notificar('Erro', 'Projeto inválido', tipoNotificacao.ERRO);
            return;
        }

        try {
            if (tarefaEmEdicao.value) {
                await store.dispatch(EDITAR_TAREFA, {
                    ...tarefaEmEdicao.value,
                    descricao,
                    tempoDecorrido,
                    projeto
                });
                notificar('Tarefa editada', 'A tarefa foi editada com sucesso!', tipoNotificacao.SUCESSO);
            } else {
                await store.dispatch(CRIAR_TAREFA, {
                    descricao,
                    tempoDecorrido,
                    projeto
                });
                notificar('Tarefa criada', 'A tarefa foi criada com sucesso!', tipoNotificacao.SUCESSO);
            }

            router.push({ name: NOMES_ROTAS.TAREFAS });
        } catch {
            notificar('Erro ao salvar tarefa', 'Não foi possível salvar a tarefa.', tipoNotificacao.ERRO);
        }
    }

    async function apagarTarefa(id: string): Promise<void> {
        try {
            await store.dispatch(APAGAR_TAREFA, id);
            notificar('Tarefa apagada', 'A tarefa foi apagada com sucesso!', tipoNotificacao.SUCESSO);

            if (route.params.id === id) {
                router.replace({ name: NOMES_ROTAS.TAREFAS });
            }
        } catch {
            notificar('Erro ao apagar tarefa', 'Não foi possível apagar a tarefa.', tipoNotificacao.ERRO);
        }
    }

    function editarTarefa(tarefaEditada: ITarefa): void {
        router.push({
            name: NOMES_ROTAS.EDITAR_TAREFA,
            params: { id: tarefaEditada.id }
        });
    }

    function fecharModal(): void {
        if (route.name !== NOMES_ROTAS.TAREFAS) {
            router.push({ name: NOMES_ROTAS.TAREFAS });
            return;
        }

        limparEstadoModal();
    }

    watch(
        () => route.fullPath,
        () => {
            sincronizarModalComRota();
        },
        { immediate: true }
    );

    return {
        exibirModal,
        modoModal,
        tarefaEmEdicao,
        tarefas,
        limparEstadoModal,
        abrirModalCriacao,
        salvarTarefa,
        apagarTarefa,
        editarTarefa,
        fecharModal
    };
}
