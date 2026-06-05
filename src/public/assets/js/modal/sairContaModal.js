const SESSAO_KEYS = [
    'cadastroInstituicao',
    'cadastroAdotante',
    'usuarioLogado'
];

function criarModalSairConta() {
    if (document.getElementById('modalSairConta')) return;

    const overlay = document.createElement('div');
    overlay.id = 'modalSairConta';
    overlay.className = 'modal-sair-overlay';
    overlay.hidden = true;

    overlay.innerHTML = `
        <div class="modal-sair-box" role="dialog" aria-labelledby="modalSairTitulo" aria-modal="true">
            <h2 id="modalSairTitulo">Sair da conta</h2>
            <p>Deseja realmente sair? Você será redirecionado para a página inicial.</p>
            <div class="modal-sair-botoes">
                <button type="button" id="btnConfirmarSair" class="btn-modal-sair">Sair</button>
                <button type="button" id="btnCancelarSair" class="btn-modal-cancelar">Cancelar</button>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);
}

function abrirModalSairConta() {
    const modal = document.getElementById('modalSairConta');
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
}

function fecharModalSairConta() {
    const modal = document.getElementById('modalSairConta');
    modal.hidden = true;
    document.body.style.overflow = '';
}

function limparSessao() {
    SESSAO_KEYS.forEach((chave) => sessionStorage.removeItem(chave));
}

function confirmarSaida(homeUrl) {
    limparSessao();
    window.location.href = homeUrl;
}

function initSairContaModal() {
    const script = document.currentScript;
    const homeUrl = script?.dataset?.homeUrl || '/src/public/index.html';

    criarModalSairConta();

    const modal = document.getElementById('modalSairConta');
    const btnConfirmar = document.getElementById('btnConfirmarSair');
    const btnCancelar = document.getElementById('btnCancelarSair');

    document.querySelectorAll('#btnLogout, [data-sair-conta]').forEach((trigger) => {
        trigger.addEventListener('click', (event) => {
            event.preventDefault();
            abrirModalSairConta();
        });
    });

    btnCancelar.addEventListener('click', fecharModalSairConta);

    btnConfirmar.addEventListener('click', () => {
        confirmarSaida(homeUrl);
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            fecharModalSairConta();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !modal.hidden) {
            fecharModalSairConta();
        }
    });
}

document.addEventListener('DOMContentLoaded', initSairContaModal);
