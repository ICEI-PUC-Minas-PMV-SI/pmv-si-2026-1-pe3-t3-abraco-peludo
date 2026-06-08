const API_URL = 'http://localhost:3000';
const USUARIO_LOGADO_KEY = 'usuarioLogado';

function obterInstituicaoLogada() {
    const sessao = JSON.parse(sessionStorage.getItem(USUARIO_LOGADO_KEY) || '{}');
    return sessao.usuario || null;
}

function formatarData(dataISO) {
    if (!dataISO) return '—';
    const [ano, mes, dia] = dataISO.split('-');
    return `${dia} / ${mes} / ${ano}`;
}

async function buscarAdocoesDaInstituicao(instituicaoId) {
    const response = await fetch(`${API_URL}/adocoes?instituicaoId=${instituicaoId}&statusPet=Aguardando aprovação`);
    if (!response.ok) return [];
    return response.json();
}

async function buscarAdotante(adotanteId) {
    const response = await fetch(`${API_URL}/adotantes/${adotanteId}`);
    if (!response.ok) return null;
    return response.json();
}

function renderizarPedidos(pedidos) {
    const listaContainer = document.querySelector('.pedidos-lista');

    if (!listaContainer) {
        console.error("Container '.pedidos-lista' não encontrado.");
        return;
    }

    listaContainer.innerHTML = '';

    if (pedidos.length === 0) {
        listaContainer.innerHTML = `<p class="ong-list-empty">Nenhum pedido de adoção pendente.</p>`;
        return;
    }

    pedidos.forEach(pedido => {
        const item = document.createElement('div');
        item.classList.add('pedido-item');
        item.innerHTML = `
            <span class="pedido-dado pedido-data">${formatarData(pedido.dataAdocao)}</span>
            <span class="pedido-dado pedido-adotante">${pedido.nomeAdotante || '—'}</span>
            <span class="pedido-dado pedido-pet">${pedido.nomePet}</span>
            <button type="button" class="pedido-btn" onclick="verSolicitacao('${pedido.id}')">Ver solicitação</button>
        `;
        listaContainer.appendChild(item);
    });
}

function verSolicitacao(id) {
    localStorage.setItem('idPedidoSelecionado', id);
    window.location.href = '../detalhesPedido/detalhesPedido.html';
}

document.addEventListener('DOMContentLoaded', async () => {
    const instituicao = obterInstituicaoLogada();

    if (!instituicao) {
        alert('Sessão expirada. Faça login novamente.');
        window.location.href = '../../../index.html';
        return;
    }

    const adocoes = await buscarAdocoesDaInstituicao(instituicao.id);

    // Busca o nome de cada adotante em paralelo
    const adocoesComNome = await Promise.all(
        adocoes.map(async (adocao) => {
            const adotante = await buscarAdotante(adocao.adotanteId);
            return {
                ...adocao,
                nomeAdotante: adotante ? adotante.nomeCompleto : '—',
            };
        })
    );

    renderizarPedidos(adocoesComNome);
});