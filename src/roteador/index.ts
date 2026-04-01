import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import TarefasView from "../views/TarefasView.vue";
import ProjetosView from "@/views/ProjetosView.vue";
import { NOMES_ROTAS } from "./nomesRotas";

const rotas: RouteRecordRaw[] = [
    {
        path: "/",
        name: NOMES_ROTAS.TAREFAS,
        component: TarefasView
    },
    {
        path: "/projetos",
        children: [
            {
                path: "",
                name: NOMES_ROTAS.PROJETOS,
                component: ProjetosView
            },
            {
                path: "novo",
                name: NOMES_ROTAS.NOVO_PROJETO,
                component: ProjetosView
            },
            {
                path: ":id",
                name: NOMES_ROTAS.EDITAR_PROJETO,
                component: ProjetosView,
                props: route => ({ projetoId: String(route.params.id) })
            },
            {
                path: ":pathMatch(.*)*",
                redirect: { name: NOMES_ROTAS.PROJETOS }
            }
        ]
    }
];

const roteador = createRouter({
    history: createWebHashHistory(),
    routes: rotas
});

export default roteador;