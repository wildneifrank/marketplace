const options = document.querySelectorAll(".sidebar");
const scenes = document.querySelectorAll(".scene");

const setState = (id) => {
  options.forEach((item) => {
    item.classList.remove("bg-purple-500");

    if (item.classList.contains(id)) {
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

const url = "http://localhost:3001/admin/";

// Feedbacks
const feedbacksDiv = document.querySelector("#feedbacksDiv");
let feedbacksData = [];
fetch(url + "feedbacks")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    feedbacksData = data;
    data.forEach((item) => {
      let newDiv = document.createElement("div");
      newDiv.innerHTML = `<div class="w-full h-auto text-md flex gap-5 py-2 px-3 border-t border-purple-800">
      <div class="w-1/6">${item.id}</div>
      <div class="w-3/6">${item.name}</div>
      <div class="w-2/6">${item.email}</div>
      <div class="w-1/12"><i class="fa-solid fa-eye cursor-pointer text-purple-800 hover:text-purple-950 duration-500 ease-in-out dark:text-white dark:hover:text-slate-300" onclick="showFeedback(${item.id})"></i></div>
      <div class="w-1/12"><i class="fa-solid fa-trash cursor-pointer text-purple-800 hover:text-purple-950 duration-500 ease-in-out dark:text-white dark:hover:text-slate-300"></i></div>
    </div>`;
      feedbacksDiv.appendChild(newDiv);
    });
  })
  .catch((error) => {
    console.error("Erro durante a requisição:", error);
  });

const feedbacksScene = document.querySelector("#feedbacks");
function showFeedback(id) {
  const item = feedbacksData.find((item) => item.id == id);
  let newDiv = document.createElement("form");
  newDiv.action = "";
  newDiv.className =
    "absolute top-[10%] left-1/3 w-4/12 h-auto bg-white rounded-lg shadow-xl dark:bg-slate-900 duration-500 ease-in-out flex flex-col gap-2 px-5 py-2 text-lg font-semibold";
  newDiv.innerHTML = `
  <div class="flex flex-col gap-1">
    <label for="name" class="text-purple-800 dark:text-white duration-500 ease-in-out">Nome</label>
    <input type="text" name="name" id="name" value="${item.name}" class="px-3 py-2 border-purple-800 bg-white dark:bg-slate-900 border dark:border-white dark:text-white duration-500 ease-in-out rounded-lg outline-none focus:border-purple-800 text-purple-800" disabled>
  </div>
  <div class="flex flex-col gap-1">
    <label for="email" class="text-purple-800 dark:text-white duration-500 ease-in-out">Email</label>
    <input type="email" name="email" id="email" value="${item.email}" class="px-3 py-2 border-purple-800 bg-white dark:bg-slate-900 border dark:border-white dark:text-white duration-500 ease-in-out rounded-lg outline-none focus:border-purple-800 text-purple-800" disabled>
  </div>
  <div class="flex flex-col gap-1">
    <label for="tel" class="text-purple-800 dark:text-white duration-500 ease-in-out">Telefone</label>
    <input type="tel" name="tel" id="tel" value="${item.tel}" class="px-3 py-2 border-purple-800 bg-white dark:bg-slate-900 border dark:border-white dark:text-white duration-500 ease-in-out rounded-lg outline-none focus:border-purple-800 text-purple-800" disabled>
  </div>
  <div class="flex flex-col gap-1">
    <label for="message" class="text-purple-800 dark:text-white duration-500 ease-in-out">Mensagem</label>
    <input type="text" name="message" id="message" value="${item.message}" class="px-3 py-2 border-purple-800 bg-white dark:bg-slate-900 border dark:border-white dark:text-white duration-500 ease-in-out rounded-lg outline-none focus:border-purple-800 text-purple-800" disabled>
  </div>
  <div class="flex flex-col gap-1">
    <label for="id" class="text-purple-800 dark:text-white duration-500 ease-in-out">Id do Restaurante</label>
    <input type="string" name="id" id="id" value="${item.restaurant_id}" class="px-3 py-2 border-purple-800 bg-white dark:bg-slate-900 border dark:border-white dark:text-white duration-500 ease-in-out rounded-lg outline-none focus:border-purple-800 text-purple-800" disabled>
  </div>
  <div class="w-full h-auto px-4 py-2 text-center border border-purple-800 text-purple-800 text-lg font-semibold hover:text-white hover:bg-purple-800 duration-500 ease-in-out cursor-pointer rounded-lg  dark:border-white dark:text-white dark:hover:bg-slate-800 mt-2" onclick="closeFeedback()" >Voltar</div>   `;
  feedbacksScene.appendChild(newDiv);
}
function closeFeedback() {
  feedbacksScene.removeChild(feedbacksScene.lastChild);
}

// Usuários
const usersDiv = document.querySelector("#usersDiv");
let usersData = [];
fetch(url + "restaurants")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    usersData = data;
    data.forEach((item) => {
      let newDiv = document.createElement("div");
      newDiv.innerHTML = `<div class="w-full h-auto text-md flex gap-5 py-2 px-3 border-t border-purple-800">
      <div class="w-1/6">${item.id}</div>
      <div class="w-3/6">${item.name}</div>
      <div class="w-2/6">${item.email}</div>
      <div class="w-1/12"><i class="fa-solid fa-pen-to-square cursor-pointer text-purple-800 hover:text-purple-950 duration-500 ease-in-out dark:text-white dark:hover:text-slate-300" onclick="showUser(${item.id})"></i></div>
      <div class="w-1/12"><i class="fa-solid fa-trash cursor-pointer text-purple-800 hover:text-purple-950 duration-500 ease-in-out dark:text-white dark:hover:text-slate-300"></i></div>
    </div>`;
      usersDiv.appendChild(newDiv);
    });
  })
  .catch((error) => {
    console.error("Erro durante a requisição:", error);
  });

const usersScene = document.querySelector("#users");
function showUser(id) {
  const item = usersData.find((item) => item.id == id);
  let newDiv = document.createElement("form");
  newDiv.action = "";
  newDiv.className =
    "absolute top-[5%] left-1/3 w-4/12 h-auto bg-white rounded-lg shadow-xl dark:bg-slate-900 duration-500 ease-in-out flex flex-col gap-2 px-5 py-6 text-lg font-semibold";
  newDiv.innerHTML = `
  <div class="w-6 py-1 flex justify-center items-center border border-purple-800 dark:border-white duration-500 ease-in-out cursor-pointer dark:hover:bg-slate-800 hover:bg-purple-800 group rounded-md" onclick="closeUser()"><i class="fa-solid fa-xmark text-purple-800 dark:text-white group-hover:text-white duration-500 ease-in-out"></i></div>
  <div class="flex flex-col gap-1">
    <label for="name" class="text-purple-800 dark:text-white duration-500 ease-in-out">Empresa</label>
    <input type="text" name="name" id="name" value="${
      item.name
    }" class="px-3 py-2 border-purple-800 bg-white dark:bg-slate-900 border dark:border-white dark:text-white duration-500 ease-in-out rounded-lg outline-none focus:border-purple-800 text-purple-800">
  </div>
  <div class="flex flex-col gap-1">
    <label for="email" class="text-purple-800 dark:text-white duration-500 ease-in-out">Email</label>
    <input type="email" name="email" id="email" value="${
      item.email
    }" class="px-3 py-2 border-purple-800 bg-white dark:bg-slate-900 border dark:border-white dark:text-white duration-500 ease-in-out rounded-lg outline-none focus:border-purple-800 text-purple-800">
  </div>
  <div class="flex flex-col gap-1">
    <label for="tel" class="text-purple-800 dark:text-white duration-500 ease-in-out">Telefone</label>
    <input type="tel" name="tel" id="tel" value="${
      item.number
    }" class="px-3 py-2 border-purple-800 bg-white dark:bg-slate-900 border dark:border-white dark:text-white duration-500 ease-in-out rounded-lg outline-none focus:border-purple-800 text-purple-800">
  </div>
  <div class="flex flex-col gap-1">
    <label for="message" class="text-purple-800 dark:text-white duration-500 ease-in-out">Descrição</label>
    <input type="text" name="message" id="message" value="${
      item.aboutUs
    }" class="px-3 py-2 border-purple-800 bg-white dark:bg-slate-900 border dark:border-white dark:text-white duration-500 ease-in-out rounded-lg outline-none focus:border-purple-800 text-purple-800">
  </div>
  <div class="flex flex-col gap-1">
    <label for="id" class="text-purple-800 dark:text-white duration-500 ease-in-out">Endereço</label>
    <input type="string" name="id" id="id" value="${
      item.address
    }" class="px-3 py-2 border-purple-800 bg-white dark:bg-slate-900 border dark:border-white dark:text-white duration-500 ease-in-out rounded-lg outline-none focus:border-purple-800 text-purple-800">
  </div>
  <select id="status" class="border-purple-800 focus:border-purple-800 dark:border-white dark:focus:border-white rounded-md text-purple-800 dark:text-white text-lg font-semibold duration-500 ease-in-out bg-white dark:bg-slate-900 outline-none" >
    <option value="active" ${
      item.status === "active" ? "selected" : ""
    }>Ativo</option>
    <option value="inactive" ${
      item.status === "inactive" ? "selected" : ""
    }>Bloqueado</option>
  </select>

  <div class="w-full h-auto px-4 py-2 text-center border border-purple-800 text-purple-800 text-lg font-semibold hover:text-white hover:bg-purple-800 duration-500 ease-in-out cursor-pointer rounded-lg  dark:border-white dark:text-white dark:hover:bg-slate-800 mt-2" onclick="updatedUser()" >Atualizar</div>   `;
  usersScene.appendChild(newDiv);
}

function closeUser() {
  usersScene.removeChild(usersScene.lastChild);
}

// Produtos
const productsDiv = document.querySelector("#productsDiv");
let productsData = [];
fetch(url + "products")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    productsData = data;
    data.forEach((item) => {
      let newDiv = document.createElement("div");
      newDiv.innerHTML = `<div class="w-full h-auto text-md flex gap-5 py-2 px-3 border-t border-purple-800">
      <div class="w-1/6">${item.id}</div>
      <div class="w-3/6">${item.name}</div>
      <div class="w-2/6">$${item.price}</div>
      <div class="w-1/12"><i class="fa-solid fa-pen-to-square cursor-pointer text-purple-800 hover:text-purple-950 duration-500 ease-in-out dark:text-white dark:hover:text-slate-300" onclick="showProduct(${item.id})"></i></div>
      <div class="w-1/12"><i class="fa-solid fa-trash cursor-pointer text-purple-800 hover:text-purple-950 duration-500 ease-in-out dark:text-white dark:hover:text-slate-300"></i></div>
    </div>`;
      productsDiv.appendChild(newDiv);
    });
  })
  .catch((error) => {
    console.error("Erro durante a requisição:", error);
  });

const productsScene = document.querySelector("#products");
function showProduct(id) {
  const item = productsData.find((item) => item.id == id);
  let newDiv = document.createElement("form");
  newDiv.action = "";
  newDiv.className =
    "absolute top-[5%] left-1/3 w-4/12 h-auto bg-white rounded-lg shadow-xl dark:bg-slate-900 duration-500 ease-in-out flex flex-col gap-2 px-5 py-6 text-lg font-semibold";
  newDiv.innerHTML = `
  <div class="w-6 py-1 flex justify-center items-center border border-purple-800 dark:border-white duration-500 ease-in-out cursor-pointer dark:hover:bg-slate-800 hover:bg-purple-800 group rounded-md" onclick="closeProduct()"><i class="fa-solid fa-xmark text-purple-800 dark:text-white group-hover:text-white duration-500 ease-in-out"></i></div>
  <div class="flex flex-col gap-1">
    <label for="name" class="text-purple-800 dark:text-white duration-500 ease-in-out">Produto</label>
    <input type="text" name="name" id="name" value="${
      item.name
    }" class="px-3 py-2 border-purple-800 bg-white dark:bg-slate-900 border dark:border-white dark:text-white duration-500 ease-in-out rounded-lg outline-none focus:border-purple-800 text-purple-800">
  </div>
  <div class="flex flex-col gap-1">
    <label for="email" class="text-purple-800 dark:text-white duration-500 ease-in-out">Preço</label>
    <input type="email" name="email" id="email" value="${
      item.price
    }" class="px-3 py-2 border-purple-800 bg-white dark:bg-slate-900 border dark:border-white dark:text-white duration-500 ease-in-out rounded-lg outline-none focus:border-purple-800 text-purple-800">
  </div>
  <div class="flex flex-col gap-1">
    <label for="tel" class="text-purple-800 dark:text-white duration-500 ease-in-out">Descrição</label>
    <input type="tel" name="tel" id="tel" value="${
      item.description
    }" class="px-3 py-2 border-purple-800 bg-white dark:bg-slate-900 border dark:border-white dark:text-white duration-500 ease-in-out rounded-lg outline-none focus:border-purple-800 text-purple-800">
  </div>
  <div class="flex flex-col gap-1">
    <label for="message" class="text-purple-800 dark:text-white duration-500 ease-in-out">Id do Restaurante</label>
    <input type="text" name="message" id="message" value="${
      item.restaurant_id
    }" class="px-3 py-2 border-purple-800 bg-white dark:bg-slate-900 border dark:border-white dark:text-white duration-500 ease-in-out rounded-lg outline-none focus:border-purple-800 text-purple-800">
  </div>
  <div class="flex flex-col gap-1">
    <label for="id" class="text-purple-800 dark:text-white duration-500 ease-in-out">Link da Imagem</label>
    <input type="string" name="id" id="id" value="${
      item.image_link
    }" class="px-3 py-2 border-purple-800 bg-white dark:bg-slate-900 border dark:border-white dark:text-white duration-500 ease-in-out rounded-lg outline-none focus:border-purple-800 text-purple-800">
  </div>
  <select id="status" class="border-purple-800 focus:border-purple-800 dark:border-white dark:focus:border-white rounded-md text-purple-800 dark:text-white text-lg font-semibold duration-500 ease-in-out bg-white dark:bg-slate-900 outline-none" >
    <option value="active" ${
      item.status === "active" ? "selected" : ""
    }>Ativo</option>
    <option value="inactive" ${
      item.status === "inactive" ? "selected" : ""
    }>Bloqueado</option>
  </select>

  <div class="w-full h-auto px-4 py-2 text-center border border-purple-800 text-purple-800 text-lg font-semibold hover:text-white hover:bg-purple-800 duration-500 ease-in-out cursor-pointer rounded-lg  dark:border-white dark:text-white dark:hover:bg-slate-800 mt-2" onclick="updatedProduct()" >Atualizar</div>   `;
  productsScene.appendChild(newDiv);
}

function closeProduct() {
  productsScene.removeChild(productsScene.lastChild);
}
