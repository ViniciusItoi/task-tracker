export enum tipoNotificacao {
    SUCESSO = 'success',
    ERRO = 'danger',
    ATENCAO = 'warning'
}

export interface INotificacao {
    titulo: string;
    texto: string;
    tipo: tipoNotificacao;
    id: string;
}