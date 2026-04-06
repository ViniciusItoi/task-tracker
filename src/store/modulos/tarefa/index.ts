import http from "@/http";
import ITarefa from "@/interfaces/ITarefa";
import { Estado } from "@/store";
import { OBTER_TAREFAS, CRIAR_TAREFA, EDITAR_TAREFA, APAGAR_TAREFA } from "@/store/tipoAcoes";
import { DEFINIR_TAREFAS, ADICIONAR_TAREFA, ALTERAR_TAREFA, REMOVER_TAREFA } from "@/store/tipoMutacoes";
import { Module } from "vuex";

export interface EstadoTarefa {
    tarefas: ITarefa[];
}
export const tarefa: Module<EstadoTarefa, Estado> = {
    state: (): EstadoTarefa => ({
        tarefas: []
    }),
    mutations: {
        [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
            state.tarefas = tarefas;
        },
        [ADICIONAR_TAREFA](state, tarefa: ITarefa) {
            state.tarefas.push(tarefa);
        },
        [ALTERAR_TAREFA](state, tarefaEditada: ITarefa) {
            const index = state.tarefas.findIndex(tarefa => tarefa.id === tarefaEditada.id);
            if (index !== -1) {
                state.tarefas[index] = tarefaEditada;
            }
        },
        [REMOVER_TAREFA](state, id: string) {
            state.tarefas = state.tarefas.filter(tarefa => tarefa.id !== id);
        }
    },
    actions: {
        async [OBTER_TAREFAS]({ commit }) {
            const resposta = await http.get('tarefas');
            commit(DEFINIR_TAREFAS, resposta.data);

            return resposta.data;
        },
        async [CRIAR_TAREFA]({ commit }, tarefa: Omit<ITarefa, 'id'>) {
            const resposta = await http.post('tarefas', tarefa);
            commit(ADICIONAR_TAREFA, resposta.data);

            return resposta.data;
        },
        async [EDITAR_TAREFA]({ commit }, tarefaEditada: ITarefa) {
            const resposta = await http.put(`tarefas/${tarefaEditada.id}`, tarefaEditada);
            commit(ALTERAR_TAREFA, resposta.data);

            return resposta.data;
        },
        async [APAGAR_TAREFA]({ commit }, id: string) {
            await http.delete(`tarefas/${id}`);
            commit(REMOVER_TAREFA, id);

        }
    }
}