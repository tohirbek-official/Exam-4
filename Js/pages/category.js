const filterBtn = document.querySelector(".setting-filter"),
  closeFilterBtn = document.querySelector(".close-filter-btn"),
  filterCategory = document.querySelector(".category-filter"),
  allButton = document.querySelectorAll(".filter-button button"),
  categoryTitle = document.querySelector(".startup-title h1"),
  startupBottom = document.querySelector(".startup-bottom span"),
  catgoryPost = document.querySelector(".user-category-left"),
  filterCategoryBtn = document.querySelectorAll(".filter-button");

filterBtn.addEventListener("click", () => {
  filterCategory.style.display = "block";
});
closeFilterBtn.addEventListener("click", () => {
  filterCategory.style.display = "";
});

allButton.forEach((el) => {
  el.addEventListener("click", function (e) {
    e.target.classList.add("active");
    allButton.forEach((el) => {
      el.classList !== e.target.classList && el.classList.remove("active");
    });
  });
});

let categoryName = localStorage.getItem("categoryName");
function titleCategory(name) {
  if (categoryName == name) {
    categoryTitle.textContent = name;
    startupBottom.textContent = `${name} > Category`;
  }
  switch (name) {
    case "Business":
      document.getElementById("business").classList = "active";
      break;
    case "Startup":
      document.getElementById("startup").classList = "active";
      break;
    case "Economy":
      document.getElementById("economy").classList = "active";
      break;
    case "Technology":
      document.getElementById("technology").classList = "active";
      break;
    case "All Categories":
      document.getElementById("all").classList = "active";
      break;
  }
}
titleCategory(categoryName);

function getPost(photo, title, discription) {
  return ` <div class="user-category-box">
      <div class="category-left">
      <img src="https://blog-backend.up.railway.app/upload/${photo}"/></div>
      <div class="category-right">
        <div class="category-info">
          <span>${title}</span>
          <h1>Step-by-step guide to choosing great font pairs</h1><p>${discription}
          </p>
        </div>
      </div>
    </div>`;
}

let dataName = localStorage.getItem("categoryName");
const Business = [],
  Startup = [],
  Economy = [],
  Technology = [],
  All = [];
request.get("category").then((res) => {
  console.log(res.data.data);
  res.data.data.forEach((e) => {
    let business = e.name.includes("Business"),
      startup = e.name.includes("Startup"),
      economy = e.name.includes("Economy"),
      technology = e.name.includes("Technology");
    All.push(e);
    if (business) {
      Business.push(e);
    } else if (startup) {
      Startup.push(e);
    } else if (economy) {
      Economy.push(e);
    } else if (technology) {
      Technology.push(e);
    } else {
      alert("Malumot topilmadi!");
    }
  });
  filterPost(dataName);
});
function filterPost(name) {
  if (name == "Business") {
    renderPost(Business);
  } else if (name == "Startup") {
    renderPost(Startup);
  } else if (name == "Economy") {
    renderPost(Economy);
  } else if (name == "Technology") {
    renderPost(Technology);
  } else if (name == "All Categories") {
    renderPost(All);
  }
}

function renderPost(obj) {
  catgoryPost.innerHTML = "";
  obj.forEach((e) => {
    let photoId = e.photo._id,
      photoName = e.photo.name.split(".").at(-1),
      photo = photoId + "." + photoName;
    const post = getPost(photo, e.name, e.description);
    catgoryPost.innerHTML += post;
  });
}
function filterButton() {
  filterCategoryBtn.forEach((e) => {
    e.addEventListener("click", (event) => {
      let data = event.target.name;
      localStorage.setItem("categoryName", data);
      if (data == "All Categories") {
        catgoryPost.innerHTML = "";
        categoryTitle.textContent = "All Categories";
        startupBottom.textContent = "All > Category";
        renderPost(All);
      } else if (data == "Startup") {
        catgoryPost.innerHTML = "";
        categoryTitle.textContent = "Startup";
        startupBottom.textContent = "Startup > Category";
        renderPost(Startup);
      } else if (data == "Economy") {
        catgoryPost.innerHTML = "";
        categoryTitle.textContent = "Economy";
        startupBottom.textContent = "Economy > Category";
        renderPost(Economy);
      } else if (data == "Technology") {
        catgoryPost.innerHTML = "";
        categoryTitle.textContent = "Technology";
        startupBottom.textContent = "Technology > Category";
        renderPost(Technology);
      } else if (data == "Business") {
        catgoryPost.innerHTML = "";
        categoryTitle.textContent = "Business";
        startupBottom.textContent = "Business >Category";
        renderPost(Business);
      }
    });
  });
}
filterButton();


