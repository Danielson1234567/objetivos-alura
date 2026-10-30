const btnAdicionar = document.getElementById("btn-adicionar");
const containerBotoes = document.getElementById("container-botoes");
const containerTextos = document.getElementById("container-textos");

const listaObjetivos = [];

// Função para adicionar um novo objetivo
function criarNovoObjetivo() {
  const nomeAba = prompt("Digite um nome curto para a aba (ex: Cursos):");
  if (!nomeAba) return;

  const tituloObjetivo = prompt("Digite a descrição do objetivo (ex: Estudar 4 cursos):");
  if (!tituloObjetivo) return;

  const dataFinalInput = prompt("Digite a data final no formato AAAA-MM-DD (ex: 2026-12-31):");
  if (!dataFinalInput) return;

  const id = listaObjetivos.length;
  const dataFinal = new Date(`${dataFinalInput}T23:59:59`);

  listaObjetivos.push({
    id,
    nomeAba,
    tituloObjetivo,
    dataFinal
  });

  renderizarObjetivos();
  selecionarAba(id);
}

// Atualiza e desenha as abas e textos na tela
function renderizarObjetivos() {
  containerBotoes.innerHTML = "";
  containerTextos.innerHTML = "";

  listaObjetivos.forEach((obj, index) => {
    // Cria o botão da aba
    const btn = document.createElement("button");
    btn.classList.add("botao");
    btn.textContent = obj.nomeAba;
    btn.onclick = () => selecionarAba(index);
    containerBotoes.appendChild(btn);

    // Cria o conteúdo da aba
    const aba = document.createElement("div");
    aba.classList.add("aba-conteudo");
    aba.innerHTML = `
      <h3 class="aba-conteudo-titulo-principal">${obj.tituloObjetivo}</h3>
      <h4 class="aba-conteudo-titulo-secundario">Tempo para completar o objetivo</h4>
      <div class="contador">
        <div class="contador-digito">
          <p class="contador-digito-numero" id="dias${index}">0</p>
          <p class="contador-digito-texto">dias</p>
        </div>
        <div class="contador-digito">
          <p class="contador-digito-numero" id="horas${index}">0</p>
          <p class="contador-digito-texto">horas</p>
        </div>
        <div class="contador-digito">
          <p class="contador-digito-numero" id="min${index}">0</p>
          <p class="contador-digito-texto">min</p>
        </div>
        <div class="contador-digito">
          <p class="contador-digito-numero" id="seg${index}">0</p>
          <p class="contador-digito-texto">seg</p>
        </div>
      </div>
    `;
    containerTextos.appendChild(aba);
  });
}

// Troca de aba
function selecionarAba(index) {
  const botoes = document.querySelectorAll(".botao");
  const abas = document.querySelectorAll(".aba-conteudo");

  botoes.forEach((btn, i) => {
    btn.classList.toggle("ativo", i === index);
  });

  abas.forEach((aba, i) => {
    aba.classList.toggle("ativo", i === index);
  });
}

// Cálculo da contagem regressiva
function calculaTempo(tempoObjetivo) {
  let tempoAtual = new Date();
  let tempoFinal = tempoObjetivo - tempoAtual;

  if (tempoFinal <= 0) return [0, 0, 0, 0];

  let segundos = Math.floor(tempoFinal / 1000);
  let minutos = Math.floor(segundos / 60);
  let horas = Math.floor(minutos / 60);
  let dias = Math.floor(horas / 24);

  return [dias, horas % 24, minutos % 60, segundos % 60];
}

function atualizaCronometro() {
  listaObjetivos.forEach((obj, i) => {
    const tempo = calculaTempo(obj.dataFinal);
    const elemDias = document.getElementById(`dias${i}`);
    if (elemDias) {
      elemDias.textContent = tempo[0];
      document.getElementById(`horas${i}`).textContent = tempo[1];
      document.getElementById(`min${i}`).textContent = tempo[2];
      document.getElementById(`seg${i}`).textContent = tempo[3];
    }
  });
}

btnAdicionar.addEventListener("click", criarNovoObjetivo);
setInterval(atualizaCronometro, 1000);