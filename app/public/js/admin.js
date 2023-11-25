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
const feedbacksAmountDiv = document.querySelector("#feedbacksAmount");
fetch(url + "feedbacks")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    feedbacksData = data;
    let amount = 0;
    data.forEach((item) => {
      if (!item.deleted) {
        amount++;
        let newDiv = document.createElement("div");
        newDiv.innerHTML = `<div class="w-full h-auto text-md flex gap-5 py-2 px-3 border-t border-purple-800">
      <div class="w-1/6">${item.id}</div>
      <div class="w-3/6">${item.name}</div>
      <div class="w-2/6">${item.email}</div>
      <div class="w-1/12"><i class="fa-solid fa-eye cursor-pointer text-purple-800 hover:text-purple-950 duration-500 ease-in-out dark:text-white dark:hover:text-slate-300" onclick="showFeedback(${item.id})"></i></div>
      <div class="w-1/12"><i class="fa-solid fa-trash cursor-pointer text-purple-800 hover:text-purple-950 duration-500 ease-in-out dark:text-white dark:hover:text-slate-300" onclick="showDeletedFeedback(${item.id})"></i></div>
    </div>`;
        feedbacksDiv.appendChild(newDiv);
      }
    });
    feedbacksAmountDiv.innerHTML = `${amount}`;
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

function showDeletedFeedback(id) {
  let newDiv = document.createElement("div");
  newDiv.className =
    "absolute top-[35%] left-1/3 w-4/12 h-auto bg-white rounded-lg shadow-xl dark:bg-slate-900 duration-500 ease-in-out flex flex-col gap-2 px-5 py-6 text-lg font-semibold";
  newDiv.innerHTML = `<div class="w-6 py-1 flex justify-center items-center border border-purple-800 dark:border-white duration-500 ease-in-out cursor-pointer dark:hover:bg-slate-800 hover:bg-purple-800 group rounded-md" onclick="closeFeedback()"><i class="fa-solid fa-xmark text-purple-800 dark:text-white group-hover:text-white duration-500 ease-in-out"></i></div>
    <div class="text-purple-800 dark:text-white duration-500 ease-in-out">
      Tem certeza em excluir o feedback ${id}?
    </div>
    <div class="w-full h-auto px-4 py-2 text-center border border-purple-800 text-purple-800 text-lg font-semibold hover:text-white hover:bg-purple-800 duration-500 ease-in-out cursor-pointer rounded-lg  dark:border-white dark:text-white dark:hover:bg-slate-800 mt-2" onclick="deletedFeedback(${id})" >Excluir</div>  `;
  feedbacksScene.appendChild(newDiv);
}
function deletedFeedback(id) {
  fetch(url + `feedbacks/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
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
  closeFeedback();
  updatedFeedback();
}

function updatedFeedback() {
  feedbacksDiv.innerHTML = "";
  fetch(url + "feedbacks")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      feedbacksData = data;
      let amount = 0;
      data.forEach((item) => {
        if (!item.deleted) {
          amount++;
          let newDiv = document.createElement("div");
          newDiv.innerHTML = `<div class="w-full h-auto text-md flex gap-5 py-2 px-3 border-t border-purple-800">
      <div class="w-1/6">${item.id}</div>
      <div class="w-3/6">${item.name}</div>
      <div class="w-2/6">${item.email}</div>
      <div class="w-1/12"><i class="fa-solid fa-eye cursor-pointer text-purple-800 hover:text-purple-950 duration-500 ease-in-out dark:text-white dark:hover:text-slate-300" onclick="showFeedback(${item.id})"></i></div>
      <div class="w-1/12"><i class="fa-solid fa-trash cursor-pointer text-purple-800 hover:text-purple-950 duration-500 ease-in-out dark:text-white dark:hover:text-slate-300" onclick="showDeletedFeedback(${item.id})"></i></div>
    </div>`;
          feedbacksDiv.appendChild(newDiv);
        }
      });
      feedbacksAmountDiv.innerHTML = `${amount}`;
    })
    .catch((error) => {
      console.error("Erro durante a requisição:", error);
    });
}

function closeFeedback() {
  feedbacksScene.removeChild(feedbacksScene.lastChild);
}

// Usuários
const usersDiv = document.querySelector("#usersDiv");
let usersData = [];
const usersAmountDiv = document.querySelector("#usersAmount");
fetch(url + "restaurants")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    usersData = data;
    let amount = 0;
    data.forEach((item) => {
      if (!item.deleted) {
        amount++;
        let newDiv = document.createElement("div");
        newDiv.innerHTML = `<div class="w-full h-auto text-md flex gap-5 py-2 px-3 border-t border-purple-800">
      <div class="w-1/6">${item.id}</div>
      <div class="w-3/6">${item.name}</div>
      <div class="w-2/6">${item.email}</div>
      <div class="w-1/12"><i class="fa-solid fa-pen-to-square cursor-pointer text-purple-800 hover:text-purple-950 duration-500 ease-in-out dark:text-white dark:hover:text-slate-300" onclick="showUser(${item.id})"></i></div>
      <div class="w-1/12"><i class="fa-solid fa-trash cursor-pointer text-purple-800 hover:text-purple-950 duration-500 ease-in-out dark:text-white dark:hover:text-slate-300" onclick="showDeletedUser(${item.id})"></i></div>
    </div>`;
        usersDiv.appendChild(newDiv);
      }
    });
    usersAmountDiv.innerHTML = `${amount}`;
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
    <input type="text" name="name" id="name_user_${item.id}" value="${
    item.name
  }" class="px-3 py-2 border-purple-800 bg-white dark:bg-slate-900 border dark:border-white dark:text-white duration-500 ease-in-out rounded-lg outline-none focus:border-purple-800 text-purple-800">
  </div>
  <div class="flex flex-col gap-1">
    <label for="email" class="text-purple-800 dark:text-white duration-500 ease-in-out">Email</label>
    <input type="email" name="email" id="email_user_${item.id}" value="${
    item.email
  }" class="px-3 py-2 border-purple-800 bg-white dark:bg-slate-900 border dark:border-white dark:text-white duration-500 ease-in-out rounded-lg outline-none focus:border-purple-800 text-purple-800">
  </div>
  <div class="flex flex-col gap-1">
    <label for="tel" class="text-purple-800 dark:text-white duration-500 ease-in-out">Telefone</label>
    <input type="tel" name="tel" id="tel_user_${item.id}" value="${
    item.number
  }" class="px-3 py-2 border-purple-800 bg-white dark:bg-slate-900 border dark:border-white dark:text-white duration-500 ease-in-out rounded-lg outline-none focus:border-purple-800 text-purple-800">
  </div>
  <div class="flex flex-col gap-1">
    <label for="message" class="text-purple-800 dark:text-white duration-500 ease-in-out">Descrição</label>
    <input type="text" name="message" id="message_user_${item.id}" value="${
    item.aboutUs
  }" class="px-3 py-2 border-purple-800 bg-white dark:bg-slate-900 border dark:border-white dark:text-white duration-500 ease-in-out rounded-lg outline-none focus:border-purple-800 text-purple-800">
  </div>
  <div class="flex flex-col gap-1">
    <label for="id" class="text-purple-800 dark:text-white duration-500 ease-in-out">Endereço</label>
    <input type="text" name="address" id="address_user_${item.id}" value="${
    item.address
  }" class="px-3 py-2 border-purple-800 bg-white dark:bg-slate-900 border dark:border-white dark:text-white duration-500 ease-in-out rounded-lg outline-none focus:border-purple-800 text-purple-800">
  </div>
  <select id="status_user_${
    item.id
  }" class="border-purple-800 focus:border-purple-800 dark:border-white dark:focus:border-white rounded-md text-purple-800 dark:text-white text-lg font-semibold duration-500 ease-in-out bg-white dark:bg-slate-900 outline-none" >
    <option value="active" ${
      item.status === true ? "selected" : ""
    }>Ativo</option>
    <option value="inactive" ${
      item.status === false ? "selected" : ""
    }>Bloqueado</option>
  </select>

  <div class="w-full h-auto px-4 py-2 text-center border border-purple-800 text-purple-800 text-lg font-semibold hover:text-white hover:bg-purple-800 duration-500 ease-in-out cursor-pointer rounded-lg  dark:border-white dark:text-white dark:hover:bg-slate-800 mt-2" onclick="sendUserData(${
    item.id
  })" >Atualizar</div>   `;
  usersScene.appendChild(newDiv);
}

function sendUserData(id) {
  const name = document.querySelector(`#name_user_${id}`).value;
  const email = document.querySelector(`#email_user_${id}`).value;
  const tel = document.querySelector(`#tel_user_${id}`).value;
  const message = document.querySelector(`#message_user_${id}`).value;
  const address = document.querySelector(`#address_user_${id}`).value;
  const status = document.querySelector(`#status_user_${id}`).value;
  if (!name || !email || !tel || !message || !address || !status) {
    alert("Por favor, preencha todos os campos do formulário.");
    return false;
  }
  const json = {
    name,
    email,
    tel,
    message,
    address,
    status: status === "active" ? true : false,
  };
  fetch(url + `restaurants/${id}`, {
    method: "PUT",
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
  updatedUser();
  closeUser();
}

function showDeletedUser(id) {
  let newDiv = document.createElement("div");
  newDiv.className =
    "absolute top-[35%] left-1/3 w-4/12 h-auto bg-white rounded-lg shadow-xl dark:bg-slate-900 duration-500 ease-in-out flex flex-col gap-2 px-5 py-6 text-lg font-semibold";
  newDiv.innerHTML = `<div class="w-6 py-1 flex justify-center items-center border border-purple-800 dark:border-white duration-500 ease-in-out cursor-pointer dark:hover:bg-slate-800 hover:bg-purple-800 group rounded-md" onclick="closeUser()"><i class="fa-solid fa-xmark text-purple-800 dark:text-white group-hover:text-white duration-500 ease-in-out"></i></div>
    <div class="text-purple-800 dark:text-white duration-500 ease-in-out">
      Tem certeza em excluir o restaurante ${id}?
    </div>
    <div class="w-full h-auto px-4 py-2 text-center border border-purple-800 text-purple-800 text-lg font-semibold hover:text-white hover:bg-purple-800 duration-500 ease-in-out cursor-pointer rounded-lg  dark:border-white dark:text-white dark:hover:bg-slate-800 mt-2" onclick="deletedUser(${id})" >Excluir</div>  `;
  usersScene.appendChild(newDiv);
}
function deletedUser(id) {
  fetch(url + `restaurants/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
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
  closeUser();
  updatedUser();
}

function updatedUser() {
  usersDiv.innerHTML = "";
  fetch(url + "restaurants")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      usersData = data;
      let amount = 0;
      data.forEach((item) => {
        if (!item.deleted) {
          amount++;
          let newDiv = document.createElement("div");
          newDiv.innerHTML = `<div class="w-full h-auto text-md flex gap-5 py-2 px-3 border-t border-purple-800">
      <div class="w-1/6">${item.id}</div>
      <div class="w-3/6">${item.name}</div>
      <div class="w-2/6">${item.email}</div>
      <div class="w-1/12"><i class="fa-solid fa-pen-to-square cursor-pointer text-purple-800 hover:text-purple-950 duration-500 ease-in-out dark:text-white dark:hover:text-slate-300" onclick="showUser(${item.id})"></i></div>
      <div class="w-1/12"><i class="fa-solid fa-trash cursor-pointer text-purple-800 hover:text-purple-950 duration-500 ease-in-out dark:text-white dark:hover:text-slate-300" onclick="showDeletedUser(${item.id})"></i></div>
    </div>`;
          usersDiv.appendChild(newDiv);
        }
      });
      usersAmountDiv.innerHTML = `${amount}`;
    })
    .catch((error) => {
      console.error("Erro durante a requisição:", error);
    });
}

function closeUser() {
  usersScene.removeChild(usersScene.lastChild);
}

// Produtos
const productsDiv = document.querySelector("#productsDiv");
let productsData = [];
const productsAmountDiv = document.querySelector("#productsAmount");

fetch(url + "products")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    productsData = data;
    let amount = 0;
    data.forEach((item) => {
      if (!item.deleted) {
        amount++;
        let newDiv = document.createElement("div");
        newDiv.innerHTML = `<div class="w-full h-auto text-md flex gap-5 py-2 px-3 border-t border-purple-800">
      <div class="w-1/6">${item.id}</div>
      <div class="w-3/6">${item.name}</div>
      <div class="w-2/6">$${item.price}</div>
      <div class="w-1/12"><i class="fa-solid fa-pen-to-square cursor-pointer text-purple-800 hover:text-purple-950 duration-500 ease-in-out dark:text-white dark:hover:text-slate-300" onclick="showProduct(${item.id})"></i></div>
      <div class="w-1/12"><i class="fa-solid fa-trash cursor-pointer text-purple-800 hover:text-purple-950 duration-500 ease-in-out dark:text-white dark:hover:text-slate-300" onclick="showDeletedProduct(${item.id})"></i></div>
    </div>`;
        productsDiv.appendChild(newDiv);
      }
    });
    productsAmountDiv.innerHTML = `${amount}`;
  })
  .catch((error) => {
    console.error("Erro durante a requisição:", error);
  });

const productsScene = document.querySelector("#products");
function showDeletedProduct(id) {
  let newDiv = document.createElement("div");
  newDiv.className =
    "absolute top-[35%] left-1/3 w-4/12 h-auto bg-white rounded-lg shadow-xl dark:bg-slate-900 duration-500 ease-in-out flex flex-col gap-2 px-5 py-6 text-lg font-semibold";
  newDiv.innerHTML = `<div class="w-6 py-1 flex justify-center items-center border border-purple-800 dark:border-white duration-500 ease-in-out cursor-pointer dark:hover:bg-slate-800 hover:bg-purple-800 group rounded-md" onclick="closeProduct()"><i class="fa-solid fa-xmark text-purple-800 dark:text-white group-hover:text-white duration-500 ease-in-out"></i></div>
  <div class="text-purple-800 dark:text-white duration-500 ease-in-out">
    Tem certeza em excluir o produto ${id}?
  </div>
  <div class="w-full h-auto px-4 py-2 text-center border border-purple-800 text-purple-800 text-lg font-semibold hover:text-white hover:bg-purple-800 duration-500 ease-in-out cursor-pointer rounded-lg  dark:border-white dark:text-white dark:hover:bg-slate-800 mt-2" onclick="deletedProduct(${id})" >Excluir</div>  `;
  productsScene.appendChild(newDiv);
}
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
    <input type="text" name="name" id="name_product_${item.id}" value="${
    item.name
  }" class="px-3 py-2 border-purple-800 bg-white dark:bg-slate-900 border dark:border-white dark:text-white duration-500 ease-in-out rounded-lg outline-none focus:border-purple-800 text-purple-800">
  </div>
  <div class="flex flex-col gap-1">
    <label for="price" class="text-purple-800 dark:text-white duration-500 ease-in-out">Preço</label>
    <input type="text" name="price" id="price_product_${item.id}" value="${
    item.price
  }" class="px-3 py-2 border-purple-800 bg-white dark:bg-slate-900 border dark:border-white dark:text-white duration-500 ease-in-out rounded-lg outline-none focus:border-purple-800 text-purple-800">
  </div>
  <div class="flex flex-col gap-1">
    <label for="description" class="text-purple-800 dark:text-white duration-500 ease-in-out">Descrição</label>
    <input type="text" name="description" id="description_product_${
      item.id
    }" value="${
    item.description
  }" class="px-3 py-2 border-purple-800 bg-white dark:bg-slate-900 border dark:border-white dark:text-white duration-500 ease-in-out rounded-lg outline-none focus:border-purple-800 text-purple-800">
  </div>
  <div class="flex flex-col gap-1">
    <label for="restaurant_id" class="text-purple-800 dark:text-white duration-500 ease-in-out">Id do Restaurante</label>
    <input type="text" name="restaurant_id" id="restaurant_id_product_${
      item.id
    }" value="${
    item.restaurant_id
  }" class="px-3 py-2 border-purple-800 bg-white dark:bg-slate-900 border dark:border-white dark:text-white duration-500 ease-in-out rounded-lg outline-none focus:border-purple-800 text-purple-800">
  </div>
  <div class="flex flex-col gap-1">
    <label for="image_link" class="text-purple-800 dark:text-white duration-500 ease-in-out">Link da Imagem</label>
    <input type="text" name="image_link" id="image_link_product_${
      item.id
    }" value="${
    item.image_link
  }" class="px-3 py-2 border-purple-800 bg-white dark:bg-slate-900 border dark:border-white dark:text-white duration-500 ease-in-out rounded-lg outline-none focus:border-purple-800 text-purple-800">
  </div>
  <select id="status_product_${
    item.id
  }" class="border-purple-800 focus:border-purple-800 dark:border-white dark:focus:border-white rounded-md text-purple-800 dark:text-white text-lg font-semibold duration-500 ease-in-out bg-white dark:bg-slate-900 outline-none" >
    <option value="active" ${
      item.status === true ? "selected" : ""
    }>Ativo</option>
    <option value="inactive" ${
      item.status === false ? "selected" : ""
    }>Bloqueado</option>
  </select>

  <div class="w-full h-auto px-4 py-2 text-center border border-purple-800 text-purple-800 text-lg font-semibold hover:text-white hover:bg-purple-800 duration-500 ease-in-out cursor-pointer rounded-lg  dark:border-white dark:text-white dark:hover:bg-slate-800 mt-2" onclick="sendProductData(${
    item.id
  })" >Atualizar</div>   `;
  productsScene.appendChild(newDiv);
}

function sendProductData(id) {
  const name = document.querySelector(`#name_product_${id}`).value;
  const price = document.querySelector(`#price_product_${id}`).value;
  const description = document.querySelector(
    `#description_product_${id}`
  ).value;
  const restaurant_id = document.querySelector(
    `#restaurant_id_product_${id}`
  ).value;
  const image_link = document.querySelector(`#image_link_product_${id}`).value;
  const status = document.querySelector(`#status_product_${id}`).value;
  if (
    !name ||
    !price ||
    !description ||
    !restaurant_id ||
    !image_link ||
    !status
  ) {
    alert("Por favor, preencha todos os campos do formulário.");
    return false;
  }
  const json = {
    name,
    price,
    description,
    restaurant_id,
    image_link,
    status: status === "active" ? true : false,
  };
  fetch(url + `products/${id}`, {
    method: "PUT",
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
  updateProducts();
  closeProduct();
}

function deletedProduct(id) {
  fetch(url + `products/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
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
  closeProduct();
  updateProducts();
}

function updateProducts() {
  productsDiv.innerHTML = "";
  fetch(url + "products")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      productsData = data;
      let amount = 0;
      data.forEach((item) => {
        if (!item.deleted) {
          amount++;
          let newDiv = document.createElement("div");
          newDiv.innerHTML = `<div class="w-full h-auto text-md flex gap-5 py-2 px-3 border-t border-purple-800">
      <div class="w-1/6">${item.id}</div>
      <div class="w-3/6">${item.name}</div>
      <div class="w-2/6">$${item.price}</div>
      <div class="w-1/12"><i class="fa-solid fa-pen-to-square cursor-pointer text-purple-800 hover:text-purple-950 duration-500 ease-in-out dark:text-white dark:hover:text-slate-300" onclick="showProduct(${item.id})"></i></div>
      <div class="w-1/12"><i class="fa-solid fa-trash cursor-pointer text-purple-800 hover:text-purple-950 duration-500 ease-in-out dark:text-white dark:hover:text-slate-300" onclick="showDeletedProduct(${item.id})"></i></div>
    </div>`;
          productsDiv.appendChild(newDiv);
        }
      });
      productsAmountDiv.innerHTML = `${amount}`;
    })
    .catch((error) => {
      console.error("Erro durante a requisição:", error);
    });
}
function closeProduct() {
  productsScene.removeChild(productsScene.lastChild);
}
