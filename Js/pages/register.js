const form = document.querySelector("form"),
  firsName = document.querySelector("#Firstname"),
  lastName = document.querySelector("#Lastname"),
  userName = document.querySelector("#userName"),
  password = document.querySelector("#password"),
  confirmpassword = document.querySelector("#confirmpassword"),
  registerInput = document.querySelector(".register-input");

const TOKEN = "PORTFOLIO_TOKEN";

function registerERR() {
  return `
  <span>You are already registered
  </span>`;
}

function registerWrong() {
  return `<span>Something went wrong</span>`;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (password.value == "" || confirmpassword.value == "") {
    alert("Xato");
  } else if (password.value !== confirmpassword.value) {
    password.style.outline = "#ff0000";
    confirmpassword.style.outline = "#ff0000";
    password.style.border = "1px solid #ff0000";
    confirmpassword.style.border = "1px solid #ff0000";
  } else if (password.value === confirmpassword.value) {
    password.style.border = "";
    confirmpassword.style.border = "";
    password.style.outline = "";
    confirmpassword.style.outline = "";

    // Register
    request
      .post("auth/register", {
        first_name: firsName.value,
        last_name: lastName.value,
        username: userName.value,
        password: password.value,
      })
      .then((res) => {
        location.href = "./Login.html";
      })
      .catch((res) => {
        if (res.response.status == 400) {
          let div = document.createElement("div");
          div.classList = "register-status";
          div.innerHTML = registerERR();
          registerInput.prepend(div);
        } else {
          let div = document.createElement("div");
          div.classList = "register-status";
          div.innerHTML = registerWrong();
          registerInput.prepend(div);
        }
      });
  }
});
