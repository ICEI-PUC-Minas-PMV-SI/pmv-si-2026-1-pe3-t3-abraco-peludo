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

function exibirMensagem(elemento, mensagem, tipo) {
    elemento.textContent = mensagem;
    elemento.className = `reset-feedback ${tipo} visible`;
}

function limparMensagem(elemento) {
    elemento.textContent = '';
    elemento.className = 'reset-feedback';
}

function obterTokenDaUrl() {
    return new URLSearchParams(window.location.search).get('token');
}

document.addEventListener('DOMContentLoaded', () => {
    initToggleSenha();

    const form = document.getElementById('formResetPassword');
    const feedback = document.getElementById('reset-feedback');
    const btnSubmit = document.getElementById('btnRedefinir');
    const token = obterTokenDaUrl();

    if (!token) {
        exibirMensagem(feedback, 'Link inválido. Solicite uma nova recuperação de senha.', 'erro');
        form.hidden = true;
        return;
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        limparMensagem(feedback);

        const senha = document.getElementById('senha').value;
        const confirmarSenha = document.getElementById('confirmarSenha').value;

        if (senha.length < 6) {
            exibirMensagem(feedback, 'A senha deve ter no mínimo 6 caracteres.', 'erro');
            return;
        }

        if (senha !== confirmarSenha) {
            exibirMensagem(feedback, 'As senhas não coincidem.', 'erro');
            return;
        }

        btnSubmit.disabled = true;
        btnSubmit.textContent = 'Salvando...';

        try {
            const resultado = await apiPostEndpoint('/redefinir-senha', { token, senha });
            exibirMensagem(feedback, `${resultado.mensagem} Você já pode fazer login.`, 'sucesso');
            form.hidden = true;

            setTimeout(() => {
                window.location.href = '../login.html';
            }, 2500);
        } catch (erro) {
            exibirMensagem(feedback, erro.message, 'erro');
            btnSubmit.disabled = false;
            btnSubmit.textContent = 'Redefinir senha';
        }
    });
});
