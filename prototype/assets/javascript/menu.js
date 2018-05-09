function openMenuButtonClicked() {

  var header = document.getElementById("header");
  header.style.display = "none";

  var menu = document.getElementById("menu");
  menu.style.display = "grid";
}

function closeMenuButtonClicked() {
  var menu = document.getElementById("menu");
  menu.style.display = "none";

  var header = document.getElementById("header");
  header.style.display = "grid";
}

function addHandlerToMenuButtons() {
var openMenuButton = document.getElementById("open-menu-button");
openMenuButton.onclick = openMenuButtonClicked;

var closeMenuButton = document.getElementById("close-menu-button");
closeMenuButton.onclick = closeMenuButtonClicked;
}

document.addEventListener("DOMContentLoaded", function() {
  addHandlerToMenuButtons();
});
