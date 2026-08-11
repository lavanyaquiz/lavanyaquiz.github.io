// Login System
const loginPage = document.getElementById("loginPage");
const gamePage = document.getElementById("gamePage");

document.getElementById("loginBtn").onclick = () => {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user === "" || pass === "") {
    alert("Username आणि Password टाका");
    return;
  }

  loginPage.style.display = "none";
  gamePage.style.display = "block";
};

document.getElementById("registerBtn").onclick = () => {
  alert("Registration Successful");
};
// 30 सेकंदांचा Demo Timer
let seconds = 30;
const timer = document.getElementById("timer");

setInterval(() => {
  seconds--;

  if (seconds < 0) {
    seconds = 30;
    addHistory();
  }

  timer.innerText = "00:" + (seconds < 10 ? "0" + seconds : seconds);
}, 1000);

// History तयार करणे
function addHistory() {
  const history = document.getElementById("history");

  const row = document.createElement("tr");

  const period = Math.floor(Math.random() * 1000000);
  const number = Math.floor(Math.random() * 10);

  let result = number <= 4 ? "Small" : "Big";

  row.innerHTML = `
    <td>${period}</td>
    <td>${number}</td>
    <td>${result}</td>
  `;

  history.prepend(row);

  while (history.rows.length > 10) {
    history.deleteRow(10);
  }
}

// Demo Button Clicks
document.querySelector(".green").onclick = () => {
  alert("Green निवडले");
};

document.querySelector(".violet").onclick = () => {
  alert("Violet निवडले");
};

document.querySelector(".red").onclick = () => {
  alert("Red निवडले");
};

document.querySelector(".big").onclick = () => {
  alert("Big निवडले");
};

document.querySelector(".small").onclick = () => {
  alert("Small निवडले");
};

document.querySelectorAll(".numbers button").forEach(btn => {
  btn.onclick = () => {
    alert("Number " + btn.innerText + " निवडले");
  };
});

// सुरुवातीला 5 Demo History
for (let i = 0; i < 5; i++) {
  addHistory();
}