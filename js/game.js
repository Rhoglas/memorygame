let frist_card;
let second_card;

// botão de reload game
const btn = document.querySelector(".reload--game");

// captura o span onde será adicionado o nome do jogador
const playerName = document.querySelector(".player--name");

// captura o tabuleiro do jogo
const board = document.querySelector(".board--game");

// arr de imgs usadas nos cards
const characters = [
  { img: "../assets/img/1.jpg", id: "01" },
  { img: "../assets/img/2.jpg", id: "02" },
  { img: "../assets/img/3.jpg", id: "03" },
  { img: "../assets/img/4.jpg", id: "04" },
  { img: "../assets/img/5.jpg", id: "05" },
  { img: "../assets/img/6.jpg", id: "06" },
  { img: "../assets/img/7.jpg", id: "07" },
  { img: "../assets/img/8.jpg", id: "08" },
  { img: "../assets/img/9.jpg", id: "09" },
  { img: "../assets/img/10.jpg", id: "10" },
];

// captura o arr e duplica as imagens
const cards = characters.concat(characters);

// criar elemento
const createElement = (nameTag, nameClass) => {
  const cardElemeent = document.createElement(nameTag);
  cardElemeent.className = nameClass;

  return cardElemeent;
};

const checkEndGame = () => {
  let cardsDisable = document.querySelectorAll(".disable-card");
  if (cardsDisable.length === cards.length) {
    setTimeout(() => {
      window.location.href = "../pages/endGame.html";
    }, 300);
  }
};

const checkLetter = () => {
  const card1 = frist_card;
  const card2 = second_card;

  if (card1.id === card2.id) {
    card1.firstChild.classList.add("disable-card");
    card2.firstChild.classList.add("disable-card");

    frist_card = undefined;
    second_card = undefined;

    checkEndGame();
  } else {
    setTimeout(() => {
      frist_card.classList.remove("reveal--letter");
      second_card.classList.remove("reveal--letter");

      frist_card = undefined;
      second_card = undefined;
    }, 500);
  }
};

// vira a carta ao ser clicada
const turnCard = ({ target }) => {
  if (target.offsetParent.className.includes("reveal--letter")) {
    return;
  }

  if (frist_card === undefined) {
    target.offsetParent.classList.add("reveal--letter");

    frist_card = target.offsetParent;
  } else if (second_card === undefined) {
    target.offsetParent.classList.add("reveal--letter");

    second_card = target.offsetParent;
    checkLetter();
  }
};

// criar cartas dinamicamente
const createCard = (character) => {
  const card = createElement("div", "card");
  const faceCard = createElement("div", "face front");
  const backCard = createElement("div", "face back");

  // adiciona o background na face das cartas de acordo com o arr de imagens
  faceCard.style.backgroundImage = `url(${character.img})`;

  card.appendChild(faceCard);
  card.appendChild(backCard);

  card.id = character.id;
  card.addEventListener("click", turnCard);
  return card;
};

btn.addEventListener("click", () => {
  location.reload();
});

// carregar o jogo
const loadGame = () => {
  // com o arr duplicado, as cartas são embaralhadas
  cards.sort(() => Math.random() - 0.5);

  cards.map((character) => {
    const card = createCard(character);
    board.appendChild(card);
    // console.log(character);
  });
};

onload = () => {
  // insere o nome recuperado do localstorage
  playerName.innerHTML = localStorage.getItem("player");
  // carreg o jogo
  loadGame();
};
