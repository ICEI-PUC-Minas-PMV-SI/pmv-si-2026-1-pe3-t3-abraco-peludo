const CADASTRO_INSTITUICAO_KEY = 'cadastroInstituicao';

function getCadastroInstituicao() {
    const dados = sessionStorage.getItem(CADASTRO_INSTITUICAO_KEY);
    return dados ? JSON.parse(dados) : {};
}

function salvarCadastroInstituicao(dados, etapaAtual) {
    const cadastroAtual = getCadastroInstituicao();
    const cadastroAtualizado = { ...cadastroAtual, ...dados, etapaAtual };
    sessionStorage.setItem(CADASTRO_INSTITUICAO_KEY, JSON.stringify(cadastroAtualizado));
    return cadastroAtualizado;
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

function validarCnpj(cnpj) {
    const numeros = cnpj.replace(/\D/g, '');
    return numeros.length === 14;
}

function formatarCnpj(valor) {
    const numeros = valor.replace(/\D/g, '').slice(0, 14);

    return numeros
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2');
}

function validarCep(cep) {
    const numeros = cep.replace(/\D/g, '');
    return numeros.length === 8;
}

function formatarCep(valor) {
    const numeros = valor.replace(/\D/g, '').slice(0, 8);
    return numeros.replace(/^(\d{5})(\d)/, '$1-$2');
}

function lerArquivoComoBase64(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => resolve(leitor.result);
        leitor.onerror = reject;
        leitor.readAsDataURL(arquivo);
    });
}

async function emailInstituicaoJaCadastrado(email) {
    const instituicoes = await apiGet('instituicoes', { email });
    return instituicoes.length > 0;
}

async function finalizarCadastroInstituicao(instituicao) {
    const emailNormalizado = instituicao.email.trim().toLowerCase();

    if (await emailInstituicaoJaCadastrado(emailNormalizado)) {
        throw new Error('E-mail já cadastrado');
    }

    const novaInstituicao = await apiPost('instituicoes', {
        ...instituicao,
        email: emailNormalizado,
        criadoEm: new Date().toISOString()
    });

    sessionStorage.removeItem(CADASTRO_INSTITUICAO_KEY);
    return novaInstituicao;
}
