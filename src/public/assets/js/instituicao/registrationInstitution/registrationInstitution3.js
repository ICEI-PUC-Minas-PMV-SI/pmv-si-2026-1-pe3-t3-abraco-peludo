function validarEtapa3(endereco, cidade, bairro, numero, cep) {
    const erros = {};

    if (!endereco.trim()) {
        erros.endereco = 'O endereço é obrigatório.';
    }

    if (!cidade.trim()) {
        erros.cidade = 'A cidade é obrigatória.';
    }

    if (!bairro.trim()) {
        erros.bairro = 'O bairro é obrigatório.';
    }

    if (!numero.trim()) {
        erros.numero = 'O número é obrigatório.';
    }

    if (!cep.trim()) {
        erros.cep = 'O CEP é obrigatório.';
    } else if (!validarCep(cep)) {
        erros.cep = 'Informe um CEP válido.';
    }

    return erros;
}

function preencherFormularioEtapa3() {
    const cadastro = getCadastroInstituicao();

    if (cadastro.endereco) {
        document.getElementById('endereco').value = cadastro.endereco;
    }
    if (cadastro.cidade) {
        document.getElementById('cidade').value = cadastro.cidade;
    }
    if (cadastro.bairro) {
        document.getElementById('bairro').value = cadastro.bairro;
    }
    if (cadastro.numero) {
        document.getElementById('numero').value = cadastro.numero;
    }
    if (cadastro.cep) {
        document.getElementById('cep').value = cadastro.cep;
    }
}

function etapa2Completa(cadastro) {
    return cadastro.cnpj && cadastro.cargoResponsavel && cadastro.responsavelLegal && cadastro.dataFundacao;
}

document.addEventListener('DOMContentLoaded', () => {
    const cadastro = getCadastroInstituicao();

    if (!cadastro.email || !cadastro.senha || !etapa2Completa(cadastro)) {
        window.location.href = 'registrationInstitution1.html';
        return;
    }

    preencherFormularioEtapa3();

    const inputCep = document.getElementById('cep');
    inputCep.addEventListener('input', () => {
        inputCep.value = formatarCep(inputCep.value);
    });

    document.getElementById('btnVoltar').addEventListener('click', () => {
        window.location.href = 'registrationInstitution2.html';
    });

    const form = document.getElementById('formCadastroInstituicaoEtapa3');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const endereco = document.getElementById('endereco').value;
        const cidade = document.getElementById('cidade').value;
        const bairro = document.getElementById('bairro').value;
        const numero = document.getElementById('numero').value;
        const cep = document.getElementById('cep').value;

        const erros = validarEtapa3(endereco, cidade, bairro, numero, cep);
        exibirErros(['endereco', 'cidade', 'bairro', 'numero', 'cep'], erros);

        if (Object.keys(erros).length > 0) return;

        salvarCadastroInstituicao({
            endereco: endereco.trim(),
            cidade: cidade.trim(),
            bairro: bairro.trim(),
            numero: numero.trim(),
            cep: cep.trim()
        }, 3);

        window.location.href = 'registrationInstitution4.html';
    });
});
