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
        window.location.href = 'registrationInstitution1.html';
        return;
    }

    const checkboxTermos = document.getElementById('aceitarTermos');
    const btnCadastrar = document.getElementById('btnCadastrar');
    const erroTermos = document.getElementById('erro-termos');

    if (cadastro.aceitouTermos) {
        checkboxTermos.checked = true;
        btnCadastrar.disabled = false;
    }

    if (checkboxTermos) {
        checkboxTermos.addEventListener('change', () => {
            if (btnCadastrar) btnCadastrar.disabled = !checkboxTermos.checked;
            if (erroTermos) {
                erroTermos.textContent = '';
                erroTermos.classList.remove('visible');
            }
        });
    }

    const btnVoltar = document.getElementById('btnVoltar');
    if (btnVoltar) {
        btnVoltar.addEventListener('click', () => {
            salvarCadastroInstituicao({
                aceitouTermos: checkboxTermos ? checkboxTermos.checked : false
            }, 5);

            window.location.href = 'registrationInstitution4.html';
        });
    } else {
        console.warn("Aviso Vercel/Dev: O elemento com o ID 'btnVoltar' não foi encontrado no HTML desta página.");
    }

    const form = document.getElementById('formregistrationInstitution5');
    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            if (checkboxTermos && !checkboxTermos.checked) {
                if (erroTermos) {
                    erroTermos.textContent = 'Você precisa aceitar os termos para continuar.';
                    erroTermos.classList.add('visible');
                }
                return;
            }

            if (btnCadastrar) {
                btnCadastrar.disabled = true;
                btnCadastrar.textContent = 'Cadastrando...';
            }

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
                if (btnCadastrar) {
                    btnCadastrar.disabled = checkboxTermos ? !checkboxTermos.checked : false;
                    btnCadastrar.textContent = 'Cadastrar';
                }
                alert('Não foi possível concluir o cadastro. Tente novamente.');
            }
        });
    } else {
        console.warn("Aviso Vercel/Dev: O elemento com o ID 'formregistrationInstitution5' não foi encontrado no HTML desta página.");
    }
});