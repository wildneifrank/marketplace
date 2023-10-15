fetch('https://fakestoreapi.com/products?limit=10').then(res=>res.json()).then((json)=>{
    // const ul = document.getElementById('listaProdutos');
    json.forEach((item) => {
        const card = document.createElement("div");
        //Card should have category and should stay hidden initially
        card.classList.add("card", "item.category", "hide");
        //image div
        const imgContainer = document.createElement("div");
        imgContainer.classList.add("image-container");
        //img tag
        const image = document.createElement("img");
        image.setAttribute("src", item.image);
        imgContainer.appendChild(image);
        card.appendChild(imgContainer);
        //container
        const container = document.createElement("div");
        container.classList.add("container");
        //product name
        const name = document.createElement("h5");
        name.classList.add("product-name");
        name.innerText = item.title.toUpperCase();
        container.appendChild(name);
        //price
        const price = document.createElement("h6");
        price.innerText = "$" + item.price;
        container.appendChild(price);
        card.appendChild(container);
        document.getElementById("products").appendChild(card);
    });
})


function filterProduct(value) {
    let buttons = document.querySelectorAll(".button-value");
    buttons.forEach((button) => {

      if (value.toUpperCase() == button.innerText.toUpperCase()) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });
    let elements = document.querySelectorAll(".card");
    elements.forEach((element) => {ck
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


//   for (let i of products.data) {
//     //Create Card
//     let card = document.createElement("div");
//     //Card should have category and should stay hidden initially
//     card.classList.add("card", i.category, "hide");
//     //image div
//     let imgContainer = document.createElement("div");
//     imgContainer.classList.add("image-container");
//     //img tag
//     let image = document.createElement("img");
//     image.setAttribute("src", i.image);
//     imgContainer.appendChild(image);
//     card.appendChild(imgContainer);
//     //container
//     let container = document.createElement("div");
//     container.classList.add("container");
//     //product name
//     let name = document.createElement("h5");
//     name.classList.add("product-name");
//     name.innerText = i.productName.toUpperCase();
//     container.appendChild(name);
//     //price
//     let price = document.createElement("h6");
//     price.innerText = "$" + i.price;
//     container.appendChild(price);
//     card.appendChild(container);
//     document.getElementById("products").appendChild(card);
//   }