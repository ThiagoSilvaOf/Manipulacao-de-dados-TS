import fetchData from "./fetchData.js";
import normalizarTransacao from "./normalizarTransacao.js";
async function handleData() {
    const data = await fetchData("https://api.origamid.dev/json/transacoes.json?");
    if (data instanceof Array) {
        const transacoes = data.map((item) => normalizarTransacao(item));
        console.log(transacoes);
    }
}
handleData();
//# sourceMappingURL=script.js.map