function exibirMensagem(elemento, mensagem, tipo) {
    elemento.textContent = mensagem;
    elemento.className = `forgot-feedback ${tipo} visible`;
}

function limparMensagem(elemento) {
    elemento.textContent = '';
    elemento.className = 'forgot-feedback';
}

function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formForgotPassword');
    const inputEmail = document.getElementById('email');
    const feedback = document.getElementById('forgot-feedback');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        limparMensagem(feedback);

        const email = inputEmail.value.trim();

        if (!email) {
            exibirMensagem(feedback, 'Informe o e-mail cadastrado.', 'erro');
            return;
        }

        if (!validarEmail(email)) {
            exibirMensagem(feedback, 'Informe um e-mail válido.', 'erro');
            return;
        }

        exibirMensagem(
            feedback,
            'Se o e-mail estiver cadastrado, você receberá um link de recuperação em instantes.',
            'sucesso'
        );
        form.reset();
    });
});
