export const NOMES_ROTAS = {
    TAREFAS: 'Tarefas',
    NOVA_TAREFA: 'NovaTarefa',
    EDITAR_TAREFA: 'EditarTarefa',
    PROJETOS: 'Projetos',
    NOVO_PROJETO: 'NovoProjeto',
    EDITAR_PROJETO: 'EditarProjeto'
} as const;

export type NomeRota = typeof NOMES_ROTAS[keyof typeof NOMES_ROTAS];