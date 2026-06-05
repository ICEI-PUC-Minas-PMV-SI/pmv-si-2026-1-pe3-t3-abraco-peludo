function validarEtapa2(cnpj, cargoResponsavel, responsavelLegal, dataFundacao) {
    const erros = {};

    if (!cnpj.trim()) {
        erros.cnpj = 'O CNPJ é obrigatório.';
    } else if (!validarCnpj(cnpj)) {
        erros.cnpj = 'Informe um CNPJ válido.';
    }

    if (!cargoResponsavel.trim()) {
        erros.cargoResponsavel = 'O cargo responsável é obrigatório.';
    }

    if (!responsavelLegal.trim()) {
        erros.responsavelLegal = 'O responsável legal é obrigatório.';
    }

    if (!dataFundacao) {
        erros.dataFundacao = 'A data da fundação é obrigatória.';
    } else if (new Date(dataFundacao) > new Date()) {
        erros.dataFundacao = 'A data da fundação não pode ser futura.';
    }

    return erros;
}

function preencherFormularioEtapa2() {
    const cadastro = getCadastroInstituicao();

    if (cadastro.cnpj) {
        document.getElementById('cnpj').value = cadastro.cnpj;
    }
    if (cadastro.cargoResponsavel) {
        document.getElementById('cargoResponsavel').value = cadastro.cargoResponsavel;
    }
    if (cadastro.responsavelLegal) {
        document.getElementById('responsavelLegal').value = cadastro.responsavelLegal;
    }
    if (cadastro.dataFundacao) {
        document.getElementById('dataFundacao').value = cadastro.dataFundacao;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const cadastro = getCadastroInstituicao();

    if (!cadastro.email || !cadastro.senha) {
        window.location.href = 'cadastroInstituicao.html';
        return;
    }

    preencherFormularioEtapa2();

    const inputCnpj = document.getElementById('cnpj');
    inputCnpj.addEventListener('input', () => {
        inputCnpj.value = formatarCnpj(inputCnpj.value);
    });

    document.getElementById('btnVoltar').addEventListener('click', () => {
        window.location.href = 'cadastroInstituicao.html';
    });

    const form = document.getElementById('formCadastroInstituicaoEtapa2');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const cnpj = document.getElementById('cnpj').value;
        const cargoResponsavel = document.getElementById('cargoResponsavel').value;
        const responsavelLegal = document.getElementById('responsavelLegal').value;
        const dataFundacao = document.getElementById('dataFundacao').value;

        const erros = validarEtapa2(cnpj, cargoResponsavel, responsavelLegal, dataFundacao);
        exibirErros(['cnpj', 'cargoResponsavel', 'responsavelLegal', 'dataFundacao'], erros);

        if (Object.keys(erros).length > 0) return;

        salvarCadastroInstituicao({
            cnpj: cnpj.trim(),
            cargoResponsavel: cargoResponsavel.trim(),
            responsavelLegal: responsavelLegal.trim(),
            dataFundacao
        }, 2);

        const dadosJson = await carregarInstituicoesJson();
        salvarInstituicoesLocal(dadosJson);

        window.location.href = 'cadastroInstituicaoEtapa3.html';
    });
});
