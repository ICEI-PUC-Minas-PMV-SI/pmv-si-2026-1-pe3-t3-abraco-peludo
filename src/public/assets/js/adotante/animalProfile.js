function obterIdDaUrl() {
    const params = new URLSearchParams(window.location.search);
    return Number(params.get('id'));
}

async function carregarInstituicao(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/instituicoes/${id}`);
        if (!response.ok) return null;
        return await response.json();
    } catch {
        return null;
    }
}

function renderizarSaude(animal) {
    const lista = document.getElementById('perfilSaudeLista');
    const itens = [];

    if (animal.vacinado) {
        itens.push({ icone: 'icon-vacinado.svg', texto: 'Vacinado' });
    }
    if (animal.castrado) {
        itens.push({ icone: 'icon-castrado.svg', texto: 'Castrado' });
    }
    if (animal.vermifugado) {
        itens.push({ icone: 'icon-vermifugado.svg', texto: 'Vermifugado' });
    }

    lista.innerHTML = itens.map((item) => `
        <div class="perfil-saude-item">
            <img src="../../../assets/img/${item.icone}" alt="${item.texto}">
            <span>${item.texto}</span>
        </div>
    `).join('');
}

function preencherPerfil(animal, instituicao) {
    document.getElementById('perfilFoto').src = obterCaminhoFoto(animal.foto);
    document.getElementById('perfilFoto').alt = animal.nome;
    document.getElementById('perfilNome').textContent = animal.nome;
    document.getElementById('perfilSexo').textContent = animal.sexo;
    document.getElementById('perfilSexoIcone').src = animal.sexo === 'Fêmea'
        ? '../../../assets/img/icon-gato.svg'
        : '../../../assets/img/icon-macho.svg';
    document.getElementById('perfilIdade').textContent = animal.idade;
    document.getElementById('perfilPorte').textContent = animal.porte;

    document.getElementById('perfilSobreTitulo').textContent = `Sobre o ${animal.nome}`;
    document.getElementById('perfilDescricao').textContent = animal.descricao || '';
    document.getElementById('perfilHistorico').textContent = animal.historico || '';

    document.getElementById('perfilOngNome').textContent = instituicao?.nome || 'ONG parceira';
    document.getElementById('perfilOngDescricao').textContent = instituicao?.descricao || '';
    document.getElementById('perfilOngTelefone').textContent = instituicao?.telefone || 'Telefone não informado';

    const local = [instituicao?.cidade, instituicao?.estado].filter(Boolean).join('/');
    document.getElementById('perfilOngLocal').textContent = local || animal.cidade;

    document.getElementById('perfilBtnAdotar').href = `../adoptionForm01/adoptionForm01.html?animalId=${animal.id}`;
    document.title = `${animal.nome} - Perfil`;

    renderizarSaude(animal);

    document.getElementById('perfilConteudo').hidden = false;
    document.getElementById('perfilErro').hidden = true;
}

document.addEventListener('DOMContentLoaded', async () => {
    const animalId = obterIdDaUrl();

    if (!animalId) {
        document.getElementById('perfilErro').hidden = false;
        return;
    }

    const animal = await buscarAnimalPorId(animalId);

    if (!animal || animal.status !== 'disponivel') {
        document.getElementById('perfilErro').hidden = false;
        return;
    }

    const instituicao = await carregarInstituicao(animal.instituicaoId);
    preencherPerfil(animal, instituicao);
});
