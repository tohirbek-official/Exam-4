const filterBtn = document.querySelector(".setting-filter"),
  closeFilterBtn = document.querySelector(".close-filter-btn"),
  filterCategory = document.querySelector(".category-filter");

filterBtn.addEventListener("click", () => {
  filterCategory.style.display = "block";
});
closeFilterBtn.addEventListener("click", (e) => {
  filterCategory.style.display = "";
});
