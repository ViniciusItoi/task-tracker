import IProjeto from "@/interfaces/IProjeto";
import { Estado } from "@/store";
import { APAGAR_PROJETO, CRIAR_PROJETO, EDITAR_PROJETO, OBTER_PROJETOS } from "@/store/tipoAcoes";
import { ADICIONAR_PROJETO, ALTERAR_PROJETO, DEFINIR_PROJETOS, REMOVER_PROJETO } from "@/store/tipoMutacoes";
import { Module } from "vuex";
import http from "@/http";

export interface EstadoProjeto {
    projetos: IProjeto[];
}

export const projeto: Module<EstadoProjeto, Estado> = {
    state: (): EstadoProjeto => ({
        projetos: []
    }),
    mutations: {
        [ADICIONAR_PROJETO](state, projeto: IProjeto) {
            state.projetos.push(projeto);
        },
        [REMOVER_PROJETO](state, id: string) {
            state.projetos = state.projetos.filter(projeto => projeto.id !== id);
        },
        [ALTERAR_PROJETO](state, projetoEditado: IProjeto) {
            const index = state.projetos.findIndex(projeto => projeto.id === projetoEditado.id);
            if (index !== -1) {
                state.projetos[index] = projetoEditado;
            }
        },
        [DEFINIR_PROJETOS](state, projetos: IProjeto[]) {
            state.projetos = projetos;
        }
    },
    actions: {
        async [OBTER_PROJETOS]({ commit }) {
            const resposta = await http.get('projetos');
            commit(DEFINIR_PROJETOS, resposta.data);

            return resposta.data;
        },
        async [CRIAR_PROJETO]({ commit }, { nome, descricao }: { nome: string, descricao: string }) {
            const resposta = await http.post('projetos', { nome, descricao });
            commit(ADICIONAR_PROJETO, resposta.data);

            return resposta.data;
        },
        async [EDITAR_PROJETO]({ commit }, projetoEditado: IProjeto) {
            const resposta = await http.put(`projetos/${projetoEditado.id}`, projetoEditado);
            commit(ALTERAR_PROJETO, resposta.data);

            return resposta.data;
        },
        async [APAGAR_PROJETO]({ commit }, id: string) {
            await http.delete(`projetos/${id}`);
            commit(REMOVER_PROJETO, id);
        }
    }
}