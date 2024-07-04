export default function stringToDate(texto: string): Date {
  const [data, tempo] = texto.split(" ");
  const [dia, mes, ano] = data.split("/").map((itens) => Number(itens));
  const [hora, minuto] = tempo.split(":").map((itens) => Number(itens));
  return new Date(ano, mes - 1, dia, hora, minuto);
}
