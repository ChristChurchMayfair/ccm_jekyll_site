function openMenuButtonClicked() {

  var header = document.getElementById("header");
  header.style.display = "none";


  var menu = document.getElementById("menu");
  menu.style.visibility = "visible";
  menu.style.opacity = 1;
}

function closeMenuButtonClicked() {
  var menu = document.getElementById("menu");

  /* we need to ensure the visibility is set to hidden *after* the transition ends! */
  menu.addEventListener("transitionend",function(event) {
    event.target.visiblility = "hidden";
    /* and remove the listener too! */
    event.target.removeEventListener("transitionend");
  });

  menu.style.opacity = 0;

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
