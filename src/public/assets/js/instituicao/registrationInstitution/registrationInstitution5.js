function etapa4Completa(cadastro) {
    return cadastro.nome && cadastro.descricao && cadastro.foto;
}

function etapa3Completa(cadastro) {
    return cadastro.endereco && cadastro.cidade && cadastro.bairro && cadastro.numero && cadastro.cep;
}

function etapa2Completa(cadastro) {
    return cadastro.cnpj && cadastro.cargoResponsavel && cadastro.responsavelLegal && cadastro.dataFundacao;
}

document.addEventListener('DOMContentLoaded', () => {
    const cadastro = getCadastroInstituicao();

    if (
        !cadastro.email ||
        !cadastro.senha ||
        !etapa2Completa(cadastro) ||
        !etapa3Completa(cadastro) ||
        !etapa4Completa(cadastro)
    ) {
        window.location.href = 'cadastroInstituicao.html';
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
        salvarCadastroInstituicao({
            aceitouTermos: checkboxTermos.checked
        }, 5);

        window.location.href = 'cadastroInstituicaoEtapa4.html';
    });

    const form = document.getElementById('formCadastroInstituicaoEtapa5');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (!checkboxTermos.checked) {
            erroTermos.textContent = 'Você precisa aceitar os termos para continuar.';
            erroTermos.classList.add('visible');
            return;
        }

        btnCadastrar.disabled = true;
        btnCadastrar.textContent = 'Cadastrando...';

        const cadastroCompleto = getCadastroInstituicao();

        try {
            await finalizarCadastroInstituicao({
                email: cadastroCompleto.email,
                senha: cadastroCompleto.senha,
                cnpj: cadastroCompleto.cnpj,
                cargoResponsavel: cadastroCompleto.cargoResponsavel,
                responsavelLegal: cadastroCompleto.responsavelLegal,
                dataFundacao: cadastroCompleto.dataFundacao,
                endereco: cadastroCompleto.endereco,
                cidade: cadastroCompleto.cidade,
                bairro: cadastroCompleto.bairro,
                numero: cadastroCompleto.numero,
                cep: cadastroCompleto.cep,
                nome: cadastroCompleto.nome,
                descricao: cadastroCompleto.descricao,
                foto: cadastroCompleto.foto,
                fotoNome: cadastroCompleto.fotoNome,
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
