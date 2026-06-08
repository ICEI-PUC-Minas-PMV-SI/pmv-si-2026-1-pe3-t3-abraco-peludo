function validarEtapa1(email, senha, confirmarSenha) {
    const erros = {};

    if (!email.trim()) {
        erros.email = 'O e-mail é obrigatório.';
    } else if (!validarEmail(email)) {
        erros.email = 'Informe um e-mail válido.';
    }

    if (!senha) {
        erros.senha = 'A senha é obrigatória.';
    } else if (senha.length < 6) {
        erros.senha = 'A senha deve ter no mínimo 6 caracteres.';
    }

    if (!confirmarSenha) {
        erros.confirmarSenha = 'Confirme a senha.';
    } else if (senha !== confirmarSenha) {
        erros.confirmarSenha = 'As senhas não coincidem.';
    }

    return erros;
}

function preencherFormulario() {
    const cadastro = getCadastroInstituicao();

    if (cadastro.email) {
        document.getElementById('email').value = cadastro.email;
    }
    if (cadastro.senha) {
        document.getElementById('senha').value = cadastro.senha;
        document.getElementById('confirmarSenha').value = cadastro.senha;
    }
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
    preencherFormulario();
    initToggleSenha();

    const form = document.getElementById('formCadastroInstituicao');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;
        const confirmarSenha = document.getElementById('confirmarSenha').value;

        const erros = validarEtapa1(email, senha, confirmarSenha);
        exibirErros(['email', 'senha', 'confirmarSenha'], erros);

        if (Object.keys(erros).length > 0) return;

        salvarCadastroInstituicao({
            email: email.trim(),
            senha
        }, 1);

        window.location.href = 'registrationInstitution2.html';
    });
});
