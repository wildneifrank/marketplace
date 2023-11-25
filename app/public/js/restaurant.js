const url = "http://localhost:3001/admin/";

function sendFeedback(event, id) {
  event.preventDefault();
  const name = document.querySelector(`#name_${id}`).value;
  const email = document.querySelector(`#email_${id}`).value;
  const tel = document.querySelector(`#tel_${id}`).value;
  const message = document.querySelector(`#message_${id}`).value;
  const json = {
    id: 0,
    name,
    email,
    tel,
    message,
    restaurant_id: parseInt(id),
  };
  fetch(url + `feedbacks`, {
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
  document.querySelector(`#name_${id}`).value = "";
  document.querySelector(`#email_${id}`).value = "";
  document.querySelector(`#tel_${id}`).value = "";
  document.querySelector(`#message_${id}`).value = "";
}
