const INSTITUICOES_FALLBACK = [
    { id: 1, nome: 'ONG Focinho Feliz' }
];

const ADOCOES_FALLBACK = [
    {
        id: 1,
        adotanteId: 1,
        instituicaoId: 1,
        nomeOng: 'ONG Focinho Feliz',
        nomePet: 'Ruffe',
        statusPet: 'Concluída',
        dataAdocao: '2025-10-10'
    },
    {
        id: 2,
        adotanteId: 1,
        instituicaoId: 1,
        nomeOng: 'ONG Focinho Feliz',
        nomePet: 'Loro',
        statusPet: 'Concluída',
        dataAdocao: '2025-09-28'
    }
];

async function carregarRecurso(recurso, fallback = []) {
    try {
        const response = await fetch(`${API_BASE_URL}/${recurso}`);
        if (!response.ok) return fallback;
        return await response.json();
    } catch {
        return fallback;
    }
}

function obterUsuarioLogado() {
    const dados = sessionStorage.getItem('usuarioLogado');
    return dados ? JSON.parse(dados) : null;
}

function formatarData(dataIso) {
    if (!dataIso) return '—';

    const [ano, mes, dia] = dataIso.split('-');
    if (!ano || !mes || !dia) return '—';

    return `${dia} / ${mes} / ${ano}`;
}

function obterNomePet(adocao) {
    return adocao.nomePet || adocao.nome || '—';
}

function criarMapaInstituicoes(instituicoes) {
    const lista = instituicoes.length ? instituicoes : INSTITUICOES_FALLBACK;

    return new Map(
        lista.map((instituicao) => [Number(instituicao.id), instituicao])
    );
}

function criarMapaAnimaisPorNome(animais) {
    return new Map(
        animais.map((animal) => [animal.nome?.toLowerCase().trim(), animal])
    );
}

function criarMapaAnimaisPorId(animais) {
    return new Map(
        animais.map((animal) => [Number(animal.id), animal])
    );
}

function resolverInstituicaoId(adocao, animaisPorNome, animaisPorId, instituicoesPorId) {
    if (adocao.instituicaoId) {
        return Number(adocao.instituicaoId);
    }

    if (adocao.animalId) {
        const animal = animaisPorId.get(Number(adocao.animalId));
        if (animal?.instituicaoId) return Number(animal.instituicaoId);
    }

    const nomePet = obterNomePet(adocao);
    if (nomePet !== '—') {
        const animal = animaisPorNome.get(nomePet.toLowerCase().trim());
        if (animal?.instituicaoId) return Number(animal.instituicaoId);
    }

    if (instituicoesPorId.size === 1) {
        return Number(instituicoesPorId.keys().next().value);
    }

    return 1;
}

function obterNomeOng(adocao, instituicoesPorId, instituicaoId) {
    if (adocao.nomeOng) return adocao.nomeOng;

    const instituicao = instituicoesPorId.get(Number(instituicaoId));
    if (instituicao?.nome) return instituicao.nome;

    return INSTITUICOES_FALLBACK[0]?.nome || 'ONG parceira';
}

function obterStatusPet(adocao) {
    return adocao.statusPet || 'Em andamento';
}

function enriquecerAdocoes(adocoes, instituicoes, animais) {
    const instituicoesPorId = criarMapaInstituicoes(instituicoes);
    const animaisPorNome = criarMapaAnimaisPorNome(animais);
    const animaisPorId = criarMapaAnimaisPorId(animais);

    return adocoes.map((adocao) => {
        const instituicaoId = resolverInstituicaoId(
            adocao,
            animaisPorNome,
            animaisPorId,
            instituicoesPorId
        );

        return {
            ...adocao,
            instituicaoId,
            nomeOng: obterNomeOng(adocao, instituicoesPorId, instituicaoId),
            nomePet: obterNomePet(adocao),
            statusPet: obterStatusPet(adocao)
        };
    });
}

function renderizarLista(adocoes) {
    const lista = document.getElementById('historicoLista');
    const vazio = document.getElementById('historicoEmpty');

    if (!adocoes.length) {
        lista.innerHTML = '';
        vazio.hidden = false;
        return;
    }

    vazio.hidden = true;
    lista.innerHTML = adocoes.map((adocao) => `
        <article class="historico-linha">
            <span class="historico-col" data-label="Data">${formatarData(adocao.dataAdocao)}</span>
            <span class="historico-col" data-label="Nome da ONG">${adocao.nomeOng}</span>
            <span class="historico-col" data-label="Nome do pet">${adocao.nomePet}</span>
            <span class="historico-col" data-label="Status do pet">${adocao.statusPet}</span>
        </article>
    `).join('');
}

document.addEventListener('DOMContentLoaded', async () => {
    const sessao = obterUsuarioLogado();
    const adotanteId = Number(sessao?.usuario?.id || 1);

    const [todasAdocoes, instituicoes, animais] = await Promise.all([
        carregarRecurso('adocoes', ADOCOES_FALLBACK),
        carregarRecurso('instituicoes', INSTITUICOES_FALLBACK),
        carregarRecurso('animais', [])
    ]);

    const adocoesAdotante = enriquecerAdocoes(
        todasAdocoes.filter((adocao) => Number(adocao.adotanteId) === adotanteId),
        instituicoes,
        animais
    ).sort((a, b) => new Date(b.dataAdocao) - new Date(a.dataAdocao));

    renderizarLista(adocoesAdotante);
});
