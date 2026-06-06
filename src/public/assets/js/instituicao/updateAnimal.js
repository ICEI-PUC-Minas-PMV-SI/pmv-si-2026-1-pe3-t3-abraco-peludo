let animalAtual = null;
let novaFotoBase64 = null;
let novaFotoNome = null;

function obterIdDaUrl() {
    const params = new URLSearchParams(window.location.search);
    return Number(params.get('id'));
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

function atualizarPreviewFoto(src, nomeArquivo) {
    const preview = document.getElementById('fotoPreview');
    const nomeAtual = document.getElementById('fotoNomeAtual');

    if (src) {
        preview.src = src;
        preview.hidden = false;
    } else {
        preview.hidden = true;
        preview.removeAttribute('src');
    }

    nomeAtual.textContent = nomeArquivo ? `Arquivo: ${nomeArquivo}` : '';
}

function preencherFormulario(animal) {
    document.getElementById('nome').value = animal.nome || '';
    document.getElementById('descricao').value = animal.descricao || '';
    document.getElementById('historico').value = animal.historico || '';
    document.getElementById('raca').value = animal.raca || '';
    document.getElementById('sexo').value = animal.sexo || '';
    document.getElementById('idade').value = animal.idade || '';
    document.getElementById('porte').value = animal.porte || 'Pequeno';

    const saude = animal.saude || 'Saudável';
    const radioSaude = document.querySelector(`input[name="saudeAnimal"][value="${saude}"]`);
    if (radioSaude) {
        radioSaude.checked = true;
    }

    const nomeFoto = animal.fotoNome || animal.foto || '';
    atualizarPreviewFoto(obterCaminhoFoto(animal.foto), nomeFoto);

    document.getElementById('inputContainer').hidden = false;
    document.getElementById('submitBtn').hidden = false;
    document.getElementById('editarErro').hidden = true;
}

function coletarDadosFormulario() {
    const saudeSelecionada = document.querySelector('input[name="saudeAnimal"]:checked');

    const dados = {
        nome: document.getElementById('nome').value.trim(),
        descricao: document.getElementById('descricao').value.trim(),
        historico: document.getElementById('historico').value.trim(),
        raca: document.getElementById('raca').value.trim(),
        sexo: document.getElementById('sexo').value.trim(),
        idade: document.getElementById('idade').value.trim(),
        porte: document.getElementById('porte').value,
        saude: saudeSelecionada ? saudeSelecionada.value : animalAtual.saude
    };

    if (novaFotoBase64) {
        dados.foto = novaFotoBase64;
        dados.fotoNome = novaFotoNome;
    }

    return dados;
}

async function salvarAnimal() {
    if (!animalAtual) return;

    const dados = coletarDadosFormulario();
    const payload = { ...animalAtual, ...dados };

    try {
        const response = await fetch(`${API_BASE_URL}/animais/${animalAtual.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            if (response.status === 404) {
                alert('Animal não encontrado na API. Reinicie o servidor com "npm run api" e tente novamente.');
                return;
            }

            alert('Não foi possível atualizar o animal. Verifique se a API está rodando.');
            return;
        }

        window.location.href = '../animalList/animalList.html';
    } catch {
        alert('Não foi possível conectar à API. Execute "npm run api" no terminal.');
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const animalId = obterIdDaUrl();

    if (!animalId) {
        document.getElementById('inputContainer').hidden = true;
        document.getElementById('submitBtn').hidden = true;
        document.getElementById('editarErro').hidden = false;
        return;
    }

    animalAtual = await buscarAnimalPorId(animalId);

    if (!animalAtual) {
        document.getElementById('inputContainer').hidden = true;
        document.getElementById('submitBtn').hidden = true;
        document.getElementById('editarErro').hidden = false;
        return;
    }

    preencherFormulario(animalAtual);
    document.title = `Editar ${animalAtual.nome}`;

    document.getElementById('foto').addEventListener('change', async (event) => {
        const arquivo = event.target.files[0];

        if (!arquivo) {
            novaFotoBase64 = null;
            novaFotoNome = null;
            const nomeFoto = animalAtual.fotoNome || animalAtual.foto || '';
            atualizarPreviewFoto(obterCaminhoFoto(animalAtual.foto), nomeFoto);
            return;
        }

        try {
            novaFotoBase64 = await comprimirImagem(arquivo);
            novaFotoNome = arquivo.name;
            atualizarPreviewFoto(novaFotoBase64, arquivo.name);
        } catch {
            alert('Não foi possível processar a imagem selecionada.');
        }
    });

    document.getElementById('btnCancelar').addEventListener('click', () => {
        window.location.href = '../animalList/animalList.html';
    });

    document.getElementById('btnSalvar').addEventListener('click', salvarAnimal);
});
