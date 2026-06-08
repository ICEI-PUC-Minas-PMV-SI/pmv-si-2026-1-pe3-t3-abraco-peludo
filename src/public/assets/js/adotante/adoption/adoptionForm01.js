const API_URL = 'http://localhost:3000';
const USUARIO_LOGADO_KEY = 'usuarioLogado';
const ADOCAO_RASCUNHO_KEY = 'adocaoRascunho';

function obterIdAnimalDaUrl() {
    const params = new URLSearchParams(window.location.search);
    return Number(params.get('animalId'));
}

function obterAdotanteLogado() {
    const sessao = JSON.parse(sessionStorage.getItem(USUARIO_LOGADO_KEY) || '{}');
    return sessao.usuario || null;
}

async function buscarAnimal(idAnimal) {
    const response = await fetch(`${API_URL}/animais/${idAnimal}`);
    if (!response.ok) return null;
    return response.json();
}

async function buscarInstituicao(instituicaoId) {
    const response = await fetch(`${API_URL}/instituicoes/${instituicaoId}`);
    if (!response.ok) return null;
    return response.json();
}

document.addEventListener('DOMContentLoaded', async () => {
    const idAnimal = obterIdAnimalDaUrl();

    if (!idAnimal) {
        alert('Animal não identificado. Volte à listagem e tente novamente.');
        window.location.href = '../animalListing/animalListing.html';
        return;
    }

    const adotante = obterAdotanteLogado();
    if (!adotante) {
        alert('Sessão expirada. Faça login novamente.');
        window.location.href = '../../../index.html';
        return;
    }

    // Busca animal e instituição em paralelo
    const animal = await buscarAnimal(idAnimal);
    if (!animal) {
        alert('Animal não encontrado. Volte à listagem e tente novamente.');
        window.location.href = '../animalListing/animalListing.html';
        return;
    }

    const instituicao = await buscarInstituicao(animal.instituicaoId);
    if (!instituicao) {
        alert('Instituição não encontrada. Tente novamente.');
        window.location.href = '../animalListing/animalListing.html';
        return;
    }

    // Inicializa o rascunho da adoção no sessionStorage
    const rascunho = {
        animalId:      animal.id,
        nomePet:       animal.nome,
        instituicaoId: instituicao.id,
        nomeOng:       instituicao.nome,
        adotanteId:    adotante.id,
    };
    sessionStorage.setItem(ADOCAO_RASCUNHO_KEY, JSON.stringify(rascunho));

    // Botão continuar — salva estado e cidade e avança
    document.querySelector('.btn').addEventListener('click', () => {
        const estado = document.getElementById('estado').value;
        const cidade = document.getElementById('cidade').value;

        if (!estado || !cidade) {
            alert('Selecione o estado e a cidade antes de continuar.');
            return;
        }

        const rascunhoAtualizado = {
            ...JSON.parse(sessionStorage.getItem(ADOCAO_RASCUNHO_KEY)),
            estado,
            cidade,
        };
        sessionStorage.setItem(ADOCAO_RASCUNHO_KEY, JSON.stringify(rascunhoAtualizado));

        window.location.href = `../adoptionForm02/adoptionForm02.html`;
    });
});