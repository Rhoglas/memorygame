const input = document.querySelector(".login--input");
const btn = document.querySelector(".login--submit");
const form = document.querySelector(".login--form");

const checkValue = ({ target }) => {
  if (target.value.length > 2) {
    btn.disabled = false;
  } else {
    btn.disabled = true;
  }
};

const getValue = (e) => {
  e.preventDefault();
  localStorage.setItem("player", input.value);
  window.location.href = "pages/game.html";
};

input.addEventListener("input", checkValue);
form.addEventListener("submit", getValue);
