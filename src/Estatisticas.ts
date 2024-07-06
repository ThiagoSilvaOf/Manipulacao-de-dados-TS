type TransacaoValor = Transacao & {
  valor: Number;
};
function filtrarValor(transacao: Transacao): transacao is TransacaoValor {
  return transacao.valor !== null;
}

export default class Estatisticas {
  private transacoes: Transacao[];
  public total;
  public pagamento;
  public status;

  constructor(transacoes: Transacao[]) {
    this.transacoes = transacoes;
    this.total = this.setTotal();
    this.pagamento = this.setPagamento();
    this.status = this.setStatus();
  }

  private setTotal() {
    return this.transacoes.filter(filtrarValor).reduce((acc, item) => {
      return acc + item.valor;
    }, 0);
  }

  private setPagamento(){
    const pagamentos = this.transacoes.map(item => item.pagamento);
    const totalCartao = pagamentos.filter(pagamento => pagamento === "Cartão de Crédito").length;
    const totalBoleto = pagamentos.filter(pagamento => pagamento === "Boleto").length;
    return {["Cartão de credito"]:totalCartao, ["Boleto"]:totalBoleto};
  }

  private setStatus(){
    const status = this.transacoes.map(item => item.status);
    const totalPaga = status.filter(situacao => situacao === "Paga").length;
    const totalRecusada = status.filter(situacao => situacao === "Recusada pela operadora de cartão").length;
    const totalEstornada = status.filter(situacao => situacao === "Estornada").length;
    const totalAguardando = status.filter(situacao => situacao === "Aguardando pagamento").length;
    return {
        ["paga"]:totalPaga,
        ["Recusada pela operadora de cartão"]: totalRecusada,
        ["Estornada"]:totalEstornada, 
        ["Aguardando pagamento"]:totalAguardando
       }
  }
}
