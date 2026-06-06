const modal = document.getElementById('modalDeletarContainer');
const btnCancelar = document.getElementById('btnModalCancelar');
const btnDeletar = document.getElementById('btnModalDeletar');

function abrirModalDeletar() {
  modal.classList.add('ativo');
}

function fecharModalDeletar() {
  modal.classList.remove('ativo');
}

function confirmarExclusao() {
  alert('Cadastro deletado com sucesso!');
  fecharModalDeletar();
}

btnCancelar.addEventListener('click', fecharModalDeletar);
btnDeletar.addEventListener('click', confirmarExclusao);

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    fecharModalDeletar();
  }
});