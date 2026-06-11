// Acessibilidade: Controle de tamanho de fontes
let fontBase = 16;
function mudarFonte(n) {
    fontBase += n * 2;
    if (fontBase < 12) fontBase = 12;
    if (fontBase > 26) fontBase = 26;
    document.documentElement.style.setProperty('--tamanho-base', fontBase + 'px');
}

// Alternador de Modo Claro e Escuro
function alternarTema() {
    document.body.classList.toggle('modo-escuro');
}

// Controle do FAQ sanfona
document.querySelectorAll('.faq-lux-pergunta').forEach(botao => {
    botao.addEventListener('click', () => {
        const itemAtual = botao.parentElement;
        const resposta = botao.nextElementSibling;
        itemAtual.classList.toggle('ativo');
        resposta.style.maxHeight = itemAtual.classList.contains('ativo') ? resposta.scrollHeight + "px" : "0";
    });
});

// ESTRUTURA DOS DADOS DO QUIZ INTERATIVO (5 PERGUNTAS)
const questoesQuiz = [
    {
        pergunta: "1. Qual é a participação aproximada do agronegócio no PIB brasileiro hoje?",
        opcoes: ["Cerca de 5%", "Próximo a 15%", "Quase 25%", "Mais de 50%"],
        correta: 2
    },
    {
        pergunta: "2. Qual porcentagem do território nacional é mantida preservada com vegetação nativa?",
        opcoes: ["Menos de 10%", "Aproximadamente 30%", "Mais de 60%", "Exatamente 80%"],
        correta: 2
    },
    {
        pergunta: "3. O que caracteriza a técnica ecológica do 'Plantio Direto' desenvolvida nos anos 90?",
        opcoes: ["Cultivar sem usar água", "Cultivar sobre a palha do plantio anterior para proteger o solo", "Uso massivo de tratores pesados", "Queimar o solo antes de plantar"],
        correta: 1
    },
    {
        pergunta: "4. Qual é o foco principal do atual ecossistema tecnológico conhecido como 'Agro 5.0'?",
        opcoes: ["Uso exclusivo de tração animal", "Uso de Inteligência Artificial, drones e otimização cirúrgica de recursos", "Expansão de terras por desmatamento", "Foco apenas em produtos de subsistência"],
        correta: 1
    },
    {
        pergunta: "5. O que determina o rigoroso Código Florestal brasileiro sobre propriedades privadas?",
        opcoes: ["Proibição total de qualquer plantação", "Obrigatoriedade de manter de 20% a 80% da área sob mata nativa intacta", "Subsídio total do governo para compras de sementes", "Isenção de impostos para grandes desmatamentos"],
        correta: 1
    }
];

// Renderizar o Quiz na Tela automaticamente
function carregarQuiz() {
    const container = document.getElementById('quiz-fluxo');
    container.innerHTML = "";
    
    questoesQuiz.forEach((q, indexQ) => {
        let htmlQuestao = `
            <div class="quiz-questao" id="bloco-q-${indexQ}">
                <h3>${q.pergunta}</h3>
                <div class="quiz-opcoes">
        `;
        q.opcoes.forEach((opcao, indexO) => {
            htmlQuestao += `
                <label class="quiz-opcao" id="label-q-${indexQ}-o-${indexO}">
                    <input type="radio" name="questao-${indexQ}" value="${indexO}">
                    ${opcao}
                </label>
            `;
        });
        htmlQuestao += `</div></div>`;
        container.innerHTML += htmlQuestao;
    });
}

// Validar acertos, marcar blocos visualmente e dar a nota
function calcularResultadoQuiz() {
    let acertos = 0;
    
    questoesQuiz.forEach((q, indexQ) => {
        const selecionado = document.querySelector(`input[name="questao-${indexQ}"]:checked`);
        
        // Limpa validações anteriores se houver
        q.opcoes.forEach((_, indexO) => {
            const label = document.getElementById(`label-q-${indexQ}-o-${indexO}`);
            label.classList.remove('opcao-correta', 'opcao-errada');
        });

        // Pinta a alternativa correta de verde
        const labelCorreto = document.getElementById(`label-q-${indexQ}-o-${q.correta}`);
        labelCorreto.classList.add('opcao-correta');

        if (selecionado) {
            const respostaUsuario = parseInt(selecionado.value);
            if (respostaUsuario === q.correta) {
                acertos++;
            } else {
                // Se errou, pinta a marcada pelo usuário de vermelho
                const labelErrado = document.getElementById(`label-q-${indexQ}-o-${respostaUsuario}`);
                labelErrado.classList.add('opcao-errada');
            }
        }
    });

    const boxResultado = document.getElementById('quiz-resultado');
    boxResultado.className = "resultado-visivel";
    boxResultado.innerText = `Você acertou ${acertos} de 5 perguntas! (${(acertos/5)*100}% de aproveitamento)`;
    boxResultado.scrollIntoView({ behavior: 'smooth' });
}

// Inicializa o Quiz assim que a página carrega
window.onload = carregarQuiz;

// Leitura por Voz (Acessibilidade)
let synth = window.speechSynthesis;
let lendo = false;

function gerenciarLeitura() {
    if (lendo) {
        synth.cancel();
        lendo = false;
        document.getElementById('btn-voz').innerText = "🔊 Ouvir Texto";
    } else {
        const IDsDosBlocos = ['texto-intro', 'texto-dados', 'texto-timeline', 'texto-faq', 'texto-quiz'];
        let stringDeLeitura = "";
        IDsDosBlocos.forEach(id => {
            const el = document.getElementById(id);
            if (el) stringDeLeitura += el.innerText + " ";
        });

        let fala = new SpeechSynthesisUtterance(stringDeLeitura);
        fala.lang = 'pt-BR';
        fala.onend = () => { lendo = false; document.getElementById('btn-voz').innerText = "🔊 Ouvir Texto"; };
        synth.speak(fala);
        lendo = true;
        document.getElementById('btn-voz').innerText = "🛑 Parar Leitura";
    }
}
