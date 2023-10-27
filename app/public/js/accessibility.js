// Light e dark mode
const toggle = document.querySelectorAll(".toggle");
const state = document.querySelector("#mode");

if (localStorage.mode == "dark") {
  toggle.forEach((item) => {
    item.classList.toggle("hidden");
  });
  state.classList.add("dark");
}

toggle.forEach((mode) => {
  mode.addEventListener("click", () => {
    toggle.forEach((item) => {
      item.classList.toggle("hidden");
    });
    state.classList.toggle("dark");

    if (state.classList.contains("dark")) {
      localStorage.mode = "dark";
    } else localStorage.mode = "light";
  });
});

// Aumentar e Diminuir Fonte
document.querySelector("#increase-font").addEventListener("click", function () {
  changeFontSize(2);
});

document.querySelector("#decrease-font").addEventListener("click", function () {
  changeFontSize(-2);
});

const root = document.documentElement;
if (
  localStorage.fontSize !=
  window.getComputedStyle(root).getPropertyValue("font-size")
) {
  root.style.fontSize = `${localStorage.fontSize}px`;
}

function changeFontSize(change) {
  const currentFontSize = parseInt(
    window.getComputedStyle(root).getPropertyValue("font-size")
  );

  const newFontSize = currentFontSize + change;

  if (newFontSize <= 22 && newFontSize >= 10) {
    localStorage.fontSize = newFontSize;
    root.style.fontSize = `${newFontSize}px`;
  }
}
