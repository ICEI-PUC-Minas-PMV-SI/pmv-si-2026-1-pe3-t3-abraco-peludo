let todosAnimais = [];

function renderizarCardsAdotante(animais) {
    const grid = document.getElementById('animalGrid');
    const vazio = document.getElementById('animalEmpty');

    if (!animais.length) {
        grid.innerHTML = '';
        vazio.hidden = false;
        return;
    }

    vazio.hidden = true;
    grid.innerHTML = animais.map((animal) => `
        <a href="../animalProfile/animalProfile.html?id=${animal.id}" class="adotante-animal-card">
            <img src="${obterCaminhoFoto(animal.foto)}" alt="${animal.nome}" class="adotante-animal-card-photo">
            <div class="adotante-animal-card-label">
                <span>${animal.nome} - ${animal.idade}</span>
                <span>${animal.cidade}</span>
            </div>
        </a>
    `).join('');
}

function aplicarFiltrosAdotante() {
    const filtrados = filtrarAnimais(todosAnimais, {
        apenasDisponiveis: true,
        busca: document.getElementById('buscaAnimal').value,
        idade: document.getElementById('filtroIdade').value,
        raca: document.getElementById('filtroRaca').value,
        sexo: document.getElementById('filtroSexo').value,
        cidade: document.getElementById('filtroLocalizacao').value
    });

    renderizarCardsAdotante(filtrados);
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

function initSelectsFiltro() {
    document.querySelectorAll('.filtro-campo select').forEach((select) => {
        select.addEventListener('change', () => {
            select.classList.toggle('opcao-selecionada', Boolean(select.value));
            aplicarFiltrosAdotante();
        });
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    todosAnimais = await carregarAnimais();
    const disponiveis = todosAnimais.filter((a) => a.status === 'disponivel');

    preencherSelect('filtroIdade', [...new Set(disponiveis.map((a) => a.idade).filter(Boolean))]);
    preencherSelect('filtroRaca', [...new Set(disponiveis.map((a) => a.raca).filter(Boolean))]);
    preencherSelect('filtroLocalizacao', [...new Set(disponiveis.map((a) => a.cidade).filter(Boolean))]);

    initFiltrosDropdown();
    initSelectsFiltro();

    document.getElementById('buscaAnimal').addEventListener('input', aplicarFiltrosAdotante);
    document.getElementById('buscaAnimal').addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            aplicarFiltrosAdotante();
        }
    });
    aplicarFiltrosAdotante();
});
