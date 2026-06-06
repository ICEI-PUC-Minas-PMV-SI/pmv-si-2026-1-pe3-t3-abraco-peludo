const API_BASE_URL = 'http://localhost:3000';

async function apiGet(recurso, params = {}) {
    const query = new URLSearchParams(params).toString();
    const url = query ? `${API_BASE_URL}/${recurso}?${query}` : `${API_BASE_URL}/${recurso}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Erro ao buscar ${recurso}`);
    }

    return response.json();
}

async function apiPost(recurso, dados) {
    const response = await fetch(`${API_BASE_URL}/${recurso}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    });

    if (!response.ok) {
        throw new Error(`Erro ao criar ${recurso}`);
    }

    return response.json();
}
