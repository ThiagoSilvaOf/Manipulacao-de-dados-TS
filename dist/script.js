import Estatisticas from "./Estatisticas.js";
import fetchData from "./fetchData.js";
import normalizarTransacao from "./normalizarTransacao.js";
async function handleData() {
    const data = await fetchData("https://api.origamid.dev/json/transacoes.json?");
    if (!data)
        return null;
    const transacoes = data.map((item) => normalizarTransacao(item));
    preencherTabela(transacoes);
    preencherEstatisticas(transacoes);
}
function preencherEstatisticas(transacoes) {
    const data = new Estatisticas(transacoes);
    console.log(data);
    const totalElement = document.querySelector("#total span");
    if (totalElement) {
        totalElement.innerText = data.total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    }
    const pagamentoElement = document.getElementById("pagamento");
    if (pagamentoElement) {
        pagamentoElement.innerHTML += `
        <p>Cartão de Credito: ${data.pagamento["Cartão de credito"]}</p>
        <p>Boleto: ${data.pagamento.Boleto}</p>`;
    }
    const statusElement = document.getElementById("status");
    if (statusElement) {
        statusElement.innerHTML += `
        <p>Pago: ${data.status.paga}</p>
        <p>Aguardando pagamento: ${data.status["Aguardando pagamento"]}</p>
        <p>Estornada: ${data.status.Estornada}</p>
        <p>Recusada pela operadora de cartão: ${data.status["Recusada pela operadora de cartão"]}</p>`;
    }
    const diaElement = document.querySelector("#dia span");
    if (diaElement) {
        diaElement.innerText = `${data.melhorDia?.[0]}`;
    }
}
function preencherTabela(transacoes) {
    const tabela = document.querySelector("#transacoes tbody");
    if (!tabela)
        return;
    transacoes.forEach((transacao) => {
        tabela.innerHTML += `
      <tr>
        <td>${transacao.nome}</td>
        <td>${transacao.email}</td>
        <td>${transacao.pagamento}</td>
        <td>R$${transacao.moeda}</td>
        <td>${transacao.status}</td>
      </tr>
    `;
    });
}
handleData();
//# sourceMappingURL=script.js.map