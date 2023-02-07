const filterBtn = document.querySelector(".setting-filter"),
  closeFilterBtn = document.querySelector(".close-filter-btn"),
  filterCategory = document.querySelector(".category-filter"),
  allButton = document.querySelectorAll(".filter-button button"),
  categoryTitle = document.querySelector(".startup-title h1"),
  startupBottom = document.querySelector(".startup-bottom span"),
  catgoryPost = document.querySelector(".user-category-left"),
  filterCategoryBtn = document.querySelectorAll(".filter-button"),
  categoryInput = document.getElementById("categoryInput"),
  settingImg = document.querySelector(".setting-filter"),
  categoryAll = document.querySelector(".category-all"),
  searching = document.querySelector(".search-submit");
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

function getPost(photo, title, discription, id) {
  return ` <div class="user-category-box">
      <div class="category-left">
      <img src="https://blog-backend.up.railway.app/upload/${photo}"/></div>
      <div class="category-right">
      <div class="link-category">
      <img src="./Image/link.png" title="Read more" onclick="data('${id}')"></div>
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

function data(id) {
  All.forEach((e) => {
    console.log(e)
    if (e._id == id) {
      let obj = JSON.stringify(e);
      localStorage.setItem("CategoryBlog", obj);
      location.href = "./blog.html";
    }
  });
}

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
    const post = getPost(photo, e.name, e.description, e._id);
    catgoryPost.innerHTML += post;
  });
}
function filterButton() {
  filterCategoryBtn.forEach((e) => {
    localStorage.setItem("categoryName", "All Categories");
    e.addEventListener("click", (event) => {
      let data = event.target.name;
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

document.body.addEventListener("click", (e) => {
  if (e.target.id == "categoryInput" || e.target.id == "submit") {
    allButton.forEach((e) => {
      e.classList.remove("active");
    });
    categoryTitle.textContent = "All Categories";
    startupBottom.textContent = "All > Category";
    document.querySelector("#all").classList = "active";
    searching.classList.add("show");
    settingImg.classList.add("hide");
    renderPost(All)
  } else {
    searching.classList.remove("show");
    settingImg.classList.remove("hide");
  }
});

document.querySelector("#submit").addEventListener("click", () => {
  catgoryPost.innerHTML = "";
  All.map((e) => {
    if (categoryInput.value.toLowerCase().includes(e.name.toLowerCase())) {
      let photoId = e.photo._id,
        photoName = e.photo.name.split(".").at(-1),
        photo = photoId + "." + photoName;
      const post = getPost(photo, e.name, e.description);
      catgoryPost.innerHTML += post;
    }
  });
  if (!catgoryPost.childNodes.length) {
    catgoryPost.innerHTML = "The search has not given any results";
  }
});
newFunction();
function newFunction() {
  categoryInput.addEventListener("keyup", (e) => {
    if (e.target.value == "") {
      renderPost(All);
    }
  });
}
