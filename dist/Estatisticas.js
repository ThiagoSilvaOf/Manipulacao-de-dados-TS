function filtrarValor(transacao) {
    return transacao.valor !== null;
}
export default class Estatisticas {
    transacoes;
    total;
    pagamento;
    status;
    semana;
    melhorDia;
    constructor(transacoes) {
        this.transacoes = transacoes;
        this.total = this.setTotal();
        this.pagamento = this.setPagamento();
        this.status = this.setStatus();
        this.semana = this.setSemana();
        this.melhorDia = this.setMelhorDia();
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
    setSemana() {
        const semana = {
            Domingo: 0,
            Segunda: 0,
            ["Terça-Feira"]: 0,
            ["Quarta-Feira"]: 0,
            ["Quinta-Feira"]: 0,
            ["Sexta-Feira"]: 0,
            Sabado: 0,
        };
        for (let i = 0; i < this.transacoes.length; i++) {
            const diasDaSemana = this.transacoes[i].data.getDay();
            if (diasDaSemana === 0)
                semana.Domingo += 1;
            if (diasDaSemana === 1)
                semana.Segunda += 1;
            if (diasDaSemana === 2)
                semana["Terça-Feira"] += 1;
            if (diasDaSemana === 3)
                semana["Quarta-Feira"] += 1;
            if (diasDaSemana === 4)
                semana["Quinta-Feira"] += 1;
            if (diasDaSemana === 5)
                semana["Sexta-Feira"] += 1;
            if (diasDaSemana === 6)
                semana.Sabado += 1;
        }
        return semana;
    }
    setMelhorDia() {
        return Object.entries(this.semana).sort().at(-1);
    }
}
//# sourceMappingURL=Estatisticas.js.map