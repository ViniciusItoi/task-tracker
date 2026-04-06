import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import IProjeto from '@/interfaces/IProjeto';
import { tipoNotificacao } from '@/interfaces/INotificacao';
import useNotificador from '@/hooks/notificador';
import { NOMES_ROTAS } from '@/roteador/nomesRotas';
import { useStore } from '@/store';
import { APAGAR_PROJETO, CRIAR_PROJETO, EDITAR_PROJETO } from '@/store/tipoAcoes';

type ModoModal = 'Criar' | 'Editar';

export function useProjetosModal() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const { notificar } = useNotificador();

    const exibirModal = ref(false);
    const modoModal = ref<ModoModal>('Criar');
    const projetoEmEdicao = ref<IProjeto | null>(null);

    const projetos = computed(() => store.state.projeto?.projetos ?? []);

    function limparEstadoModal(): void {
        exibirModal.value = false;
        projetoEmEdicao.value = null;
        modoModal.value = 'Criar';
    }

    function sincronizarModalComRota(): void {
        if (route.name === NOMES_ROTAS.NOVO_PROJETO) {
            modoModal.value = 'Criar';
            projetoEmEdicao.value = null;
            exibirModal.value = true;
            return;
        }

        const projetoId = route.params.id as string | undefined;

        if (projetoId) {
            const projeto = (store.state.projeto?.projetos ?? []).find((item: IProjeto) => item.id === projetoId);

            if (!projeto) {
                notificar('Projeto não encontrado', 'O projeto solicitado não foi localizado.', tipoNotificacao.ERRO);
                router.replace({ name: NOMES_ROTAS.PROJETOS });
                return;
            }

            modoModal.value = 'Editar';
            projetoEmEdicao.value = { ...projeto };
            exibirModal.value = true;
            return;
        }

        limparEstadoModal();
    }

    function abrirModalCriacao(): void {
        router.push({ name: NOMES_ROTAS.NOVO_PROJETO });
    }

    async function salvarProjeto(nome: string, descricao: string): Promise<void> {
        try {
            if (projetoEmEdicao.value) {
                await store.dispatch(EDITAR_PROJETO, {
                    ...projetoEmEdicao.value,
                    nome,
                    descricao
                });
                notificar('Projeto editado', `O projeto "${nome}" foi editado com sucesso!`, tipoNotificacao.SUCESSO);
            } else {
                await store.dispatch(CRIAR_PROJETO, { nome, descricao });
                notificar('Projeto criado', `O projeto "${nome}" foi criado com sucesso!`, tipoNotificacao.SUCESSO);
            }

            router.push({ name: NOMES_ROTAS.PROJETOS });
        } catch {
            notificar('Erro ao salvar projeto', 'Não foi possível salvar o projeto.', tipoNotificacao.ERRO);
        }
    }

    async function apagarProjeto(id: string): Promise<void> {
        try {
            await store.dispatch(APAGAR_PROJETO, id);
            notificar('Projeto apagado', 'O projeto foi apagado com sucesso!', tipoNotificacao.SUCESSO);

            if (route.params.id === id) {
                router.replace({ name: NOMES_ROTAS.PROJETOS });
            }
        } catch {
            notificar('Erro ao apagar projeto', 'Não foi possível apagar o projeto.', tipoNotificacao.ERRO);
        }
    }

    function editarProjeto(projetoEditado: IProjeto): void {
        router.push({
            name: NOMES_ROTAS.EDITAR_PROJETO,
            params: { id: projetoEditado.id }
        });
    }

    function fecharModal(): void {
        if (route.name !== NOMES_ROTAS.PROJETOS) {
            router.push({ name: NOMES_ROTAS.PROJETOS });
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
        projetoEmEdicao,
        projetos,
        limparEstadoModal,
        abrirModalCriacao,
        salvarProjeto,
        apagarProjeto,
        editarProjeto,
        fecharModal
    };
}
