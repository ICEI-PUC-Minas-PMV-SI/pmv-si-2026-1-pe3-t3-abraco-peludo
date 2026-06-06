let todasDoacoes = [];

const DOACOES_FALLBACK = [
    {
        id: 1,
        instituicaoId: 1,
        nome: 'Dobby',
        idade: '2 anos',
        raca: 'Doberman',
        sexo: 'Macho',
        cidade: 'Belo Horizonte',
        foto: 'icon-cachorro.svg',
        dataAdocao: '2025-10-10'
    }
];

async function carregarDoacoes() {
    try {
        const response = await fetch(`${API_BASE_URL}/doacoesRealizadas`);
        if (!response.ok) return DOACOES_FALLBACK;
        return await response.json();
    } catch {
        return DOACOES_FALLBACK;
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

function formatarData(dataIso) {
    if (!dataIso) return 'Data não informada';
    const [ano, mes, dia] = dataIso.split('-');
    if (!ano || !mes || !dia) return dataIso;
    return `${dia}/${mes}/${ano}`;
}

function filtrarDoacoes(doacoes, filtros) {
    const busca = normalizarTexto(filtros.busca);

    return doacoes.filter((doacao) => {
        if (filtros.instituicaoId && doacao.instituicaoId !== filtros.instituicaoId) {
            return false;
        }

        if (filtros.idade && doacao.idade !== filtros.idade) {
            return false;
        }

        if (filtros.raca && doacao.raca !== filtros.raca) {
            return false;
        }

        if (filtros.sexo && doacao.sexo !== filtros.sexo) {
            return false;
        }

        if (filtros.cidade && doacao.cidade !== filtros.cidade) {
            return false;
        }

        if (busca) {
            const texto = [
                doacao.nome,
                doacao.idade,
                doacao.raca,
                doacao.cidade,
                formatarData(doacao.dataAdocao)
            ].map(normalizarTexto).join(' ');

            if (!texto.includes(busca)) return false;
        }

        return true;
    });
}

function renderizarCards(doacoes) {
    const grid = document.getElementById('doacoesGrid');
    const vazio = document.getElementById('doacoesEmpty');

    if (!doacoes.length) {
        grid.innerHTML = '';
        vazio.hidden = false;
        return;
    }

    vazio.hidden = true;
    grid.innerHTML = doacoes.map((doacao) => `
        <article class="doacoes-card">
            <img src="${obterCaminhoFoto(doacao.foto)}" alt="${doacao.nome}" class="doacoes-card-photo">
            <div class="doacoes-card-label">
                <span>${doacao.nome} - ${doacao.idade}</span>
                <span class="doacoes-card-data">Doado ${formatarData(doacao.dataAdocao)}</span>
            </div>
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
    const instituicaoId = sessao?.usuario?.id || 1;

    const filtrados = filtrarDoacoes(todasDoacoes, {
        instituicaoId: Number(instituicaoId),
        busca: document.getElementById('buscaDoacao').value,
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
    todasDoacoes = await carregarDoacoes();

    const sessao = obterUsuarioLogado();
    const instituicaoId = sessao?.usuario?.id || 1;
    const doacoesOng = todasDoacoes.filter((d) => d.instituicaoId === Number(instituicaoId));

    preencherSelect('filtroIdade', [...new Set(doacoesOng.map((d) => d.idade).filter(Boolean))]);
    preencherSelect('filtroRaca', [...new Set(doacoesOng.map((d) => d.raca).filter(Boolean))]);
    preencherSelect('filtroLocalizacao', [...new Set(doacoesOng.map((d) => d.cidade).filter(Boolean))]);

    initFiltrosDropdown();
    initSelectsEstilo();

    document.getElementById('buscaDoacao').addEventListener('input', aplicarFiltros);
    document.getElementById('buscaDoacao').addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            aplicarFiltros();
        }
    });
    document.getElementById('btnSearch').addEventListener('click', aplicarFiltros);

    aplicarFiltros();
});
