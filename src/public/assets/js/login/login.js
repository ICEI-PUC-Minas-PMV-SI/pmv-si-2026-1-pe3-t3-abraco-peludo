const USUARIO_LOGADO_KEY = 'usuarioLogado';

const REDIRECIONAMENTOS = {
    adotante: '../adotante/updateRegistration/updateRegistration.html',
    instituicao: '../instituicao/configureAccount/configureAccount.html'
};

function normalizarIdentificador(identificador) {
    return identificador.trim().toLowerCase();
}

function correspondeIdentificador(usuario, identificador, campos) {
    const identificadorNormalizado = normalizarIdentificador(identificador);
    const cpfNumeros = identificador.replace(/\D/g, '');

    return campos.some((campo) => {
        const valor = usuario[campo];
        if (!valor) return false;

        if (campo === 'cpf') {
            return valor.replace(/\D/g, '') === cpfNumeros && cpfNumeros.length === 11;
        }

        return valor.toLowerCase() === identificadorNormalizado;
    });
}

async function buscarAdotante(identificador, senha) {
    const adotantes = await apiGet('adotantes');

    return adotantes.find((usuario) => (
        usuario.senha === senha &&
        correspondeIdentificador(usuario, identificador, ['email', 'nomeCompleto', 'cpf'])
    )) || null;
}

async function buscarInstituicao(identificador, senha) {
    const instituicoes = await apiGet('instituicoes');

    return instituicoes.find((usuario) => (
        usuario.senha === senha &&
        correspondeIdentificador(usuario, identificador, ['email', 'nome'])
    )) || null;
}

async function autenticarUsuario(identificador, senha) {
    const adotante = await buscarAdotante(identificador, senha);
    if (adotante) {
        return { tipo: 'adotante', usuario: adotante };
    }

    const instituicao = await buscarInstituicao(identificador, senha);
    if (instituicao) {
        return { tipo: 'instituicao', usuario: instituicao };
    }

    return null;
}

function salvarSessao(sessao) {
    const { senha, ...usuarioSemSenha } = sessao.usuario;
    sessionStorage.setItem(
        USUARIO_LOGADO_KEY,
        JSON.stringify({
            tipo: sessao.tipo,
            usuario: usuarioSemSenha
        })
    );
}

function exibirErroLogin(mensagem) {
    const erroLogin = document.getElementById('erro-login');
    erroLogin.textContent = mensagem;
    erroLogin.classList.add('visible');
}

function limparErroLogin() {
    const erroLogin = document.getElementById('erro-login');
    erroLogin.textContent = '';
    erroLogin.classList.remove('visible');
}

function initToggleSenha() {
    document.querySelectorAll('.btn-toggle-senha').forEach((botao) => {
        botao.addEventListener('click', () => {
            const input = document.getElementById(botao.dataset.target);
            const mostrarSenha = input.type === 'password';

            input.type = mostrarSenha ? 'text' : 'password';
            botao.classList.toggle('senha-visivel', mostrarSenha);
            botao.setAttribute('aria-label', mostrarSenha ? 'Ocultar senha' : 'Mostrar senha');
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initToggleSenha();

    const form = document.getElementById('formLogin');
    const inputIdentificador = document.getElementById('identificador');
    const inputSenha = document.getElementById('senha');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        limparErroLogin();

        const identificador = inputIdentificador.value;
        const senha = inputSenha.value;

        if (!identificador.trim() || !senha) {
            exibirErroLogin('Informe o usuário e a senha.');
            return;
        }

        try {
            const sessao = await autenticarUsuario(identificador, senha);

            if (!sessao) {
                exibirErroLogin('Usuário ou senha incorretos.');
                return;
            }

            salvarSessao(sessao);
            window.location.href = REDIRECIONAMENTOS[sessao.tipo];
        } catch {
            exibirErroLogin('Não foi possível conectar à API. Execute "npm run api" no terminal.');
        }
    });
});
