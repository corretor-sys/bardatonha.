// O cartaz não especifica os volumes das cervejas. Preços seguem a ordem do cartaz.
const produtos = [
  ["Pepsi, Guaraná ou Fanta", "Refrigerantes", "Garrafa de 2 L", "11,99", "refri"],
  ["Red Bull", "Energéticos", "Lata de 250 ml", "11,99", "energia"],
  ["Gatorade", "Isotônicos", "Garrafa de 500 ml", "4,49", "isotonico"],
  ["H2OH!", "Hidratação", "Garrafa de 500 ml", "4,99", "h2o"],
  ["Água", "Hidratação", "Unidade de 200 ml", "2,50", "agua"],
  ...[
    ["Corona Extra", "8,99 / R$ 13,49", "corona"],
    ["Heineken", "7,99 / R$ 13,49", "heineken"],
    ["Stella Artois", "7,99 / R$ 12,99", "stella"],
    ["Budweiser", "7,99", "bud"],
    ["Spaten", "6,99 / R$ 11,49", "spaten"],
    ["Brahma", "9,49 / R$ 10,49", "brahma"],
    ["Skol", "8,49 / R$ 9,99", "skol"],
    ["Antarctica", "9,49", "antarctica"]
  ].map(([nome, preco, foto]) => [nome, "Cervejas", "Consultar apresentação no bar", preco, foto])
].map(([nome, categoria, descricao, preco, foto]) => ({
  nome, categoria, descricao, preco, foto, disponibilidade: "Consultar disponibilidade"
}));

// Para adicionar uma atração, use { artista, data, horario, cartaz }.
// O cartaz é opcional e corresponde ao nome de uma imagem em assets/.
const eventos = [];
const galeria = [
  {foto:"fachada", nome:"A varanda do Bar da Tonha", categorias:["Ambiente"]},
  {foto:"sinuca", nome:"Sinuca na varanda", categorias:["Ambiente","Momentos no bar"]},
  {foto:"brasa", nome:"Carne na brasa", categorias:["Gastronomia","Churrasco"]}
];
