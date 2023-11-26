const user = document.querySelector("#user");
const password = document.querySelector("#password");
const button = document.querySelector("#loginBtn");
const url = "http://localhost:3001/admin/";

async function Signin() {
  const data = { login: user.value, password: password.value };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch("http://localhost:8800/signin", options);
    if (response.status === 200) {
      const tokenPackage = await response.json();
      localStorage.setItem("token", tokenPackage.token);
      window.location.href = "/user";
    }
  } catch (error) {
    console.error("Erro:", error);
  }
}
button.addEventListener("click", () => {
  Signin();
});

function closeLogin() {
  const loginDiv = document.getElementById("loginDiv");
  loginDiv.style.display = "none";
  const registerDiv = document.getElementById("registerDiv");
  registerDiv.style.display = "flex";
}

function closeRegister() {
  const loginDiv = document.getElementById("loginDiv");
  loginDiv.style.display = "flex";
  const registerDiv = document.getElementById("registerDiv");
  registerDiv.style.display = "none";
}

function sendRegisterData(event) {
  event.preventDefault();
  const name = document.querySelector("#name").value;
  const tel = document.querySelector("#tel").value;
  const email = document.querySelector("#email").value;
  const image = document.querySelector("#image").value;
  const address = document.querySelector("#address").value;
  const aboutUs = document.querySelector("#aboutUs").value;
  const password = document.querySelector("#registerPassword").value;
  const passwordConfirmation = document.querySelector(
    "#passwordConfirmation"
  ).value;

  if (password !== passwordConfirmation) {
    window.alert("As senhas devem ser compatíveis!");
    return 0;
  }
  const json = {
    id: 0,
    name,
    email,
    address,
    number: tel,
    aboutUs,
    password,
    image,
  };
  fetch(url + `restaurants`, {
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
  document.querySelector("#name").value = "";
  document.querySelector("#tel").value = "";
  document.querySelector("#email").value = "";
  document.querySelector("#image").value = "";
  document.querySelector("#address").value = "";
  document.querySelector("#aboutUs").value = "";
  document.querySelector("#registerPassword").value = "";
  closeRegister();
}
