const hamburger = document.querySelector(".hamburger"),
  hamburgerImage = document.querySelector(".hamburger #id"),
  navlink = document.querySelector(".link-nav"),
  closeBtn = document.querySelector(".close-responsive");

hamburger.addEventListener("click", () => {
  navlink.style.right = "0";
  setTimeout(() => {
    closeBtn.style.display = "block";
  }, 280);
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