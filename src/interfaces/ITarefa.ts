import IProjeto from "./IProjeto";

interface ITarefa {
  descricao: string;
  tempoDecorrido: number;
  projeto: IProjeto;
  id: string;
}

export default ITarefa;