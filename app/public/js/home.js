// Pegar dados dos restaurants
const url = "http://localhost:3001/admin/";
const carouselRestaurant = document.querySelector("#restaurantsCarousel");
fetch(url + `restaurants/best`)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    data.forEach((restaurant) => {
      let newDiv = document.createElement("div");
      newDiv.className =
        "w-64 h-80 flex flex-col items-center rounded-xl shadow-lg relative teste dark:bg-slate-800 duration-500 ease-in-out";
      newDiv.innerHTML = `
<div class="w-full h-full">
<div class="bg-purple-800 h-1/3 w-full rounded-t-xl dark:text-white duration-500 ease-in-out"></div>
</div>
<div class="absolute text-center flex justify-center items-center flex-col pt-10">
<img src="${
        restaurant.image
      }" alt="" class="rounded-full border-2 border-purple-800 p-1 bg-white w-1/2 h-1/2" />
<div class="flex flex-col gap-2 justify-center items-center">
  <div class="text-lg font-medium dark:text-white duration-500 ease-in-out">${
    restaurant.name
  }</div>
  <div class="font-normal dark:text-white duration-500 ease-in-out">${restaurant.aboutUs.slice(
    0,
    20
  )}...</div>
  <a href="/restaurante/${
    restaurant.id
  }" class="bg-purple-800 w-3/4 hover:bg-purple-900 duration-500 ease-in-out px-5 py-2 rounded-lg text-white dark:bg-white dark:text-purple-800 dark:hover:text-white dark:hover:bg-purple-800 font-semibold">
    Sobre nós
  </a>
</div>
</div>`;
      carouselRestaurant.appendChild(newDiv);
    });
  })
  .then(() => {
    // Carrossel de restaurantes e produtos
    const cardWidth = document.querySelector(".teste").offsetWidth;

    const moveCarousel = (currentPosition, direction, carouselContainer) => {
      currentPosition += direction * cardWidth;
      if (currentPosition < 0) currentPosition = 0;

      const screenWidth = window.innerWidth;
      const maxPosition =
        150 +
        (carouselContainer.children.length -
          Math.floor(screenWidth / cardWidth)) *
          cardWidth;

      if (currentPosition > maxPosition) currentPosition = maxPosition;

      carouselContainer.style.transform = `translateX(-${currentPosition}px)`;
      return currentPosition;
    };

    const arrowsRestaurant = document.querySelectorAll(".restaurants");
    arrowsRestaurant.forEach((arrow) => {
      let currentPosition = 0;
      arrow.addEventListener("click", () => {
        if (arrow.id == "leftRestaurant") {
          currentPosition = moveCarousel(
            currentPosition,
            -1,
            carouselRestaurant
          );
        } else {
          currentPosition = moveCarousel(
            currentPosition,
            1,
            carouselRestaurant
          );
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
  })
  .catch((error) => {
    console.error("Erro durante a requisição:", error);
  });
