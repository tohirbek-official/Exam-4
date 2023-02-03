const hamburger = document.querySelector("#id"),
  navlink = document.querySelector(".link-nav"),
  closeBtn = document.querySelector(".close-responsive"),
  loginButton = document.querySelector(".login-button-navbar button"),
  navLogo = document.querySelector(".nav-logo a"),
  register = document.getElementById("register");
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
  navLogo.innerHTML = "My blog";
  navLogo.href = "./blog.html";
  register.href = "./Category.html";
  register.textContent = "Category";
  loginButton.textContent = "Logout";
} else {
  register.href;
  register.textContent;
  navLogo.innerHTML;
  loginButton.textContent;
  navLogo.href = "./Login.html";
}
loginButton.addEventListener("click", () => {
  localStorage.removeItem("PORTFOLIO_TOKEN");
});
