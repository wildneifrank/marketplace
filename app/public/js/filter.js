// fetch('https://fakestoreapi.com/products?limit=10').then(res=>res.json()).then((json)=>{
//     // const ul = document.getElementById('listaProdutos');
//     json.forEach((item) => {
//         const card = document.createElement("div");
//         card.classList.add("card", "item.category", "hide");
//         const imgContainer = document.createElement("div");
//         imgContainer.classList.add("image-container");
//         const image = document.createElement("img");
//         image.setAttribute("src", item.image);
//         imgContainer.appendChild(image);
//         card.appendChild(imgContainer);
//         const container = document.createElement("div");
//         container.classList.add("container");
//         const name = document.createElement("h5");
//         name.classList.add("product-name");
//         name.innerText = item.title.toUpperCase();
//         container.appendChild(name);
//         const price = document.createElement("h6");
//         price.innerText = "$" + item.price;
//         container.appendChild(price);
//         card.appendChild(container);
//         document.getElementById("products").appendChild(card);
//     });
// })

let products = {
  data: [
    {
      productName: "Regular White T-Shirt",
      category: "esfira",
      price: "30",
      image: "images/ufc.png",
    },
    {
      productName: "Beige Short Skirt",
      category: "chinesa",
      price: "49",
      image: "images/ufc.png",
    },
    {
      productName: "Sporty SmartWatch",
      category: "ifood",
      price: "99",
      image: "images/ufc.png",
    },
    {
      productName: "Basic Knitted Top",
      category: "esfira",
      price: "29",
      image: "images/ufc.png",
    },
    {
      productName: "Black Leather Jacket",
      category: "italiana",
      price: "129",
      image: "images/ufc.png",
    },
    {
      productName: "Stylish Pink Trousers",
      category: "chinesa",
      price: "89",
      image: "images/ufc.png",
    },
    {
      productName: "Brown Men's Jacket",
      category: "italiana",
      price: "189",
      image: "images/ufc.png",
    },
    {
      productName: "Comfy Gray Pants",
      category: "chinesa",
      price: "49",
      image: "images/ufc.png",
    },
  ],
};

for (let i of products.data) {
  let card = document.createElement("div");
  card.classList.add("card", i.category, "hide");
  let imgContainer = document.createElement("div");
  imgContainer.classList.add("image-container");
  let image = document.createElement("img");
  image.setAttribute("src", i.image);
  imgContainer.appendChild(image);
  card.appendChild(imgContainer);
  let container = document.createElement("div");
  container.classList.add("container");
  let name = document.createElement("h5");
  name.classList.add("product-name");
  name.innerText = i.productName.toUpperCase();
  container.appendChild(name);
  let price = document.createElement("h6");
  price.innerText = "$" + i.price;
  container.appendChild(price);
  card.appendChild(container);
  document.getElementById("products").appendChild(card);
}

function filterProduct(value) {
  let buttons = document.querySelectorAll(".button-value");
  buttons.forEach((button) => {
    console.log(value.toUpperCase());
    console.log(button.innerText.toUpperCase());
    if (value.toUpperCase() == button.innerText.toUpperCase()) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
  let elements = document.querySelectorAll(".card");
  elements.forEach((element) => {
    if (value == "all") {
      element.classList.remove("hide");
    } else {
      if (element.classList.contains(value)) {
        element.classList.remove("hide");
      } else {
        element.classList.add("hide");
      }
    }
  });
}
document.getElementById("search").addEventListener("click", () => {
  let searchInput = document.getElementById("search-input").value;
  let elements = document.querySelectorAll(".product-name");
  let cards = document.querySelectorAll(".card");
  elements.forEach((element, index) => {
    if (element.innerText.includes(searchInput.toUpperCase())) {
      cards[index].classList.remove("hide");
    } else {
      cards[index].classList.add("hide");
    }
  });
});
window.onload = () => {
  filterProduct("all");
};