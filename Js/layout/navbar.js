const hamburger = document.querySelector("#id"),
  navlink = document.querySelector(".link-nav"),
  closeBtn = document.querySelector(".close-responsive"),
  loginButton = document.querySelector(".login-button-navbar button");

hamburger.addEventListener("click", () => {
  navlink.style.right = "0";
  setTimeout(() => {
    closeBtn.style.display = "block";
  }, 340);
});
closeBtn.addEventListener("click", () => {
  navlink.style.right = "-100%";
  closeBtn.style.display = "none";
});
document.addEventListener("scroll", () => {
  if (window.pageYOffset > 340) {
    document.querySelector("nav").style.padding = "10px 0";
  } else if (window.pageYOffset < 390) {
    document.querySelector("nav").style.padding = "15px 0";
  }
});

let token = localStorage.getItem("PORTFOLIO_TOKEN");
if (token) {
  loginButton.textContent = "Logout";
} else {
  loginButton.textContent = "Sign up";
}
loginButton.addEventListener("click", () => {
  localStorage.removeItem("PORTFOLIO_TOKEN");
});
