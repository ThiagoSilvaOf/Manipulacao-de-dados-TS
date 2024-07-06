function filtrarValor(transacao) {
    return transacao.valor !== null;
}
export default class Estatisticas {
    transacoes;
    total;
    pagamento;
    status;
    constructor(transacoes) {
        this.transacoes = transacoes;
        this.total = this.setTotal();
        this.pagamento = this.setPagamento();
        this.status = this.setStatus();
    }
    setTotal() {
        return this.transacoes.filter(filtrarValor).reduce((acc, item) => {
            return acc + item.valor;
        }, 0);
    }
    setPagamento() {
        const pagamentos = this.transacoes.map(item => item.pagamento);
        const totalCartao = pagamentos.filter(pagamento => pagamento === "Cartão de Crédito").length;
        const totalBoleto = pagamentos.filter(pagamento => pagamento === "Boleto").length;
        return { ["Cartão de credito"]: totalCartao, ["Boleto"]: totalBoleto };
    }
    setStatus() {
        const status = this.transacoes.map(item => item.status);
        const totalPaga = status.filter(situacao => situacao === "Paga").length;
        const totalRecusada = status.filter(situacao => situacao === "Recusada pela operadora de cartão").length;
        const totalEstornada = status.filter(situacao => situacao === "Estornada").length;
        const totalAguardando = status.filter(situacao => situacao === "Aguardando pagamento").length;
        return {
            ["paga"]: totalPaga,
            ["Recusada pela operadora de cartão"]: totalRecusada,
            ["Estornada"]: totalEstornada,
            ["Aguardando pagamento"]: totalAguardando
        };
    }
}
//# sourceMappingURL=Estatisticas.js.map