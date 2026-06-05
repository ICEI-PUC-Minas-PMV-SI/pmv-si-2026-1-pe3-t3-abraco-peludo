let fotoBase64 = '';

function validarEtapa4(nome, descricao, foto) {
    const erros = {};

    if (!nome.trim()) {
        erros.nome = 'O nome é obrigatório.';
    }

    if (!descricao.trim()) {
        erros.descricao = 'A descrição é obrigatória.';
    }

    if (!foto) {
        erros.foto = 'A foto é obrigatória.';
    }

    return erros;
}

function preencherFormularioEtapa4() {
    const cadastro = getCadastroInstituicao();

    if (cadastro.nome) {
        document.getElementById('nome').value = cadastro.nome;
    }
    if (cadastro.descricao) {
        document.getElementById('descricao').value = cadastro.descricao;
    }
    if (cadastro.foto) {
        fotoBase64 = cadastro.foto;
        const fotoTexto = document.getElementById('fotoTexto');
        const fotoWrapper = document.getElementById('fotoWrapper');
        fotoTexto.textContent = cadastro.fotoNome || 'Foto selecionada';
        fotoWrapper.classList.add('tem-foto');
    }
}

function etapa3Completa(cadastro) {
    return cadastro.endereco && cadastro.cidade && cadastro.bairro && cadastro.numero && cadastro.cep;
}

function etapa2Completa(cadastro) {
    return cadastro.cnpj && cadastro.cargoResponsavel && cadastro.responsavelLegal && cadastro.dataFundacao;
}

document.addEventListener('DOMContentLoaded', () => {
    const cadastro = getCadastroInstituicao();

    if (!cadastro.email || !cadastro.senha || !etapa2Completa(cadastro) || !etapa3Completa(cadastro)) {
        window.location.href = 'cadastroInstituicao.html';
        return;
    }

    preencherFormularioEtapa4();

    const inputFoto = document.getElementById('foto');
    const fotoTexto = document.getElementById('fotoTexto');
    const fotoWrapper = document.getElementById('fotoWrapper');

    inputFoto.addEventListener('change', async () => {
        const arquivo = inputFoto.files[0];

        if (!arquivo) {
            fotoBase64 = '';
            fotoTexto.textContent = 'Foto';
            fotoWrapper.classList.remove('tem-foto');
            return;
        }

        fotoBase64 = await lerArquivoComoBase64(arquivo);
        fotoTexto.textContent = arquivo.name;
        fotoWrapper.classList.add('tem-foto');
        fotoWrapper.classList.remove('input-error');
        document.getElementById('erro-foto').classList.remove('visible');
    });

    document.getElementById('btnVoltar').addEventListener('click', () => {
        salvarCadastroInstituicao({
            nome: document.getElementById('nome').value.trim(),
            descricao: document.getElementById('descricao').value.trim(),
            foto: fotoBase64,
            fotoNome: fotoTexto.textContent !== 'Foto' ? fotoTexto.textContent : ''
        }, 4);

        window.location.href = 'cadastroInstituicaoEtapa3.html';
    });

    const form = document.getElementById('formCadastroInstituicaoEtapa4');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const descricao = document.getElementById('descricao').value;

        const erros = validarEtapa4(nome, descricao, fotoBase64);
        exibirErros(['nome', 'descricao'], erros);

        const erroFoto = document.getElementById('erro-foto');
        if (erros.foto) {
            fotoWrapper.classList.add('input-error');
            erroFoto.textContent = erros.foto;
            erroFoto.classList.add('visible');
        } else {
            fotoWrapper.classList.remove('input-error');
            erroFoto.textContent = '';
            erroFoto.classList.remove('visible');
        }

        if (Object.keys(erros).length > 0) return;

        salvarCadastroInstituicao({
            nome: nome.trim(),
            descricao: descricao.trim(),
            foto: fotoBase64,
            fotoNome: fotoTexto.textContent
        }, 4);

        const dadosJson = await carregarInstituicoesJson();
        salvarInstituicoesLocal(dadosJson);

        window.location.href = 'cadastroInstituicaoEtapa5.html';
    });
});
