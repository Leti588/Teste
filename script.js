// Controle Adaptativo de Acessibilidade Textual
let fontBase = 16;
function mudarFonte(n) {
    fontBase += n * 2;
    if (fontBase < 12) fontBase = 12;
    if (fontBase > 26) fontBase = 26;
    document.documentElement.style.setProperty('--tamanho-base', fontBase + 'px');
}

// Inversor de Cores de Lado Oposto (Light/Dark)
function alternarTema() {
    document.body.classList.toggle('modo-escuro');
}

// Controle do Acordeão de FAQ Luxo (Abre/Fecha)
document.querySelectorAll('.faq-lux-pergunta').forEach(botao => {
    botao.addEventListener('click', () => {
        const itemAtual = botao.parentElement;
        const resposta = botao.nextElementSibling;
        
        // Alterna o item clicado
        itemAtual.classList.toggle('ativo');
        
        if (itemAtual.classList.contains('ativo')) {
            resposta.style.maxHeight = resposta.scrollHeight + "px";
            botao.setAttribute('aria-expanded', 'true');
        } else {
            resposta.style.maxHeight = "0";
            botao.setAttribute('aria-expanded', 'false');
        }
    });
});

// Mecanismo de Áudio Nativo por Síntese Vocal
let synth = window.speechSynthesis;
let lendo = false;

function gerenciarLeitura() {
    if (lendo) {
        synth.cancel();
        lendo = false;
        document.getElementById('btn-voz').innerText = "🔊 Ouvir Texto";
    } else {
        const IDsDosBlocos = ['texto-intro', 'texto-dados', 'texto-timeline', 'texto-faq'];
        let stringDeLeitura = "";
        
        IDsDosBlocos.forEach(id => {
            const elemento = document.getElementById(id);
            if (elemento) stringDeLeitura += elemento.innerText + " ";
        });

        let fala = new SpeechSynthesisUtterance(stringDeLeitura);
        fala.lang = 'pt-BR';
        fala.rate = 1.05;

        fala.onend = () => {
            lendo = false;
            document.getElementById('btn-voz').innerText = "🔊 Ouvir Texto";
        };
        
        synth.speak(fala);
        lendo = true;
        document.getElementById('btn-voz').innerText = "🛑 Parar Leitura";
    }
}
