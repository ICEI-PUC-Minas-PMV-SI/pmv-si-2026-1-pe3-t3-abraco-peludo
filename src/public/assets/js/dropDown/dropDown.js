function toggleDropdown() {
  const dropdown = document.getElementById("userDropdown");
  dropdown.style.display = dropdown.style.display === "flex" ? "none" : "flex";
}

// Fecha o dropdown se clicar fora
// window.onclick = function(event) {
//   const dropDown = document.getElementById("userDropdown");
//   if (!event.target.closest('.user-icon') && !event.target.closest('#userDropdown')) {
//     dropDown.style.display = "none";
//   }
// }