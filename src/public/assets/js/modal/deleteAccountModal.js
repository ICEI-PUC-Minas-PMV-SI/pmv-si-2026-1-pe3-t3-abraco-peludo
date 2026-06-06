function criarModalDeleteAccount() {
    if (document.getElementById('modalDeleteAccount')) return;

    const overlay = document.createElement('div');
    overlay.id = 'modalDeleteAccount';
    overlay.className = 'modal-delete-overlay';
    overlay.hidden = true;

    overlay.innerHTML = `
        <div class="modal-delete-box" role="dialog" aria-labelledby="modalDeleteTitulo" aria-modal="true">
            <h2 id="modalDeleteTitulo">
                <i class="fa-solid fa-triangle-exclamation"></i> Excluir conta
            </h2>
            <p>Essa ação é irreversível. Digite sua senha para confirmar a exclusão.</p>
            <input type="password" id="senhaDelete" placeholder="Sua senha">
            <span id="deleteAccountErro" class="modal-delete-erro"></span>
            <div class="modal-delete-botoes">
                <button type="button" id="btnConfirmarDelete" class="btn-modal-delete">Excluir conta</button>
                <button type="button" id="btnCancelarDelete" class="btn-modal-cancelar">Cancelar</button>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);
}

function abrirModalDeleteAccount() {
    const modal = document.getElementById('modalDeleteAccount');
    modal.hidden = false;
    document.body.style.overflow = 'hidden';

    // Limpa estado anterior
    document.getElementById('senhaDelete').value = '';
    document.getElementById('deleteAccountErro').textContent = '';
    document.getElementById('senhaDelete').focus();
}

function fecharModalDeleteAccount() {
    const modal = document.getElementById('modalDeleteAccount');
    modal.hidden = true;
    document.body.style.overflow = '';
}

async function confirmarExclusao() {
    const sessao = JSON.parse(sessionStorage.getItem(USUARIO_LOGADO_KEY));
    if (!sessao) return;

    const senhaDigitada = document.getElementById('senhaDelete').value.trim();
    const erroEl        = document.getElementById('deleteAccountErro');

    if (!senhaDigitada) {
        erroEl.textContent = 'Digite sua senha para confirmar.';
        return;
    }

    try {
        // Busca o registro completo (com senha) para validar
        const resGet = await fetch(`${API_URL}/instituicoes/${sessao.usuario.id}`);
        if (!resGet.ok) throw new Error('Erro ao buscar dados');
        const registro = await resGet.json();

        if (senhaDigitada !== registro.senha) {
            erroEl.textContent = 'Senha incorreta. Tente novamente.';
            document.getElementById('senhaDelete').value = '';
            document.getElementById('senhaDelete').focus();
            return;
        }

        const resDel = await fetch(`${API_URL}/instituicoes/${sessao.usuario.id}`, {
            method: 'DELETE'
        });

        if (!resDel.ok) throw new Error(`Erro HTTP ${resDel.status}`);

        sessionStorage.removeItem(USUARIO_LOGADO_KEY);
        window.location.href = HOME_URL;

    } catch (error) {
        console.error('Erro ao excluir conta:', error);
        document.getElementById('deleteAccountErro').textContent = 'Ocorreu um erro. Tente novamente.';
    }
}

function initDeleteAccountModal() {
    criarModalDeleteAccount();

    const modal = document.getElementById('modalDeleteAccount');

    // Abre ao clicar no botão "Excluir conta" do aside
    document.querySelectorAll('[data-excluir-conta]').forEach((trigger) => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            abrirModalDeleteAccount();
        });
    });

    document.getElementById('btnCancelarDelete').addEventListener('click', fecharModalDeleteAccount);
    document.getElementById('btnConfirmarDelete').addEventListener('click', confirmarExclusao);

    // Fecha ao clicar fora
    modal.addEventListener('click', (e) => {
        if (e.target === modal) fecharModalDeleteAccount();
    });

    // Fecha com Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.hidden) fecharModalDeleteAccount();
    });

    // Confirma com Enter no input
    document.getElementById('senhaDelete').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') confirmarExclusao();
    });
}

document.addEventListener('DOMContentLoaded', initDeleteAccountModal);