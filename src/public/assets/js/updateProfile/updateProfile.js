const USUARIO_LOGADO_KEY = 'usuarioLogado';
const API_URL = 'http://localhost:3000';

let novaFotoBase64 = null;
let novaFotoNome   = null;

// =====================
// Sessão
// =====================
function getSessao() {
    const sessao = sessionStorage.getItem(USUARIO_LOGADO_KEY);
    if (!sessao) {
        window.location.href = '../../../index.html';
        return null;
    }
    return JSON.parse(sessao);
}

// =====================
// Preview de foto
// =====================
function atualizarPreviewFoto(src, nomeArquivo) {
    const preview   = document.getElementById('fotoPreview');
    const nomeAtual = document.getElementById('fotoNomeAtual');

    if (src) {
        preview.src    = src;
        preview.hidden = false;
    } else {
        preview.hidden = true;
        preview.removeAttribute('src');
    }

    nomeAtual.textContent = nomeArquivo ? `Arquivo: ${nomeArquivo}` : '';
}

// =====================
// Comprimir imagem (igual ao animal)
// =====================
function comprimirImagem(arquivo, maxLado = 800, qualidade = 0.82) {
    return new Promise((resolve, reject) => {
        const imagem = new Image();
        const url    = URL.createObjectURL(arquivo);

        imagem.onload = () => {
            let { width, height } = imagem;

            if (width > maxLado || height > maxLado) {
                if (width >= height) {
                    height = Math.round((height * maxLado) / width);
                    width  = maxLado;
                } else {
                    width  = Math.round((width * maxLado) / height);
                    height = maxLado;
                }
            }

            const canvas = document.createElement('canvas');
            canvas.width  = width;
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

// =====================
// Preencher formulário
// =====================
function preencherFormulario(usuario) {
    setValue('nome',      usuario.nome);
    setValue('descricao', usuario.descricao);

    // Exibe a foto atual da instituição
    const nomeFoto = usuario.fotoNome || usuario.foto || '';
    atualizarPreviewFoto(usuario.foto || null, nomeFoto);
}

function setValue(id, valor) {
    const el = document.getElementById(id);
    if (el && valor !== undefined && valor !== null) {
        el.value = valor;
    }
}

function getValue(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
}

// =====================
// Salvar alterações (PUT /instituicoes/:id)
// =====================
async function salvarAlteracoes(sessao) {
    const nome      = getValue('nome');
    const descricao = getValue('descricao');

    if (!nome) {
        alert('O nome não pode estar vazio!');
        return;
    }

    const payload = { ...sessao.usuario, nome, descricao };

    if (novaFotoBase64) {
        payload.foto     = novaFotoBase64;
        payload.fotoNome = novaFotoNome;
    }

    try {
        const response = await fetch(`${API_URL}/instituicoes/${sessao.usuario.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error(`Erro HTTP ${response.status}`);

        const usuarioAtualizado = await response.json();

        const { senha, ...usuarioSemSenha } = usuarioAtualizado;
        sessionStorage.setItem(USUARIO_LOGADO_KEY, JSON.stringify({
            tipo: sessao.tipo,
            usuario: usuarioSemSenha
        }));

        alert('Perfil atualizado com sucesso!');

    } catch (error) {
        console.error('Erro ao atualizar perfil:', error);
        alert('Ocorreu um erro ao salvar. Tente novamente.');
    }
}

// =====================
// Inicialização
// =====================
document.addEventListener('DOMContentLoaded', () => {
    const sessao = getSessao();
    if (!sessao) return;

    preencherFormulario(sessao.usuario);

    // Listener do input file — comprime e exibe preview
    document.getElementById('foto').addEventListener('change', async (event) => {
        const arquivo = event.target.files[0];

        if (!arquivo) {
            novaFotoBase64 = null;
            novaFotoNome   = null;
            const nomeFoto = sessao.usuario.fotoNome || sessao.usuario.foto || '';
            atualizarPreviewFoto(sessao.usuario.foto || null, nomeFoto);
            return;
        }

        try {
            novaFotoBase64 = await comprimirImagem(arquivo);
            novaFotoNome   = arquivo.name;
            atualizarPreviewFoto(novaFotoBase64, arquivo.name);
        } catch {
            alert('Não foi possível processar a imagem selecionada.');
        }
    });

    // Botão Atualizar
    document.querySelector('.btnSalvar').addEventListener('click', () => {
        salvarAlteracoes(sessao);
    });

    // Botão Cancelar — restaura valores originais
    document.querySelector('.btnCancelar').addEventListener('click', () => {
        novaFotoBase64 = null;
        novaFotoNome   = null;
        preencherFormulario(sessao.usuario);
        document.getElementById('foto').value = '';
    });
});