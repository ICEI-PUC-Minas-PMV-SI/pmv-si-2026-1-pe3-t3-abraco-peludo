const API_URL = 'http://localhost:3000';
const ADOCAO_RASCUNHO_KEY = 'adocaoRascunho';

async function criarAdocao(payload) {
    const response = await fetch(`${API_URL}/adocoes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        if (response.status === 404) {
            alert('Endpoint não encontrado. Verifique se a API está rodando com "npm run api".');
            return false;
        }
        alert('Não foi possível registrar a adoção. Verifique se a API está rodando.');
        return false;
    }

    return true;
}

document.addEventListener('DOMContentLoaded', () => {
    // Garante que o rascunho existe
    const rascunho = JSON.parse(sessionStorage.getItem(ADOCAO_RASCUNHO_KEY) || 'null');
    if (!rascunho) {
        alert('Sessão de adoção expirada. Reinicie o processo.');
        window.location.href = '../animalListing/animalListing.html';
        return;
    }

    const btnContinuar = document.getElementById('btn-continuar');

    btnContinuar.addEventListener('click', async () => {
        const moradiaSelecionada = document.querySelector('input[name="moradia"]:checked');

        if (!moradiaSelecionada) {
            alert('Selecione o tipo de moradia antes de continuar.');
            return;
        }

        btnContinuar.disabled     = true;
        btnContinuar.textContent  = 'Enviando...';

        try {
            const hoje = new Date().toISOString().split('T')[0];

            const payload = {
                ...JSON.parse(sessionStorage.getItem(ADOCAO_RASCUNHO_KEY)),
                moradia:    moradiaSelecionada.id,
                statusPet:  'Aguardando aprovação',
                dataAdocao: hoje,
            };

            const sucesso = await criarAdocao(payload);

            if (sucesso) {
                // Limpa o rascunho após concluir
                sessionStorage.removeItem(ADOCAO_RASCUNHO_KEY);
                window.location.href = '../adoptionHistory/adoptionHistory.html';
            } else {
                btnContinuar.disabled    = false;
                btnContinuar.textContent = 'Continuar';
            }
        } catch (err) {
            console.error(err);
            alert('Não foi possível conectar à API. Execute "npm run api" no terminal.');
            btnContinuar.disabled    = false;
            btnContinuar.textContent = 'Continuar';
        }
    });
});