import { tipoNotificacao } from "@/interfaces/INotificacao";
import { store } from "@/store";
import { NOTIFICAR } from "@/store/tipoMutacoes";

type Notificador = {
    notificar: (titulo: string, texto: string, tipo: tipoNotificacao) => void
}

export default ():Notificador => {
    const notificar = (titulo: string, texto: string, tipo: tipoNotificacao): void => {
        store.commit(NOTIFICAR, { tipo, titulo, texto });
    };

    return {
        notificar
    };
}