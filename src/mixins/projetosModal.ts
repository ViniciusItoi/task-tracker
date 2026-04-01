import { defineComponent } from 'vue';
import IProjeto from '@/interfaces/IProjeto';
import { tipoNotificacao } from '@/interfaces/INotificacao';
import { NOMES_ROTAS } from '@/roteador/nomesRotas';
import { store } from '@/store';
import { ADICIONAR_PROJETO, APAGAR_PROJETO, EDITAR_PROJETO } from '@/store/tipoMutacoes';
import useNotificador from '@/hooks/notificador';

type ModoModal = 'Criar' | 'Editar';
const { notificar } = useNotificador();

export const projetosModalMixin = defineComponent({
    data() {
        return {
            exibirModal: false,
            modoModal: 'Criar' as ModoModal,
            projetoEmEdicao: null as IProjeto | null
        };
    },
    computed: {
        projetos(): IProjeto[] {
            return store.state.projetos;
        }
    },
    watch: {
        '$route.fullPath': {
            immediate: true,
            handler(): void {
                this.sincronizarModalComRota();
            }
        }
    },
    methods: {
        limparEstadoModal(): void {
            this.exibirModal = false;
            this.projetoEmEdicao = null;
            this.modoModal = 'Criar';
        },
        sincronizarModalComRota(): void {
            if (this.$route.name === NOMES_ROTAS.NOVO_PROJETO) {
                this.modoModal = 'Criar';
                this.projetoEmEdicao = null;
                this.exibirModal = true;
                return;
            }

            const projetoId = this.$route.params.id as string | undefined;

            if (projetoId) {
                const projeto = store.state.projetos.find((item: IProjeto) => item.id === projetoId);

                if (!projeto) {
                    this.$router.replace({ name: NOMES_ROTAS.PROJETOS });
                    return;
                }

                this.modoModal = 'Editar';
                this.projetoEmEdicao = { ...projeto };
                this.exibirModal = true;
                return;
            }

            this.limparEstadoModal();
        },
        abrirModalCriacao(): void {
            this.$router.push({ name: NOMES_ROTAS.NOVO_PROJETO });
        },
        salvarProjeto(nome: string, descricao: string): void {
            if (this.projetoEmEdicao) {
                store.commit(EDITAR_PROJETO, {
                    ...this.projetoEmEdicao,
                    nome,
                    descricao
                });
                notificar('Projeto editado', `O projeto "${nome}" foi editado com sucesso!`, tipoNotificacao.SUCESSO);
            } else {
                store.commit(ADICIONAR_PROJETO, { nome, descricao });
                notificar('Projeto criado', `O projeto "${nome}" foi criado com sucesso!`, tipoNotificacao.SUCESSO);
            }

            this.$router.push({ name: NOMES_ROTAS.PROJETOS });
        },
        apagarProjeto(id: string): void {
            store.commit(APAGAR_PROJETO, id);
            notificar('Projeto apagado', 'O projeto foi apagado com sucesso!', tipoNotificacao.SUCESSO);

            if (this.$route.params.id === id) {
                this.$router.replace({ name: NOMES_ROTAS.PROJETOS });
            }
        },
        editarProjeto(projetoEditado: IProjeto): void {
            this.$router.push({
                name: NOMES_ROTAS.EDITAR_PROJETO,
                params: { id: projetoEditado.id }
            });
        },
        fecharModal(): void {
            if (this.$route.name !== NOMES_ROTAS.PROJETOS) {
                this.$router.push({ name: NOMES_ROTAS.PROJETOS });
                return;
            }

            this.limparEstadoModal();
        }
    },
});