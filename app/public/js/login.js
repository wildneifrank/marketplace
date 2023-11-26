const user = document.querySelector("#user");
const password = document.querySelector("#password");
const button = document.querySelector("#loginBtn");

async function Signin() {
  const data = { login: user.value, password: password.value };
  console.log(data);
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
