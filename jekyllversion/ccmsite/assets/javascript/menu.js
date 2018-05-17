function openMenuButtonClicked() {

  var header = document.getElementById("header");
  //header.style.display = "none";


  var menu = document.getElementById("menu");

  menu.style.animationName = "navOpen";
  //menu.style.animationPlayState = "running";
}

function closeMenuButtonClicked() {
  var menu = document.getElementById("menu");
  menu.style.animationName = "navOpen";
  //menu.style.animationPlayState = "running";
  menu.style.animationDirection = "reverse";

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
