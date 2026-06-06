let todasAdocoes = [];

const ADOCOES_FALLBACK = [
    {
        id: 1,
        adotanteId: 1,
        nome: 'Ruffe',
        idade: '2 anos',
        raca: 'Vira-lata',
        sexo: 'Macho',
        cidade: 'Belo Horizonte',
        foto: 'icon-cachorro.svg'
    }
];

async function carregarAdocoes() {
    try {
        const response = await fetch(`${API_BASE_URL}/adocoes`);
        if (!response.ok) return ADOCOES_FALLBACK;
        return await response.json();
    } catch {
        return ADOCOES_FALLBACK;
    }
}

function obterUsuarioLogado() {
    const dados = sessionStorage.getItem('usuarioLogado');
    return dados ? JSON.parse(dados) : null;
}

function obterCaminhoFoto(foto) {
    return `../../../assets/img/${foto || 'icon-pata.svg'}`;
}

function normalizarTexto(valor) {
    return (valor || '').toString().toLowerCase().trim();
}

function filtrarAdocoes(adocoes, filtros) {
    const busca = normalizarTexto(filtros.busca);

    return adocoes.filter((adocao) => {
        if (filtros.adotanteId && adocao.adotanteId !== filtros.adotanteId) {
            return false;
        }

        if (filtros.idade && adocao.idade !== filtros.idade) {
            return false;
        }

        if (filtros.raca && adocao.raca !== filtros.raca) {
            return false;
        }

        if (filtros.sexo && adocao.sexo !== filtros.sexo) {
            return false;
        }

        if (filtros.cidade && adocao.cidade !== filtros.cidade) {
            return false;
        }

        if (busca) {
            const texto = [
                adocao.nome,
                adocao.idade,
                adocao.raca,
                adocao.cidade
            ].map(normalizarTexto).join(' ');

            if (!texto.includes(busca)) return false;
        }

        return true;
    });
}

function renderizarCards(adocoes) {
    const grid = document.getElementById('historicoGrid');
    const vazio = document.getElementById('historicoEmpty');

    if (!adocoes.length) {
        grid.innerHTML = '';
        vazio.hidden = false;
        return;
    }

    vazio.hidden = true;
    grid.innerHTML = adocoes.map((adocao) => `
        <article class="historico-card">
            <img src="${obterCaminhoFoto(adocao.foto)}" alt="${adocao.nome}" class="historico-card-photo">
            <p class="historico-card-label">${adocao.nome} - ${adocao.idade} - ${adocao.cidade}</p>
        </article>
    `).join('');
}

function preencherSelect(selectId, valores) {
    const select = document.getElementById(selectId);

    select.innerHTML = '<option value="">Clique para selecionar</option>';

    valores.forEach((valor) => {
        const option = document.createElement('option');
        option.value = valor;
        option.textContent = valor;
        select.appendChild(option);
    });
}

function aplicarFiltros() {
    const sessao = obterUsuarioLogado();
    const adotanteId = sessao?.usuario?.id || 1;

    const filtrados = filtrarAdocoes(todasAdocoes, {
        adotanteId: Number(adotanteId),
        busca: document.getElementById('buscaHistorico').value,
        idade: document.getElementById('filtroIdade').value,
        raca: document.getElementById('filtroRaca').value,
        sexo: document.getElementById('filtroSexo').value,
        cidade: document.getElementById('filtroLocalizacao').value
    });

    renderizarCards(filtrados);
}

function initFiltrosDropdown() {
    const btnFiltros = document.getElementById('btnFiltros');
    const painel = document.getElementById('filtrosDropdown');

    btnFiltros.addEventListener('click', (event) => {
        event.stopPropagation();
        const aberto = !painel.classList.contains('aberto');
        painel.classList.toggle('aberto', aberto);
        painel.hidden = !aberto;
        btnFiltros.classList.toggle('ativo', aberto);
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.filtros-dropdown-wrapper')) {
            painel.classList.remove('aberto');
            painel.hidden = true;
            btnFiltros.classList.remove('ativo');
        }
    });

    painel.addEventListener('click', (event) => event.stopPropagation());
}

function initSelectsEstilo() {
    document.querySelectorAll('.filtro-campo select').forEach((select) => {
        select.addEventListener('change', () => {
            select.classList.toggle('opcao-selecionada', Boolean(select.value));
            aplicarFiltros();
        });
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    todasAdocoes = await carregarAdocoes();

    const sessao = obterUsuarioLogado();
    const adotanteId = sessao?.usuario?.id || 1;
    const adocoesAdotante = todasAdocoes.filter((a) => a.adotanteId === Number(adotanteId));

    preencherSelect('filtroIdade', [...new Set(adocoesAdotante.map((a) => a.idade))]);
    preencherSelect('filtroRaca', [...new Set(adocoesAdotante.map((a) => a.raca))]);
    preencherSelect('filtroLocalizacao', [...new Set(adocoesAdotante.map((a) => a.cidade))]);

    initFiltrosDropdown();
    initSelectsEstilo();

    document.getElementById('buscaHistorico').addEventListener('input', aplicarFiltros);
    document.getElementById('buscaHistorico').addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            aplicarFiltros();
        }
    });
    aplicarFiltros();
});
