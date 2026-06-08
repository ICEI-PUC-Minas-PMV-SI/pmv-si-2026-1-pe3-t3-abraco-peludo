const ADOCAO_RASCUNHO_KEY = 'adocaoRascunho';

document.addEventListener('DOMContentLoaded', () => {
    // Garante que o rascunho existe
    const rascunho = JSON.parse(sessionStorage.getItem(ADOCAO_RASCUNHO_KEY) || 'null');
    if (!rascunho) {
        alert('Sessão de adoção expirada. Reinicie o processo.');
        window.location.href = '../animalListing/animalListing.html';
        return;
    }

    const checkbox     = document.getElementById('aceite-termos');
    const btnContinuar = document.getElementById('btn-continuar');

    checkbox.addEventListener('change', function () {
        btnContinuar.disabled = !this.checked;
    });

    btnContinuar.addEventListener('click', function () {
        if (this.disabled) return;

        const rascunhoAtualizado = {
            ...JSON.parse(sessionStorage.getItem(ADOCAO_RASCUNHO_KEY)),
            aceitouTermos: true,
        };
        sessionStorage.setItem(ADOCAO_RASCUNHO_KEY, JSON.stringify(rascunhoAtualizado));

        window.location.href = '../adoptionForm03/adoptionForm03.html';
    });
});