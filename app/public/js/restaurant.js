const url = "http://localhost:3001/admin/";

function sendFeedback(event, id) {
  event.preventDefault();
  const name = document.querySelector(`#name_${id}`).value;
  const email = document.querySelector(`#email_${id}`).value;
  const tel = document.querySelector(`#tel_${id}`).value;
  const message = document.querySelector(`#message_${id}`).value;
  const json = {
    id: 0,
    name,
    email,
    tel,
    message,
    restaurant_id: parseInt(id),
  };
  fetch(url + `feedbacks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data.message);
    })
    .catch((error) => {
      console.error("Erro durante a requisição:", error);
    });
  document.querySelector(`#name_${id}`).value = "";
  document.querySelector(`#email_${id}`).value = "";
  document.querySelector(`#tel_${id}`).value = "";
  document.querySelector(`#message_${id}`).value = "";
}

// Produtos
const productsDiv = document.querySelector("#productsDiv");
let productsData = [];

// Produtos - Pagination
let productsPosition = 0;
const limit = 6;
function rightProducts() {
  if (!(productsPosition + 1 > productsData.length / limit)) {
    productsPosition++;
    paginationProducts();
  }
}
function leftProducts() {
  if (!(productsPosition == 0)) {
    productsPosition--;
    paginationProducts();
  }
}
function paginationProducts() {
  productsDiv.innerHTML = "";
  for (
    let index = productsPosition * limit;
    index < (productsPosition + 1) * limit;
    index++
  ) {
    if (!productsData[index]) {
      break;
    }
    let newDiv = document.createElement("div");
    newDiv.className =
      "sm:w-[30%] lg:w-3/12 lg:h-2/12 w-full h-auto flex gap-3 border-purple-800 border rounded-xl dark:border-slate-300 duration-500 ease-in-out";
    newDiv.innerHTML = `
    <img src="${productsData[index].image_link}" class="w-1/2 rounded-l-xl" alt="${productsData[index].name}">
  <div class="flex-1 flex flex-col gap-2 text-sm text-purple-800 font-semibold py-1 dark:text-white duration-500 ease-in-out">
    <span>
      ${productsData[index].name}
    </span>
    <Span>
      ${productsData[index].description}
    </Span>
    <span>
      $${productsData[index].price}
    </span>
  </div>`;
    productsDiv.appendChild(newDiv);
  }
  document.querySelector("#currentProductsPosition").innerHTML = `${
    productsPosition + 1
  }`;
}

// Pegar os dados dos Produtos
function getProducts(id) {
  fetch(url + `products/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      productsData = [];
      data.forEach((item) => {
        if (!item.deleted) {
          productsData.push(item);
        }
      });
      productsPosition = 0;
      paginationProducts();
    })
    .catch((error) => {
      console.error("Erro durante a requisição:", error);
    });
}
