function validarCadastro(nomeCompleto, cpf, dataNascimento, email, senha, confirmarSenha) {
    const erros = {};

    if (!nomeCompleto.trim()) {
        erros.nomeCompleto = 'O nome completo é obrigatório.';
    }

    if (!cpf.trim()) {
        erros.cpf = 'O CPF é obrigatório.';
    } else if (!validarCpf(cpf)) {
        erros.cpf = 'Informe um CPF válido.';
    }

    if (!dataNascimento) {
        erros.dataNascimento = 'A data de nascimento é obrigatória.';
    } else if (new Date(dataNascimento) > new Date()) {
        erros.dataNascimento = 'A data de nascimento não pode ser futura.';
    }

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
    const cadastro = getCadastroAdotante();

    if (cadastro.nomeCompleto) {
        document.getElementById('nomeCompleto').value = cadastro.nomeCompleto;
    }
    if (cadastro.cpf) {
        document.getElementById('cpf').value = cadastro.cpf;
    }
    if (cadastro.dataNascimento) {
        document.getElementById('dataNascimento').value = cadastro.dataNascimento;
    }
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

    const inputCpf = document.getElementById('cpf');
    inputCpf.addEventListener('input', () => {
        inputCpf.value = formatarCpf(inputCpf.value);
    });

    const form = document.getElementById('formCadastroAdotante');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const nomeCompleto = document.getElementById('nomeCompleto').value;
        const cpf = document.getElementById('cpf').value;
        const dataNascimento = document.getElementById('dataNascimento').value;
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;
        const confirmarSenha = document.getElementById('confirmarSenha').value;

        const erros = validarCadastro(nomeCompleto, cpf, dataNascimento, email, senha, confirmarSenha);
        exibirErros(
            ['nomeCompleto', 'cpf', 'dataNascimento', 'email', 'senha', 'confirmarSenha'],
            erros
        );

        if (Object.keys(erros).length > 0) return;

        salvarCadastroAdotante({
            nomeCompleto: nomeCompleto.trim(),
            cpf: cpf.trim(),
            dataNascimento,
            email: email.trim(),
            senha
        }, 1);

        window.location.href = 'registrationAdopterTerms.html';
    });
});
