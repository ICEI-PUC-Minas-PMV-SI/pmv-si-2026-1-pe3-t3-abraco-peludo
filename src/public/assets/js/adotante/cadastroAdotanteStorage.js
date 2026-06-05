const CADASTRO_ADOTANTE_KEY = 'cadastroAdotante';
const ADOTANTES_STORAGE_KEY = 'adotantes';

function getCadastroAdotante() {
    const dados = sessionStorage.getItem(CADASTRO_ADOTANTE_KEY);
    return dados ? JSON.parse(dados) : {};
}

function salvarCadastroAdotante(dados, etapaAtual) {
    const cadastroAtual = getCadastroAdotante();
    const cadastroAtualizado = { ...cadastroAtual, ...dados, etapaAtual };
    sessionStorage.setItem(CADASTRO_ADOTANTE_KEY, JSON.stringify(cadastroAtualizado));
    return cadastroAtualizado;
}

async function carregarAdotantesJson() {
    try {
        const response = await fetch('../../../data/adotantes.json');
        if (!response.ok) return { adotantes: [] };
        return await response.json();
    } catch {
        const dadosLocal = localStorage.getItem(ADOTANTES_STORAGE_KEY);
        return dadosLocal ? JSON.parse(dadosLocal) : { adotantes: [] };
    }
}

function salvarAdotantesLocal(dados) {
    localStorage.setItem(ADOTANTES_STORAGE_KEY, JSON.stringify(dados));
}

function exibirErros(campos, erros) {
    campos.forEach((campo) => {
        const input = document.getElementById(campo);
        const mensagem = document.getElementById(`erro-${campo}`);

        if (!input || !mensagem) return;

        if (erros[campo]) {
            input.classList.add('input-error');
            mensagem.textContent = erros[campo];
            mensagem.classList.add('visible');
        } else {
            input.classList.remove('input-error');
            mensagem.textContent = '';
            mensagem.classList.remove('visible');
        }
    });
}

function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validarCpf(cpf) {
    const numeros = cpf.replace(/\D/g, '');
    return numeros.length === 11;
}

function formatarCpf(valor) {
    const numeros = valor.replace(/\D/g, '').slice(0, 11);

    return numeros
        .replace(/^(\d{3})(\d)/, '$1.$2')
        .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1-$2');
}

async function finalizarCadastroAdotante(adotante) {
    const dados = await carregarAdotantesJson();
    const novoAdotante = {
        id: Date.now().toString(),
        ...adotante,
        criadoEm: new Date().toISOString()
    };

    dados.adotantes.push(novoAdotante);
    salvarAdotantesLocal(dados);
    sessionStorage.removeItem(CADASTRO_ADOTANTE_KEY);

    return novoAdotante;
}
