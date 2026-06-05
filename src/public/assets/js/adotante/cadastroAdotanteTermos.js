function cadastroCompleto(cadastro) {
    return (
        cadastro.nomeCompleto &&
        cadastro.cpf &&
        cadastro.dataNascimento &&
        cadastro.email &&
        cadastro.senha
    );
}

document.addEventListener('DOMContentLoaded', () => {
    const cadastro = getCadastroAdotante();

    if (!cadastroCompleto(cadastro)) {
        window.location.href = 'cadastroAdotante.html';
        return;
    }

    const checkboxTermos = document.getElementById('aceitarTermos');
    const btnCadastrar = document.getElementById('btnCadastrar');
    const erroTermos = document.getElementById('erro-termos');

    if (cadastro.aceitouTermos) {
        checkboxTermos.checked = true;
        btnCadastrar.disabled = false;
    }

    checkboxTermos.addEventListener('change', () => {
        btnCadastrar.disabled = !checkboxTermos.checked;
        erroTermos.textContent = '';
        erroTermos.classList.remove('visible');
    });

    document.getElementById('btnVoltar').addEventListener('click', () => {
        salvarCadastroAdotante({
            aceitouTermos: checkboxTermos.checked
        }, 2);

        window.location.href = 'cadastroAdotante.html';
    });

    const form = document.getElementById('formCadastroAdotanteTermos');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (!checkboxTermos.checked) {
            erroTermos.textContent = 'Você precisa aceitar os termos para continuar.';
            erroTermos.classList.add('visible');
            return;
        }

        btnCadastrar.disabled = true;
        btnCadastrar.textContent = 'Cadastrando...';

        const cadastroCompleto = getCadastroAdotante();

        try {
            await finalizarCadastroAdotante({
                nomeCompleto: cadastroCompleto.nomeCompleto,
                cpf: cadastroCompleto.cpf,
                dataNascimento: cadastroCompleto.dataNascimento,
                email: cadastroCompleto.email,
                senha: cadastroCompleto.senha,
                aceitouTermos: true
            });

            window.location.href = '../../login/login.html';
        } catch {
            btnCadastrar.disabled = !checkboxTermos.checked;
            btnCadastrar.textContent = 'Cadastrar';
            alert('Não foi possível concluir o cadastro. Tente novamente.');
        }
    });
});
