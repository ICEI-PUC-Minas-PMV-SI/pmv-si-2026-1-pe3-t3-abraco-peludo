let todosAnimais = [];
let animalParaExcluir = null;

function renderizarCards(animais) {
    const grid = document.getElementById('animalGrid');
    const vazio = document.getElementById('animalEmpty');

    if (!animais.length) {
        grid.innerHTML = '';
        vazio.hidden = false;
        return;
    }

    vazio.hidden = true;
    grid.innerHTML = animais.map((animal) => `
        <article class="ong-animal-card">
            <img src="${obterCaminhoFoto(animal.foto)}" alt="${animal.nome}" class="ong-animal-card-photo">
            <div class="ong-animal-card-footer">
                <span class="ong-animal-card-nome">${animal.nome}</span>
                <div class="ong-animal-card-acoes">
                    <a href="../updateAnimal/updateAnimal.html?id=${animal.id}" title="Editar ${animal.nome}">
                        <img src="../../../assets/img/icon-lapis-1.svg" alt="Editar">
                    </a>
                    <button type="button" data-id="${animal.id}" data-nome="${animal.nome}" title="Excluir ${animal.nome}">
                        <img src="../../../assets/img/icon-lixeira.svg" alt="Excluir">
                    </button>
                </div>
            </div>
        </article>
    `).join('');

    grid.querySelectorAll('button[data-id]').forEach((botao) => {
        botao.addEventListener('click', () => {
            animalParaExcluir = {
                id: Number(botao.dataset.id),
                nome: botao.dataset.nome
            };
            abrirModalExclusao();
        });
    });
}

function aplicarFiltros() {
    const sessao = obterUsuarioLogado();
    const instituicaoId = sessao?.usuario?.id || 1;

    const filtrados = filtrarAnimais(todosAnimais, {
        instituicaoId: Number(instituicaoId),
        busca: document.getElementById('buscaAnimal').value
    });

    renderizarCards(filtrados);
}

function abrirModalExclusao() {
    document.getElementById('modalDeletarAnimal').classList.add('ativo');
}

function fecharModalExclusao() {
    document.getElementById('modalDeletarAnimal').classList.remove('ativo');
    animalParaExcluir = null;
}

async function confirmarExclusao() {
    if (!animalParaExcluir) return;

    try {
        const response = await fetch(`${API_BASE_URL}/animais/${animalParaExcluir.id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            todosAnimais = todosAnimais.filter((a) => a.id !== animalParaExcluir.id);
        } else {
            todosAnimais = await carregarAnimais();
        }
    } catch {
        todosAnimais = todosAnimais.filter((a) => a.id !== animalParaExcluir.id);
    }

    fecharModalExclusao();
    aplicarFiltros();
}

document.addEventListener('DOMContentLoaded', async () => {
    todosAnimais = await carregarAnimais();

    document.getElementById('buscaAnimal').addEventListener('input', aplicarFiltros);
    document.getElementById('buscaAnimal').addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            aplicarFiltros();
        }
    });
    document.getElementById('btnSearch').addEventListener('click', aplicarFiltros);

    document.getElementById('btnCancelarExclusao').addEventListener('click', fecharModalExclusao);
    document.getElementById('btnConfirmarExclusao').addEventListener('click', confirmarExclusao);

    document.getElementById('modalDeletarAnimal').addEventListener('click', (event) => {
        if (event.target.id === 'modalDeletarAnimal') {
            fecharModalExclusao();
        }
    });

    aplicarFiltros();
});
