// adoptionRequest.js
// Busca os dados do pedido de adoção selecionado diretamente do db.json (json-server)

const API_URL = 'http://localhost:3000';

// ── Helpers ────────────────────────────────────────────────────────────────────

function formatarData(dataISO) {
    if (!dataISO) return '—';
    // Suporta "YYYY-MM-DD" e ISO completo
    const [ano, mes, dia] = dataISO.split('T')[0].split('-');
    return `${dia}/${mes}/${ano}`;
}

function traduzirMoradia(moradia) {
    const mapa = {
        casaComTela:       'Casa com telas em todas as janelas',
        casaSemTela:       'Casa sem telas nas janelas',
        apComTela:         'Apartamento com telas em todas as janelas',
        apSemTela:         'Apartamento sem telas nas janelas',
        coberturaComTela:  'Cobertura com telas',
        coberturaSemTela:  'Cobertura sem telas',
        terreoComTela:     'Térreo com telas',
        terreoSemTela:     'Térreo sem telas',
    };
    return mapa[moradia] || moradia || '—';
}

function traduzirSimNao(valor) {
    if (!valor) return '—';
    const v = valor.toString().toLowerCase();
    if (v === 'sim' || v === 'true') return 'Sim';
    if (v === 'nao' || v === 'não' || v === 'false') return 'Não';
    return valor;
}

// ── Busca de dados ─────────────────────────────────────────────────────────────

async function buscarAdocao(id) {
    const res = await fetch(`${API_URL}/adocoes/${id}`);
    if (!res.ok) throw new Error(`Adoção ${id} não encontrada`);
    return res.json();
}

async function buscarAnimal(id) {
    const res = await fetch(`${API_URL}/animais/${id}`);
    if (!res.ok) return null;
    return res.json();
}

async function buscarAdotante(id) {
    const res = await fetch(`${API_URL}/adotantes/${id}`);
    if (!res.ok) return null;
    return res.json();
}

async function buscarInstituicao(id) {
    const res = await fetch(`${API_URL}/instituicoes/${id}`);
    if (!res.ok) return null;
    return res.json();
}

// ── Renderização ───────────────────────────────────────────────────────────────

function preencherInput(seletor, valor) {
    const el = document.querySelector(seletor);
    if (el) el.value = valor ?? '—';
}

function renderizarDadosDoPedido(adocao, animal, adotante, instituicao) {

    // ── Animal ──────────────────────────────────────────────────────────────────

    const fotoEl = document.querySelector('.animal-foto-detalhe');
    if (fotoEl) {
        // Se a foto for base64 ou caminho de arquivo, usa direto
        fotoEl.src = animal?.foto?.startsWith('data:')
            ? animal.foto
            : `../../../assets/img/${animal?.foto || 'icon-cachorro.svg'}`;
        fotoEl.alt = animal?.nome || 'Foto do pet';
    }

    const nomeAnimalEl = document.querySelector('.animal-nome-titulo');
    if (nomeAnimalEl) nomeAnimalEl.textContent = animal?.nome || '—';

    const sobreEl = document.querySelector('.animal-descricao-bloco p');
    if (sobreEl) sobreEl.textContent = animal?.descricao || '—';

    const sobreTituloEl = document.querySelector('.animal-descricao-bloco h4');
    if (sobreTituloEl) sobreTituloEl.textContent = `Sobre ${animal?.nome || 'o pet'}`;

    // Tags: gênero, idade, porte
    // Cada .tag-item tem um <span class="tag-texto"> com o valor
    const tags = document.querySelectorAll('.tag-item');

    function preencherTag(tag, valor) {
        if (!tag) return;
        const textoEl = tag.querySelector('.tag-texto');
        if (textoEl) {
            textoEl.textContent = valor;
        } else {
            // fallback: substitui nó de texto direto preservando o ícone
            const textoNode = [...tag.childNodes].find(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim());
            if (textoNode) textoNode.textContent = ' ' + valor;
        }
    }

    preencherTag(tags[0], animal?.sexo  || '—');
    preencherTag(tags[1], animal?.idade || '—');
    preencherTag(tags[2], animal?.porte || '—');

    // Saúde
    const itemVacinado    = document.querySelector('.item-vacinado');
    const itemCastrado    = document.querySelector('.item-castrado');
    const itemVermifugado = document.querySelector('.item-vermifugado');
    if (itemVacinado)    itemVacinado.style.display    = animal?.vacinado    ? 'flex' : 'none';
    if (itemCastrado)    itemCastrado.style.display    = animal?.castrado    ? 'flex' : 'none';
    if (itemVermifugado) itemVermifugado.style.display = animal?.vermifugado ? 'flex' : 'none';

    // ── ONG ─────────────────────────────────────────────────────────────────────

    const nomeOngEl = document.querySelector('.ong-header-inline h2');
    if (nomeOngEl) nomeOngEl.textContent = instituicao?.nome || adocao?.nomeOng || '—';

    const descOngEl = document.querySelector('.animal-ong-info p');
    if (descOngEl) descOngEl.textContent = instituicao?.descricao || '—';

    // ── Adotante ─────────────────────────────────────────────────────────────────

    const inputs = document.querySelectorAll('.solicitacao-input-readonly');

    // Dados pessoais (inputs 0-3)
    if (inputs[0]) inputs[0].value = adotante?.nomeCompleto  || '—';
    if (inputs[1]) inputs[1].value = adotante?.cpf           || '—';
    if (inputs[2]) inputs[2].value = formatarData(adotante?.dataNascimento) || '—';
    if (inputs[3]) inputs[3].value = adotante?.email         || '—';

    // Respostas do formulário de adoção (inputs 4-8)
    if (inputs[4]) inputs[4].value = adocao?.estado          || '—';
    if (inputs[5]) inputs[5].value = adocao?.cidade          || '—';
    if (inputs[6]) inputs[6].value = traduzirSimNao(adocao?.temCriancas)    || '—';
    if (inputs[7]) inputs[7].value = traduzirSimNao(adocao?.familiaCiente)  || '—';
    if (inputs[8]) inputs[8].value = adocao?.petParaPresente || '—';

    // Moradia (input 9)
    // O campo "moradia" do db.json guarda um único valor (ex: "casaSemTela")
    // O HTML pode ter 8 campos de moradia como no mock; preenchemos apenas o relevante
    const nomesMoradia = [
        'casaComTela', 'casaSemTela', 'apComTela', 'apSemTela',
        'coberturaComTela', 'coberturaSemTela', 'terreoComTela', 'terreoSemTela'
    ];
    if (inputs[9]) {
        // Se só há 1 campo de moradia, escreve o texto traduzido
        inputs[9].value = traduzirMoradia(adocao?.moradia);
    }
    // Se o HTML tiver os 8 campos de moradia (inputs 9-16), preenche cada um
    nomesMoradia.forEach((chave, i) => {
        const input = inputs[9 + i];
        if (input) {
            input.value = adocao?.moradia === chave ? 'Sim' : 'Não se aplica';
        }
    });
}

// ── Botões de ação ─────────────────────────────────────────────────────────────

async function configurarBotoesAcao(adocaoId) {
    const btnRecusar = document.getElementById('btnRecusarPedido');
    const btnAceitar = document.getElementById('btnAceitarPedido');

    if (btnRecusar) {
        btnRecusar.addEventListener('click', async () => {
            const confirmacao = confirm('Tem certeza de que deseja recusar este pedido de adoção?');
            if (!confirmacao) return;

            try {
                await fetch(`${API_URL}/adocoes/${adocaoId}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ statusPet: 'Recusado' }),
                });
                window.location.href = '../recusaPedido/recusaPedido.html';
            } catch (err) {
                console.error('Erro ao recusar pedido:', err);
                alert('Não foi possível recusar o pedido. Tente novamente.');
            }
        });
    }

    if (btnAceitar) {
        btnAceitar.addEventListener('click', async () => {
            try {
                await fetch(`${API_URL}/adocoes/${adocaoId}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ statusPet: 'Aprovado' }),
                });
                window.location.href = '../sucessoPedido/sucessoPedido.html';
            } catch (err) {
                console.error('Erro ao aceitar pedido:', err);
                alert('Não foi possível aceitar o pedido. Tente novamente.');
            }
        });
    }
}

// ── Inicialização ──────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const idPedido = params.get('id') || localStorage.getItem('idPedidoSelecionado');

    if (!idPedido) {
        alert('Nenhum pedido selecionado.');
        window.location.href = '../additionRequests/additionRequests.html';
        return;
    }

    try {
        // Busca a adoção primeiro
        const adocao = await buscarAdocao(idPedido);

        // Busca animal, adotante e instituição em paralelo
        const [animal, adotante, instituicao] = await Promise.all([
            buscarAnimal(adocao.animalId),
            buscarAdotante(adocao.adotanteId),
            buscarInstituicao(adocao.instituicaoId),
        ]);

        renderizarDadosDoPedido(adocao, animal, adotante, instituicao);
        configurarBotoesAcao(idPedido);

    } catch (err) {
        console.error('Erro ao carregar dados do pedido:', err);
        alert('Pedido não encontrado ou erro ao carregar dados.');
        window.location.href = '../additionRequests/additionRequests.html';
    }
});