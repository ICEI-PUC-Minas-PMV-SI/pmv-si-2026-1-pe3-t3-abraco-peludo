function toggleDropdownMenu() {
  const dropdownButtonMenu = document.getElementById('dropdownButtonMenu');
  const dropdownMenuContent = document.getElementById('dropdownMenuContent');

  dropdownMenuContent.style.display = dropdownMenuContent.style.display === 'flex' ? 'none' : 'flex';
}

function toggleDropdownHistory() {
  const dropdownButton = document.getElementById('dropdownButton');
  const dropdownHistoryContent = document.getElementById('dropdownHistoryContent');

  dropdownHistoryContent.style.display = dropdownHistoryContent.style.display === 'flex' ? 'none' : 'flex';
}

window.onclick = function(event) {
   const dropDown = document.getElementsByClassName("dropdown-menu");
   if (!event.target.closest('.dropBtn') && !event.target.closest('.dropdown-menu')) {
     dropDown.style.display = "none";
   }
 }