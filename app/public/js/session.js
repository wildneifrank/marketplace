const loginButton = document.querySelector("#loginButton");
const session = document.querySelector("#sessionDiv");
fetch(`http://localhost:3001/sessionValidate`, {
  method: "POST",
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
    let newDiv = document.createElement("div");
    newDiv.className = "flex gap-3 items-center";
    newDiv.innerHTML = `
    <a href="${
      data.role == "admin" ? "/admin" : "/user"
    }" class="text-lg font-semibold text-purple-800 duration-500 ease-in-out dark:text-white hover:underline cursor-pointer">${
      data.name
    }</a>
    <img src="${
      data.image
    }" class="rounded-full w-10 h-10 border border-purple-800 dark:border-white duration-500 ease-in-out" alt="Logo - ${
      data.name
    }">
  `;
    session.appendChild(newDiv);
    loginButton.classList.toggle("hidden");
  })
  .catch((error) => {
    console.error("Erro durante a requisição:", error);
  });
