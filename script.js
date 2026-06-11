// Estado de controle global para fontes e áudio
let tamanhoFonteBase = 16;
let sintentizadorVoz = window.speechSynthesis;
let objetoFala = null;
let lendoAgora = false;

// 1. Função para alterar o Modo de Cor (Claro / Escuro)
function alternarTema() {
    document.body.classList.toggle('modo-escuro');
}

// 2. Função para alterar o tamanho da fonte proporcionalmente
function mudarFonte(direcao) {
    tamanhoFonteBase += direcao * 2;
    // Limitadores para evitar que o layout quebre
    if (tamanhoFonteBase < 12) tamanhoFonteBase = 12;
    if (tamanhoFonteBase > 26) tamanhoFonteBase = 26;
    
    document.documentElement.style.setProperty('--tamanho-base', tamanhoFonteBase + 'px');
}

// 3. Função de Leitura Assistiva de Texto por Voz
function gerenciarLeitura() {
    const botaoVoz = document.getElementById('btn-voz');
    
    if (!sintentizadorVoz) {
        alert("O seu navegador não possui suporte para leitura de voz nativa.");
        return;
    }

    if (lendoAgora) {
        sintentizadorVoz.cancel();
        lendoAgora = false;
        botaoVoz.innerText = "🔊 Ouvir Texto";
    } else {
        // Captura o conteúdo textual dos blocos informativos da página
        const textoPrincipal = document.getElementById('texto-principal').innerText;
        const textoDados = document.getElementById('texto-dados').innerText;
        const textoCompleto = textoPrincipal + " " + textoDados;

        objetoFala = new SpeechSynthesisUtterance(textoCompleto);
        objetoFala.lang = 'pt-BR';
        objetoFala.rate = 1.05; // Velocidade confortável de audição

        objetoFala.onend = function() {
            lendoAgora = false;
            botaoVoz.innerText = "🔊 Ouvir Texto";
        };

        objetoFala.onerror = function() {
            lendoAgora = false;
            botaoVoz.innerText = "🔊 Ouvir Texto";
        };

        sintentizadorVoz.speak(objetoFala);
        lendoAgora = true;
        botaoVoz.innerText = "🛑 Parar Leitura";
    }
}

// 4. Elemento Interativo: Destaque de Cards ao clicar
function destacarCard(elemento) {
    document.querySelectorAll('.card-estatistica').forEach(card => {
        card.classList.remove('ativo');
    });
    elemento.classList.add('ativo');
}
