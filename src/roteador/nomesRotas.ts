export const NOMES_ROTAS = {
    TAREFAS: 'Tarefas',
    PROJETOS: 'Projetos',
    NOVO_PROJETO: 'NovoProjeto',
    EDITAR_PROJETO: 'EditarProjeto'
} as const;

export type NomeRota = typeof NOMES_ROTAS[keyof typeof NOMES_ROTAS];