const API_URL = 'http://localhost:3000';

async function carregarEstatisticas() {
    try {
        const res = await fetch(`${API_URL}/animais`);
        const animais = await res.json();

        const totalCadastrados = animais.length;
        const totalAdotados = animais.filter(a => a.status === 'adotado').length;

        document.querySelector('.badge-num-cadastrados').textContent = totalCadastrados.toLocaleString('pt-BR');
        document.querySelector('.badge-num-adotados').textContent = totalAdotados.toLocaleString('pt-BR');
    } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);
        document.querySelector('.badge-num-cadastrados').textContent = '--';
        document.querySelector('.badge-num-adotados').textContent = '--';
    }
}

carregarEstatisticas();