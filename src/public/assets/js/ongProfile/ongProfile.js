let instituicaoAtual = null;

function obterIdDaUrl() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (!id) return null;

    const numero = Number(id);
    return Number.isFinite(numero) && numero > 0 ? numero : null;
}

function ehInstituicaoLogada(sessao) {
    return sessao?.tipo === 'instituicao' || Boolean(sessao?.usuario?.cnpj);
}

function obterInstituicaoIdDaSessao() {
    const sessao = obterUsuarioLogado();
    const id = sessao?.usuario?.id;
    if (!id) return null;

    const numero = Number(id);
    return Number.isFinite(numero) && numero > 0 ? numero : null;
}

function obterInstituicaoIdParaPainel() {
    const idSessao = obterInstituicaoIdDaSessao();
    if (idSessao) return idSessao;

    const idUrl = obterIdDaUrl();
    if (idUrl) return idUrl;

    return 1;
}

function obterFotoInstituicao(foto) {
    if (!foto) return '../../../assets/img/icon-perfil-ong.svg';
    if (foto.startsWith('data:')) return foto;
    return `../../../assets/img/${foto}`;
}

function formatarEndereco(instituicao) {
    const partes = [
        instituicao.endereco,
        instituicao.numero ? `nº ${instituicao.numero}` : '',
        instituicao.bairro,
        instituicao.cidade && instituicao.estado
            ? `${instituicao.cidade}/${instituicao.estado}`
            : instituicao.cidade
    ].filter(Boolean);

    return partes.join(' - ') || 'Endereço não informado';
}

async function carregarInstituicao(id, instituicaoFallback = null) {
    try {
        const response = await fetch(`${API_BASE_URL}/instituicoes/${id}`);
        if (!response.ok) return instituicaoFallback;
        return await response.json();
    } catch {
        return instituicaoFallback;
    }
}

async function carregarAnimaisDaOng(instituicaoId) {
    try {
        const response = await fetch(`${API_BASE_URL}/animais?instituicaoId=${instituicaoId}`);
        if (!response.ok) {
            const todos = await carregarAnimais();
            return todos.filter((a) => a.instituicaoId === instituicaoId);
        }
        return await response.json();
    } catch {
        const todos = await carregarAnimais();
        return todos.filter((a) => a.instituicaoId === instituicaoId);
    }
}

async function carregarDoacoesOng(instituicaoId) {
    try {
        const response = await fetch(`${API_BASE_URL}/doacoesRealizadas?instituicaoId=${instituicaoId}`);
        if (!response.ok) {
            const responseGeral = await fetch(`${API_BASE_URL}/doacoesRealizadas`);
            if (!responseGeral.ok) return [];
            const doacoes = await responseGeral.json();
            return doacoes.filter((d) => d.instituicaoId === instituicaoId);
        }
        return await response.json();
    } catch {
        return [];
    }
}

function calcularEstatisticasOng(animaisOng, doacoesOng) {
    return {
        totalCadastrados: animaisOng.length,
        totalAdotados: doacoesOng.length
    };
}

function renderizarAnimais(animais) {
    const grid = document.getElementById('ongAnimaisGrid');
    const disponiveis = animais.filter((a) => a.status === 'disponivel');

    if (!disponiveis.length) {
        grid.innerHTML = '<p class="ong-perfil-erro">Nenhum animal disponível no momento.</p>';
        return;
    }

    const perfilBase = document.body.dataset.perfilAnimalBase || '../../adotante/animalProfile/animalProfile.html';

    grid.innerHTML = disponiveis.map((animal) => `
        <a href="${perfilBase}?id=${animal.id}" class="ong-perfil-animal-card">
            <img src="${obterCaminhoFoto(animal.foto)}" alt="${animal.nome}" class="ong-perfil-animal-photo">
            <span class="ong-perfil-animal-label">${animal.nome} - ${animal.idade}</span>
        </a>
    `).join('');
}

function preencherPerfil(instituicao, animais, estatisticas) {
    document.getElementById('ongPerfilLogo').src = obterFotoInstituicao(instituicao.foto);
    document.getElementById('ongPerfilLogo').alt = instituicao.nome;
    document.getElementById('ongPerfilNome').textContent = instituicao.nome;
    document.getElementById('ongPerfilDescricao').textContent = instituicao.descricao || '';
    document.getElementById('ongPerfilTelefone').textContent = instituicao.telefone || 'Telefone não informado';
    document.getElementById('ongPerfilCnpj').textContent = instituicao.cnpj || 'CNPJ não informado';
    document.getElementById('ongPerfilEndereco').textContent = formatarEndereco(instituicao);

    document.getElementById('ongTotalAdotados').textContent = estatisticas.totalAdotados;
    document.getElementById('ongTotalCadastrados').textContent = estatisticas.totalCadastrados;

    renderizarAnimais(animais);
    document.getElementById('ongPerfilConteudo').hidden = false;
    document.getElementById('ongPerfilErro').hidden = true;
    document.title = `${instituicao.nome} - Perfil da ONG`;
}

async function iniciarPerfilOng(obterInstituicaoId, instituicaoFallback = null) {
    const instituicaoId = obterInstituicaoId();

    if (!instituicaoId) {
        document.getElementById('ongPerfilErro').hidden = false;
        return;
    }

    instituicaoAtual = await carregarInstituicao(instituicaoId, instituicaoFallback);

    if (!instituicaoAtual) {
        document.getElementById('ongPerfilErro').hidden = false;
        return;
    }

    const [animaisOng, doacoesOng] = await Promise.all([
        carregarAnimaisDaOng(instituicaoId),
        carregarDoacoesOng(instituicaoId)
    ]);

    const estatisticas = calcularEstatisticasOng(animaisOng, doacoesOng);
    preencherPerfil(instituicaoAtual, animaisOng, estatisticas);
}

async function iniciarPerfilOngInstituicao() {
    const sessao = obterUsuarioLogado();
    const instituicaoId = obterInstituicaoIdParaPainel();
    const instituicaoFallback = ehInstituicaoLogada(sessao) ? sessao.usuario : null;

    await iniciarPerfilOng(
        () => instituicaoId,
        instituicaoFallback
    );
}
