let perguntas = [];
let perguntasFiltradas = [];
let index = 0;
let tempo = 15;
let intervalo;
let pontuacao = 0;
let nome = '';

const perguntaDiv = document.getElementById('pergunta');
const alternativasUl = document.getElementById('alternativas');
const quizBox = document.getElementById('quizBox');
const resultadoDiv = document.getElementById('resultado');
const mensagemFinal = document.getElementById('mensagemFinal');
const contador = document.getElementById('contador');

const filtroSerie = document.getElementById('filtroSerie');
const filtroDificuldade = document.getElementById('filtroDificuldade');

const somAcerto = document.getElementById('somAcerto');
const somErro = document.getElementById('somErro');

async function carregarPerguntas() {
  const res = await fetch('/perguntas');
  perguntas = await res.json();
}

function iniciarQuiz() {
  nome = document.getElementById('nomeParticipante').value.trim();
  if (nome === '') {
    alert('Por favor, digite seu nome!');
    return;
  }

  const serie = filtroSerie.value;
  const dificuldade = filtroDificuldade.value;

  perguntasFiltradas = perguntas.filter(p => {
    return (serie === '' || p.serie === serie) &&
           (dificuldade === '' || p.dificuldade === dificuldade);
  });

  if (perguntasFiltradas.length === 0) {
    alert("Nenhuma pergunta encontrada para esse filtro!");
    return;
  }

  index = 0;
  pontuacao = 0;
  document.getElementById('inicio').classList.add('escondido');
  resultadoDiv.classList.add('escondido');
  quizBox.classList.remove('escondido');
  mostrarPergunta();
}

function mostrarPergunta() {
  clearInterval(intervalo);
  if (index >= perguntasFiltradas.length) {
    mostrarResultado();
    return;
  }

  const p = perguntasFiltradas[index];
  perguntaDiv.textContent = p.pergunta;
  alternativasUl.innerHTML = '';

  p.alternativas.forEach((alt, i) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.textContent = `${String.fromCharCode(65 + i)} - ${alt}`;
    btn.onclick = () => responder(i, btn, p);
    li.appendChild(btn);
    alternativasUl.appendChild(li);
  });

  tempo = 15;
  contador.textContent = `⏳ Tempo restante: ${tempo}s`;
  intervalo = setInterval(() => {
    tempo--;
    contador.textContent = `⏳ Tempo restante: ${tempo}s`;
    if (tempo <= 0) {
      clearInterval(intervalo);
      responder(null, null, p);
    }
  }, 1000);
}

function responder(resposta, botaoClicado, perguntaAtual) {
  clearInterval(intervalo);

  const botoes = document.querySelectorAll('#alternativas button');
  botoes.forEach((btn, i) => {
    if (i === perguntaAtual.correta) {
      btn.classList.add('correto');
    } else if (i === resposta && i !== perguntaAtual.correta) {
      btn.classList.add('errado');
    }
    btn.disabled = true;
  });

  if (resposta === perguntaAtual.correta) {
    pontuacao++;
    somAcerto.play();
  } else {
    somErro.play();
  }

  setTimeout(() => {
    index++;
    mostrarPergunta();
  }, 2000);
}

function mostrarResultado() {
  quizBox.classList.add('escondido');
  resultadoDiv.classList.remove('escondido');
  mensagemFinal.textContent = `${nome}, sua pontuação foi: ${pontuacao} de ${perguntasFiltradas.length}`;
}
