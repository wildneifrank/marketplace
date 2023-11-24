const user = document.getElementById("user");
const password = document.getElementById("pass");
const bot = document.getElementById("botao");

async function Signin(){
    const data = {login: user.value, password: password.value}
    console.log(data)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    try{
        const response = await fetch('http://localhost:8800/signin', options)
        if(response.status===200){
            const tokenPackage = await response.json();
            localStorage.setItem("token", tokenPackage.token);
            window.location.href = '/user'
        }
    }catch(error){
        console.error('Erro:', error);
    }
    
}
bot.addEventListener("click", ()=>{
    Signin();
})
