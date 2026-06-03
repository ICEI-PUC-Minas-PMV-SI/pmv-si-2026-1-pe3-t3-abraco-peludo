function toggleDropdownHistory() {
  const dropDownHistory = document.getElementById("historyDropdown");
  dropDownHistory.style.display = dropDownHistory.style.display === "flex" ? "none" : "flex";
}

// Fecha o dropdown se clicar fora
// window.onclick = function(event) {
//   const dropDownHistory = document.getElementById("historyDropdown");
//   if (!event.target.closest('.history-icon') && !event.target.closest('#historyDropdown')) {
//     dropDownHistory.style.display = "none";
//   }
// }