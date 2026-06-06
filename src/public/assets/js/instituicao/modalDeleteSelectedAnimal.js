const modalAnimal = document.getElementById('modalDeletarAnimalContainer');
const btnCancelarAnimal = document.getElementById('btnCancelarAnimal');
const btnDeletarAnimal = document.getElementById('btnDeletarAnimal');

function abrirModalDeletarAnimal() {
  modalAnimal.classList.add('ativo');
}

function fecharModalDeletarAnimal() {
  modalAnimal.classList.remove('ativo');
}

function confirmarExclusaoAnimal() {
  alert('Animal deletado com sucesso!');
  fecharModalDeletarAnimal();
}

btnCancelarAnimal.addEventListener('click', fecharModalDeletarAnimal);
btnDeletarAnimal.addEventListener('click', confirmarExclusaoAnimal);

window.addEventListener('click', (e) => {
  if (e.target === modalAnimal) {
    fecharModalDeletarAnimal();
  }
});