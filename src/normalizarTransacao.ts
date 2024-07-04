import moedaParaNumero from "./moedaParaNumero.js";
import stringToDate from "./stringToDate.js";

declare global {
  type TransacaoPagamento = "Cartão de Crédito" | "Boleto";
  type TransacaoStatus =
    | "Paga"
    | "Aguardando pagamento"
    | "Recusada pela operadora de cartão"
    | "Estornada";

  export interface TransacaoAPI {
    Status: TransacaoStatus;
    ID: number;
    Data: string;
    Nome: string;
    ["Forma de Pagamento"]: TransacaoPagamento;
    Email: string;
    ["Valor (R$)"]: string;
    ["Cliente Novo"]: number;
  }

  interface Transacao {
    status: TransacaoStatus;
    id: number;
    data: Date; 
    nome: string;
    email: string;
    moeda: string;
    valor: number | null;
    pagamento: TransacaoPagamento;
    novo: boolean;
  }
}

export default function normalizarTransacao(transacao: TransacaoAPI) : Transacao{
  return {
    status: transacao.Status,
    id: transacao.ID,
    data: stringToDate(transacao.Data),
    nome: transacao.Nome,
    email: transacao.Email,
    moeda: transacao["Valor (R$)"],
    valor:moedaParaNumero(transacao["Valor (R$)"]),
    pagamento: transacao["Forma de Pagamento"],
    novo:Boolean(transacao["Cliente Novo"]),
  };
}
