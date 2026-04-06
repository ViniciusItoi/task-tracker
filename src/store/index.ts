import IProjeto from "@/interfaces/IProjeto";
import { gerarUuidV4 } from "@/utils/uuid";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { NOTIFICAR, DEFINIR_TAREFAS, ADICIONAR_TAREFA, ALTERAR_TAREFA, REMOVER_TAREFA } from "./tipoMutacoes";
import { INotificacao } from "@/interfaces/INotificacao";
import {  OBTER_TAREFAS, CRIAR_TAREFA, EDITAR_TAREFA, APAGAR_TAREFA } from "./tipoAcoes";
import http from "@/http";
import ITarefa from "@/interfaces/ITarefa";
import { EstadoProjeto, projeto } from "./modulos/projeto";
import { EstadoTarefa, tarefa } from "./modulos/tarefa";

export const gerarId = (): string => gerarUuidV4();
export interface Estado {
    projeto: EstadoProjeto;
    tarefa: EstadoTarefa;
    notificacoes: INotificacao[];
}

export const key: InjectionKey<Store<Estado>> = Symbol("store");

export const store = createStore<Estado>({
    state: {
        projeto: { projetos: [] },
        tarefa: { tarefas: [] },
        notificacoes: [],
    },
    mutations: {
        
        [NOTIFICAR](state, { titulo, texto, tipo }: { titulo: string, texto: string, tipo: INotificacao['tipo'] }) {
            const notificacao = { id: gerarId(), titulo, texto, tipo } as INotificacao;
            state.notificacoes.push(notificacao);
            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(notificacaoAtual => notificacaoAtual.id !== notificacao.id);
            }, 3000);
        }
    },
    modules: {
        projeto,
        tarefa
    }
});

export function useStore(): Store<Estado> {
    return vuexUseStore(key);
}