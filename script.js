// Controle de Tamanho de Fonte
let fontBase = 16;
function mudarFonte(n) {
    fontBase += n * 2;
    if (fontBase < 12) fontBase = 12;
    if (fontBase > 26) fontBase = 26;
    document.documentElement.style.setProperty('--tamanho-base', fontBase + 'px');
}

// Alternar Tema
function alternarTema() {
    document.body.classList.toggle('modo-escuro');
}

// Acordeão do FAQ
document.querySelectorAll('.faq-pergunta').forEach(botao => {
    botao.addEventListener('click', () => {
        const item = botao.parentElement;
        item.classList.toggle('ativo');
        botao.querySelector('span').innerText = item.classList.contains('ativo') ? '-' : '+';
    });
});

// Leitura por Voz (Acessibilidade)
let synth = window.speechSynthesis;
let lendo = false;

function gerenciarLeitura() {
    if (lendo) {
        synth.cancel();
        lendo = false;
        document.getElementById('btn-voz').innerText = "🔊 Ouvir Texto";
    } else {
        // Seleciona as IDs dos textos informativos
        const textos = ['texto-intro', 'texto-dados', 'texto-timeline', 'texto-faq'];
        let conteudo = "";
        textos.forEach(id => conteudo += document.getElementById(id).innerText + " ");

        let fala = new SpeechSynthesisUtterance(conteudo);
        fala.lang = 'pt-BR';
        fala.onend = () => { lendo = false; document.getElementById('btn-voz').innerText = "🔊 Ouvir Texto"; };
        
        synth.speak(fala);
        lendo = true;
        document.getElementById('btn-voz').innerText = "🛑 Parar Leitura";
    }
}
