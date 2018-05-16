function openMenuButtonClicked() {

  var header = document.getElementById("header");
  header.style.display = "none";


  var menu = document.getElementById("menu");
  //menu.style.display = "grid";
  menu.style.height = "90vh";
  menu.style.paddingTop = "15px";
  menu.style.paddingBottom = "15px";
}

function closeMenuButtonClicked() {
  var menu = document.getElementById("menu");
  //menu.style.display = "none";
  menu.style.height = "0px";
  menu.style.paddingTop = "0px";
  menu.style.paddingBottom = "0px";

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
