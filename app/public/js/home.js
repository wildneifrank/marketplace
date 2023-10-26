// Carrossel de restaurantes e produtos
const cardWidth = document.querySelector(".teste").offsetWidth;

const moveCarousel = (currentPosition, direction, carouselContainer) => {
  currentPosition += direction * cardWidth;
  if (currentPosition < 0) currentPosition = 0;

  const screenWidth = window.innerWidth;
  const maxPosition =
    150 +
    (carouselContainer.children.length - Math.floor(screenWidth / cardWidth)) *
      cardWidth;

  if (currentPosition > maxPosition) currentPosition = maxPosition;

  carouselContainer.style.transform = `translateX(-${currentPosition}px)`;
  return currentPosition;
};

const arrowsRestaurant = document.querySelectorAll(".restaurants");
const carouselRestaurant = document.querySelector("#restaurantsCarousel");
arrowsRestaurant.forEach((arrow) => {
  let currentPosition = 0;
  arrow.addEventListener("click", () => {
    if (arrow.id == "leftRestaurant") {
      currentPosition = moveCarousel(currentPosition, -1, carouselRestaurant);
    } else {
      currentPosition = moveCarousel(currentPosition, 1, carouselRestaurant);
    }
  });
});

const arrowsProduct = document.querySelectorAll(".products");
const carouselProduct = document.querySelector("#productsCarousel");
arrowsProduct.forEach((arrow) => {
  let currentPosition = 0;
  arrow.addEventListener("click", () => {
    if (arrow.id == "leftProduct") {
      currentPosition = moveCarousel(currentPosition, -1, carouselProduct);
    } else {
      currentPosition = moveCarousel(currentPosition, 1, carouselProduct);
    }
  });
});

// Light e dark mode
const toggle = document.querySelectorAll(".toggle");
const state = document.querySelector("#mode");

if (localStorage.mode == "dark") {
  toggle.forEach((item) => {
    item.classList.toggle("hidden");
  });
  state.classList.add("dark");
}

toggle.forEach((mode) => {
  mode.addEventListener("click", () => {
    toggle.forEach((item) => {
      item.classList.toggle("hidden");
    });
    state.classList.toggle("dark");

    if (state.classList.contains("dark")) {
      localStorage.mode = "dark";
    } else localStorage.mode = "light";
  });
});

// Aumentar e Diminuir Fonte
document.querySelector("#increase-font").addEventListener("click", function () {
  changeFontSize(2);
});

document.querySelector("#decrease-font").addEventListener("click", function () {
  changeFontSize(-2);
});

function changeFontSize(change) {
  const root = document.documentElement;
  const currentFontSize = parseInt(
    window.getComputedStyle(root).getPropertyValue("font-size")
  );

  const newFontSize = currentFontSize + change;

  if (newFontSize <= 22 && newFontSize >= 10) {
    root.style.fontSize = `${newFontSize}px`;
  }
}
