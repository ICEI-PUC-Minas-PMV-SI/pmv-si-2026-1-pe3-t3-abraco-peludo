const USUARIO_LOGADO_KEY = 'usuarioLogado';
const API_URL = 'http://localhost:3000';

let novaFotoBase64 = null;
let novaFotoNome = null;

function obterDadosSessao() {
    const sessao = JSON.parse(sessionStorage.getItem(USUARIO_LOGADO_KEY) || '{}');
    const usuario = sessao.usuario || {};
    return {
        instituicaoId: usuario.id || null,
        cidade: usuario.cidade || '',
        estado: usuario.estado || '',
    };
}

function comprimirImagem(arquivo, maxLado = 800, qualidade = 0.82) {
    return new Promise((resolve, reject) => {
        const imagem = new Image();
        const url = URL.createObjectURL(arquivo);

        imagem.onload = () => {
            let { width, height } = imagem;

            if (width > maxLado || height > maxLado) {
                if (width >= height) {
                    height = Math.round((height * maxLado) / width);
                    width = maxLado;
                } else {
                    width = Math.round((width * maxLado) / height);
                    height = maxLado;
                }
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            canvas.getContext('2d').drawImage(imagem, 0, 0, width, height);
            URL.revokeObjectURL(url);
            resolve(canvas.toDataURL('image/jpeg', qualidade));
        };

        imagem.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error('Não foi possível processar a imagem.'));
        };

        imagem.src = url;
    });
}

function coletarDadosFormulario() {
    const saudeSelecionada = document.querySelector('input[name="saudeAnimal"]:checked');
    const idadeValor = document.getElementById('idade').value.trim();

    return {
        nome:        document.getElementById('nome').value.trim(),
        especie:     document.getElementById('especie').value.trim(),
        raca:        document.getElementById('raca').value.trim(),
        sexo:        document.getElementById('sexo').value.trim(),
        idade:       idadeValor ? `${idadeValor} ${Number(idadeValor) === 1 ? 'ano' : 'anos'}` : '',
        porte:       document.getElementById('porte').value,
        saude:       saudeSelecionada ? saudeSelecionada.value : '',
        castrado:    document.getElementById('castrado').checked,
        vacinado:    document.getElementById('vacinado').checked,
        vermifugado: document.getElementById('vermifugado').checked,
        descricao:   document.getElementById('descricao').value.trim(),
        historico:   document.getElementById('historico').value.trim(),
    };
}

function validarFormulario(dados) {
    const obrigatorios = { nome: 'Nome', especie: 'Espécie', raca: 'Raça', sexo: 'Sexo', idade: 'Idade', descricao: 'Descrição' };

    for (const [campo, label] of Object.entries(obrigatorios)) {
        if (!dados[campo]) return `O campo "${label}" é obrigatório.`;
    }
    if (!dados.saude) return 'Selecione a saúde do animal.';
    return null;
}

function exibirMensagem(texto, tipo = 'erro') {
    let msg = document.getElementById('mensagemFeedback');
    if (!msg) {
        msg = document.createElement('p');
        msg.id = 'mensagemFeedback';
        msg.style.cssText = 'font-size:14px; margin-bottom:8px;';
        document.getElementById('submitBtn').prepend(msg);
    }
    msg.textContent = texto;
    msg.style.color = tipo === 'sucesso' ? '#3CB371' : '#FF383C';
}

async function cadastrarAnimal(payload) {
    const response = await fetch(`${API_URL}/animais`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        if (response.status === 404) {
            alert('Endpoint não encontrado. Verifique se a API está rodando com "npm run api".');
            return false;
        }
        alert('Não foi possível cadastrar o animal. Verifique se a API está rodando.');
        return false;
    }

    return true;
}

document.addEventListener('DOMContentLoaded', () => {
    const btnCancelar = document.getElementById('btnCancelar');
    const btnSalvar   = document.getElementById('btnSalvar');

    document.getElementById('foto').addEventListener('change', async (event) => {
        const arquivo = event.target.files[0];
        const preview = document.getElementById('fotoPreview');
        const nomeAtual = document.getElementById('fotoNomeAtual');

        if (!arquivo) {
            novaFotoBase64 = null;
            novaFotoNome   = null;
            preview.hidden = true;
            preview.removeAttribute('src');
            nomeAtual.textContent = '';
            return;
        }
        try {
            novaFotoBase64 = await comprimirImagem(arquivo);
            novaFotoNome   = arquivo.name;
            preview.src    = novaFotoBase64;
            preview.hidden = false;
            nomeAtual.textContent = `Arquivo: ${arquivo.name}`;
        } catch {
            alert('Não foi possível processar a imagem selecionada.');
        }
    });

    btnCancelar.addEventListener('click', () => {
        window.location.href = '../animalList/animalList.html';
    });

    btnSalvar.addEventListener('click', async () => {
        btnSalvar.disabled    = true;
        btnSalvar.textContent = 'Cadastrando...';

        try {
            const { instituicaoId, cidade, estado } = obterDadosSessao();

            if (!instituicaoId) {
                exibirMensagem('Sessão expirada. Faça login novamente.');
                btnSalvar.disabled    = false;
                btnSalvar.textContent = 'Cadastrar';
                return;
            }

            const dados = coletarDadosFormulario();
            const erro  = validarFormulario(dados);

            if (erro) {
                exibirMensagem(erro);
                btnSalvar.disabled    = false;
                btnSalvar.textContent = 'Cadastrar';
                return;
            }

            const payload = {
                ...dados,
                instituicaoId,
                cidade,
                estado,
                foto:     novaFotoBase64 || '',
                fotoNome: novaFotoNome   || '',
                status:   'disponivel',
            };

            const sucesso = await cadastrarAnimal(payload);

            if (sucesso) {
                window.location.href = '../animalList/animalList.html';
            } else {
                btnSalvar.disabled    = false;
                btnSalvar.textContent = 'Cadastrar';
            }
        } catch (err) {
            console.error(err);
            alert('Não foi possível conectar à API. Execute "npm run api" no terminal.');
            btnSalvar.disabled    = false;
            btnSalvar.textContent = 'Cadastrar';
        }
    });
});