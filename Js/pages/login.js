const form = document.querySelector("form"),
  userName = document.querySelector("#userName"),
  userPassword = document.querySelector("#password"),
  loginStatus = document.querySelector(".login-input"),
  TOKEN = "PORTFOLIO_TOKEN";
function login() {
  return `
  <span>You have not registered yet or you have entered incorrect information</span>`;
}
function loginWrong() {
  return `
  <span>Something went wrong</span>`;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  request
    .post("auth/login", {
      username: userName.value,
      password: userPassword.value,
    })
    .then((res) => {
      localStorage.setItem(TOKEN, res.data.token);
      window.location.href = "./my-blog.html";
    })
    .catch((err) => {
      if (err.response.status == 401) {
        let div = document.createElement("div");
        div.classList = "login-status";
        div.innerHTML = login();
        if (loginStatus.firstElementChild.classList != "login-status") {
          loginStatus.prepend(div);
        }
      } else {
        let div = document.createElement("div");
        div.classList = "login-status";
        div.innerHTML = loginWrong();
        if (loginStatus.firstElementChild.classList != "login-status") {
          loginStatus.prepend(div);
        }
      }
    });
});
