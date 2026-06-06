const ANIMAIS_FALLBACK = [
    {
        id: 1,
        instituicaoId: 1,
        nome: 'Miau',
        especie: 'Gato',
        raca: 'SRD',
        sexo: 'Fêmea',
        idade: '2 anos',
        porte: 'Pequeno',
        cidade: 'Belo Horizonte',
        estado: 'MG',
        saude: 'Saudável',
        castrado: true,
        vacinado: true,
        vermifugado: true,
        descricao: 'Gata dócil e carinhosa.',
        foto: 'img-gato-4.svg',
        status: 'disponivel'
    }
];

async function carregarAnimais() {
    try {
        const response = await fetch(`${API_BASE_URL}/animais`);
        if (!response.ok) return ANIMAIS_FALLBACK;
        return await response.json();
    } catch {
        return ANIMAIS_FALLBACK;
    }
}

async function buscarAnimalPorId(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/animais/${id}`);
        if (!response.ok) {
            const animais = await carregarAnimais();
            return animais.find((animal) => animal.id === Number(id)) || null;
        }
        return await response.json();
    } catch {
        const animais = await carregarAnimais();
        return animais.find((animal) => animal.id === Number(id)) || null;
    }
}

function normalizarTexto(valor) {
    return (valor || '').toString().toLowerCase().trim();
}

function filtrarAnimais(animais, filtros) {
    const busca = normalizarTexto(filtros.busca);

    return animais.filter((animal) => {
        if (filtros.instituicaoId && animal.instituicaoId !== filtros.instituicaoId) {
            return false;
        }

        if (filtros.apenasDisponiveis && animal.status !== 'disponivel') {
            return false;
        }

        if (filtros.especie && animal.especie !== filtros.especie) {
            return false;
        }

        if (filtros.porte && animal.porte !== filtros.porte) {
            return false;
        }

        if (filtros.sexo && animal.sexo !== filtros.sexo) {
            return false;
        }

        if (filtros.cidade && animal.cidade !== filtros.cidade) {
            return false;
        }

        if (filtros.idade && animal.idade !== filtros.idade) {
            return false;
        }

        if (filtros.raca && animal.raca !== filtros.raca) {
            return false;
        }

        if (busca) {
            const texto = [
                animal.nome,
                animal.especie,
                animal.raca,
                animal.cidade,
                animal.idade
            ].map(normalizarTexto).join(' ');

            if (!texto.includes(busca)) return false;
        }

        return true;
    });
}

function obterCaminhoFoto(foto) {
    if (!foto) return '../../../assets/img/icon-pata.svg';
    if (foto.startsWith('data:')) return foto;
    return `../../../assets/img/${foto}`;
}

function obterUsuarioLogado() {
    const dados = sessionStorage.getItem('usuarioLogado');
    return dados ? JSON.parse(dados) : null;
}
