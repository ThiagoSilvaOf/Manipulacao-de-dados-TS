import moedaParaNumero from "./moedaParaNumero.js";

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

  interface transacao {
    status: TransacaoStatus;
    id: number;
    data: string;
    nome: string;
    email: string;
    moeda: string;
    valor: number | null;
    pagamento: TransacaoPagamento;
    novo: boolean;
  }
}

export default function normalizarTransacao(transacao: TransacaoAPI) {
  return {
    status: transacao.Status,
    id: transacao.ID,
    data: transacao.Data,
    nome: transacao.Nome,
    email: transacao.Email,
    moeda: transacao["Valor (R$)"],
    valor:moedaParaNumero(transacao["Valor (R$)"]),
    pagamento: transacao["Forma de Pagamento"],
    novo:Boolean(transacao["Cliente Novo"]),
  };
}
