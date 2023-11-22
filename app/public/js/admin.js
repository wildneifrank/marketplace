const options = document.querySelectorAll(".sidebar");
const scenes = document.querySelectorAll(".scene");

const setState = (id) => {
  options.forEach((item) => {
    item.classList.remove("bg-purple-500");

    if (item.id == id) {
      item.classList.add("bg-purple-500");
      setScene(id);
    }
  });
};

const setScene = (id) => {
  scenes.forEach((item) => {
    item.classList.remove("flex");
    item.classList.add("hidden");
    if (item.id == id) {
      item.classList.add("flex");
      item.classList.remove("hidden");
    }
  });
};

const url = "http://localhost:3001/admin/products";

const productsDiv = document.querySelector("#productsDiv");
fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    data.forEach((item) => {
      let newDiv = document.createElement("div");
      newDiv.innerHTML = `<div class="w-full h-auto text-md flex gap-5 py-2 px-3 border-t border-purple-800">
      <div class="w-1/6">${item.id}</div>
      <div class="w-3/6">${item.name}</div>
      <div class="w-2/6">$${item.price}</div>
      <div class="w-1/12"><i class="fa-solid fa-pen-to-square cursor-pointer text-purple-800 hover:text-purple-950 duration-500 ease-in-out dark:text-white dark:hover:text-slate-300"></i></div>
      <div class="w-1/12"><i class="fa-solid fa-trash cursor-pointer text-purple-800 hover:text-purple-950 duration-500 ease-in-out dark:text-white dark:hover:text-slate-300"></i></div>
    </div>`;
      productsDiv.appendChild(newDiv);
    });
  })
  .catch((error) => {
    console.error("Erro durante a requisição:", error);
  });
