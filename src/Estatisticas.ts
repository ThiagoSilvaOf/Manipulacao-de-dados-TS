type TransacaoValor = Transacao & {
  valor: Number;
};
function filtrarValor(transacao: Transacao): transacao is TransacaoValor {
  return transacao.valor !== null;
}

export default class Estatisticas {
  private transacoes: Transacao[];
  public total;

  constructor(transacoes: Transacao[]) {
    this.transacoes = transacoes;
    this.total = this.setTotal();
  }

  private setTotal() {
    return this.transacoes.filter(filtrarValor).reduce((acc, item) => {
      return acc + item.valor;
    }, 0);
  }
}
