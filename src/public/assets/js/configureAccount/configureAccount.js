const USUARIO_LOGADO_KEY = 'usuarioLogado';
const API_URL = 'http://localhost:3000';

// =====================
// Sessão
// =====================
function getSessao() {
    const sessao = sessionStorage.getItem(USUARIO_LOGADO_KEY);
    if (!sessao) {
        window.location.href = '../../../index.html';
        return null;
    }
    return JSON.parse(sessao);
}

// =====================
// Preencher formulário
// =====================
function preencherFormulario(usuario) {
    setValue('CNPJ',             usuario.cnpj);
    setValue('cargoResponsavel', usuario.cargoResponsavel);
    setValue('responsavelLegal', usuario.responsavelLegal);
    setValue('dataFundacao',     usuario.dataFundacao);   // "YYYY-MM-DD"
    setValue('tipoInstituicao',  usuario.tipoInstituicao);
    setValue('endereco',         usuario.endereco);
    setValue('bairro',           usuario.bairro);
    setValue('numero',           usuario.numero);
    setValue('cidade',           usuario.cidade);
    setValue('complemento',      usuario.complemento);
    setValue('email',            usuario.email);
    setValue('senha',            usuario.senha);
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

// =====================
// Salvar alterações (PUT /instituicoes/:id)
// =====================
async function salvarAlteracoes(sessao) {
    const novaSenha      = getValue('senha');
    const confirmarSenha = getValue('confirmarSenha');

    if (novaSenha && novaSenha !== confirmarSenha) {
        alert('As senhas não coincidem!');
        return;
    }

    // Monta payload com os campos editáveis
    const payload = {
        ...sessao.usuario,                       // mantém todos os campos existentes
        cnpj:             getValue('CNPJ')             || sessao.usuario.cnpj,
        cargoResponsavel: getValue('cargoResponsavel') || sessao.usuario.cargoResponsavel,
        responsavelLegal: getValue('responsavelLegal') || sessao.usuario.responsavelLegal,
        dataFundacao:     getValue('dataFundacao')     || sessao.usuario.dataFundacao,
        endereco:         getValue('endereco')         || sessao.usuario.endereco,
        bairro:           getValue('bairro')           || sessao.usuario.bairro,
        numero:           getValue('numero')           || sessao.usuario.numero,
        cidade:           getValue('cidade')           || sessao.usuario.cidade,
        complemento:      getValue('complemento')      || sessao.usuario.complemento,
    };

    if (novaSenha) payload.senha = novaSenha;

    try {
        const response = await fetch(`${API_URL}/instituicoes/${sessao.usuario.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error(`Erro HTTP ${response.status}`);

        const usuarioAtualizado = await response.json();

        // Atualiza a sessão com os dados novos (sem senha)
        const { senha, ...usuarioSemSenha } = usuarioAtualizado;
        sessionStorage.setItem(USUARIO_LOGADO_KEY, JSON.stringify({
            tipo: sessao.tipo,
            usuario: usuarioSemSenha
        }));

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

    console.log('Instituição logada:', sessao.usuario);
    console.log('ID:', sessao.usuario.id);

    preencherFormulario(sessao.usuario);

    // Botão Salvar
    document.querySelector('.btnSalvar').addEventListener('click', () => {
        salvarAlteracoes(sessao);
    });

    // Botão Cancelar — restaura os valores originais da sessão
    document.querySelector('.btnCancelar').addEventListener('click', () => {
        preencherFormulario(sessao.usuario);
        // limpa campos de senha
        setValue('senha', '');
        setValue('confirmarSenha', '');
    });
});