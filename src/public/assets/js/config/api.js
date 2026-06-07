
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

const API_BASE_URL = isLocalhost 
  ? 'http://localhost:3000' 
  : 'https://pmv-si-2026-1-pe3-t3-abraco-peludo-nine.vercel.app';

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

async function apiPostEndpoint(endpoint, dados) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    });

    const resultado = await response.json();

    if (!response.ok) {
        throw new Error(resultado.mensagem || 'Erro na requisição.');
    }

    return resultado;
}