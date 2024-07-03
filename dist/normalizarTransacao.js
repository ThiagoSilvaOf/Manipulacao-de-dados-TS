export default function normalizarTransacao(transacao) {
    return {
        status: transacao.Status,
        id: transacao.ID,
        data: transacao.Data,
        nome: transacao.Nome,
        email: transacao.Email,
        moeda: transacao["Valor (R$)"],
        valor: 0,
        pagamento: transacao["Forma de Pagamento"],
        novo: Boolean(transacao["Cliente Novo"]),
    };
}
//# sourceMappingURL=normalizarTransacao.js.map