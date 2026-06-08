const ADOCAO_RASCUNHO_KEY = 'adocaoRascunho';

document.addEventListener('DOMContentLoaded', () => {
    // Garante que o rascunho existe
    const rascunho = JSON.parse(sessionStorage.getItem(ADOCAO_RASCUNHO_KEY) || 'null');
    if (!rascunho) {
        alert('Sessão de adoção expirada. Reinicie o processo.');
        window.location.href = '../animalListing/animalListing.html';
        return;
    }

    document.getElementById('btn-continuar').addEventListener('click', () => {
        const temCriancas    = document.getElementById('criancas').value;
        const familiaCiente  = document.getElementById('familia').value;
        const petParaPesente = document.getElementById('presente').value;

        const rascunhoAtualizado = {
            ...JSON.parse(sessionStorage.getItem(ADOCAO_RASCUNHO_KEY)),
            temCriancas,
            familiaCiente,
            petParaPresente: petParaPesente,
        };
        sessionStorage.setItem(ADOCAO_RASCUNHO_KEY, JSON.stringify(rascunhoAtualizado));

        window.location.href = '../adoptionForm04/adoptionForm04.html';
    });
});