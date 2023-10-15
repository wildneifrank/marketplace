document.getElementById("ocultarLink").addEventListener("click", function(event) {
    event.preventDefault(); // Isso evita que o link redirecione para outra página.
    var div = document.getElementById("minhaDiv");
    div.style.display = "none";
    var div2 = document.getElementById("minhaDiv2");
    div2.style.display = "flex";
});
