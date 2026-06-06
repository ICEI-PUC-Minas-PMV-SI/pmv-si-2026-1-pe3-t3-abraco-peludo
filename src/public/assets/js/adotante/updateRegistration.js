const USUARIO_LOGADO_KEY = 'usuarioLogado';
const API_URL = 'http://localhost:3000';


function getSessao() {
    const sessao = sessionStorage.getItem(USUARIO_LOGADO_KEY);
    if (!sessao) {
        window.location.href = '../../../index.html';
        return null;
    }
    return JSON.parse(sessao);
}


function preencherFormulario(usuario) {
    setValue('nome',       usuario.nomeCompleto);
    setValue('cpf',        usuario.cpf);
    setValue('nascimento', usuario.dataNascimento); 
    setValue('email',      usuario.email);
  
}

function setValue(id, valor) {
    const el = document.getElementById(id);
    if (el && valor !== undefined && valor !== null) {
        el.value = valor;
    }
}

function getValue(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
}


async function salvarAlteracoes(sessao) {
    const novaSenha      = getValue('senha');
    const confirmarSenha = getValue('confirmarSenha');

    if (novaSenha && novaSenha !== confirmarSenha) {
        alert('As senhas não coincidem!');
        return;
    }

    try {
        
        const resGet = await fetch(`${API_URL}/adotantes/${sessao.usuario.id}`);
        if (!resGet.ok) throw new Error('Erro ao buscar dados');
        const registroCompleto = await resGet.json();

        const payload = {
            ...registroCompleto,
            nomeCompleto:    getValue('nome')       || registroCompleto.nomeCompleto,
            cpf:             getValue('cpf')        || registroCompleto.cpf,
            dataNascimento:  getValue('nascimento') || registroCompleto.dataNascimento,
            email:           getValue('email')      || registroCompleto.email,
        };

        if (novaSenha) payload.senha = novaSenha;

        const resPut = await fetch(`${API_URL}/adotantes/${sessao.usuario.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!resPut.ok) throw new Error(`Erro HTTP ${resPut.status}`);

        const usuarioAtualizado = await resPut.json();

        
        const { senha, ...usuarioSemSenha } = usuarioAtualizado;
        sessionStorage.setItem(USUARIO_LOGADO_KEY, JSON.stringify({
            tipo: sessao.tipo,
            usuario: usuarioSemSenha
        }));

        alert('Dados atualizados com sucesso!');

    } catch (error) {
        console.error('Erro ao salvar:', error);
        alert('Ocorreu um erro ao salvar. Tente novamente.');
    }
}

// =====================
// Inicialização
// =====================
document.addEventListener('DOMContentLoaded', () => {
    const sessao = getSessao();
    if (!sessao) return;

    console.log('Adotante logado:', sessao.usuario);

    preencherFormulario(sessao.usuario);

    // Botão Atualizar
    document.querySelector('.btnSalvar').addEventListener('click', () => {
        salvarAlteracoes(sessao);
    });

    // Botão Cancelar — restaura valores originais
    document.querySelector('.btnCancelar').addEventListener('click', () => {
        preencherFormulario(sessao.usuario);
        setValue('senha', '');
        setValue('confirmarSenha', '');
    });
});