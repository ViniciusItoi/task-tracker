import IProjeto from "@/interfaces/IProjeto";
import { gerarUuidV4 } from "@/utils/uuid";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { NOTIFICAR, ADICIONAR_PROJETO, APAGAR_PROJETO, EDITAR_PROJETO } from "./tipoMutacoes";
import { INotificacao } from "@/interfaces/INotificacao";

export const gerarId = (): string => gerarUuidV4();

interface Estado {
    projetos: IProjeto[];
    notificacoes: INotificacao[];
}

export const key: InjectionKey<Store<Estado>> = Symbol("store");

export const store = createStore<Estado>({
    state: {
        projetos: [],
        notificacoes: [],
    },
    mutations: {
        [ADICIONAR_PROJETO](state, {nome, descricao}: {nome: string, descricao: string}) {
            const projeto =  {id: gerarId(),
                nome: nome,
                descricao: descricao,
             } as IProjeto;
            state.projetos.push(projeto);
        },
        [APAGAR_PROJETO](state, id: string) {
            state.projetos = state.projetos.filter(projeto => projeto.id !== id);
        },
        [EDITAR_PROJETO](state, projetoEditado: IProjeto) {
            const index = state.projetos.findIndex(projeto => projeto.id === projetoEditado.id);
            if (index !== -1) {
                state.projetos[index] = projetoEditado;
            } else {
                console.warn(`Projeto com ID ${projetoEditado.id} não encontrado para edição.`);
            }
        },
        [NOTIFICAR](state, {titulo, texto, tipo}: {titulo: string, texto: string, tipo: INotificacao['tipo']}) {
            const notificacao = { id: gerarId(), titulo, texto, tipo } as INotificacao;
            state.notificacoes.push(notificacao);
                setTimeout(() => {
                    state.notificacoes = state.notificacoes.filter(notificacaoAtual => notificacaoAtual.id !== notificacao.id);
                }, 3000);
        }
    }
});

export function useStore(): Store<Estado> {
    return vuexUseStore(key);
}