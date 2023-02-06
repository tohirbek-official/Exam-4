const homeBtn = document.querySelector(".home-button"),
  mainWord = document.querySelector(".main-section"),
  popular = document.querySelector(".popular-blogs"),
  categoryBtn = document.querySelectorAll(".category-box-hover button");

function main(categoryName, userName, photo, title, date, description) {
  return `
  <div class="main-image">
  <img src="https://blog-backend.up.railway.app/upload/${photo} "/></div>
      <div class="container">
    <div class="main-word"><div class="main-title">
      <span>Posted on ${categoryName}</span>  <h1>${title}</h1></div>
    <div class="main-word-date">  <span>By</span>&nbsp;&nbsp;<span >
    <span style="color: #ffd050;cursor:pointer;" onclick="blog()" >${userName}</span> </span>
      <span>&nbsp;|&nbsp; ${date}</span></div>
   <div class="main-discription"><p>
    ${description}</p></div><div class="main-button">
    <a style="color:rgba(35, 37, 54, 1);"  ><button onclick="blog()" >Read More</button></a> 
  </div> </div></div>`;
}

function category() {
  request.get("post/lastone").then((res) => {
    let blogPost = JSON.stringify(res.data);
    localStorage.setItem("CategoryBlog", blogPost);
  });
}
category();

function blog() {
  location.href = "./blog.html";
}

request.get("post/lastowne").then((res) => {
  let photoId = res.data.photo._id,
    photoName = res.data.photo.name.split(".").at(-1),
    photo = photoId + "." + photoName;
  let userCreateDate = res.data.updatedAt;
  let resdate = userCreateDate.split("T")[0];
  let date = resdate.replaceAll("-", "  ");
  let result = main(
    res.data.category,
    res.data.user.first_name,
    photo,
    res.data.title,
    date,
    res.data.description
  );
  mainWord.innerHTML = result;
  document.querySelector(".main-section").style.background =
    "radial-gradient(30.56% 76.04% at 74.58% 0%,rgba(0, 0, 0, 0) 0%,rgba(0, 0, 0, 0.6) 100%)";
});

function popularBlogs(photo, name, date, title, discription, id) {
  return `
  <div class="card"><div class="blogs-box">
  <div class="blogs-image">
  <img src="https://blog-backend.up.railway.app/upload/${photo} "/> </div>
  <div class="user-blogs-info"><span>By </span> <span onclick=getData('${id}')> ${name} </span> <span>${date}</span></div>
  <div class="blogs-info">
  <span>${title}</span>
  <div class="blogs-discription">
  <p>${discription}</p></div>
 </div>
  </div
  </div>
</div>
  `;
}

function PopularPost() {
  request.get("post/lastones").then((res) => {
    let arr = Object.entries(res.data);
    let resSlice = arr.slice(-3);
    resSlice.map((e) => {
      let data = e[1],
        fullName = data.user.first_name + " " + data.user.last_name,
        photoId = data.photo._id,
        photoName = data.photo.name.split(".").at(-1),
        photo = photoId + "." + photoName,
        userCreateDate = data.updatedAt,
        resdate = userCreateDate.split("T")[0],
        date = resdate.replaceAll("-", " ");
      result = popularBlogs(
        photo,
        fullName,
        date,
        data.title,
        data.description,
        data._id
      );
      popular.innerHTML += result;
      popular.removeChild(document.querySelector(".card"));
    });
  });
}
PopularPost();

function getData(id) {
  request.get("post/lastones").then((res) => {
    res.data.forEach((e) => {
      if (e._id === id) {
        let data = JSON.stringify(e);
        localStorage.setItem("CategoryBlog", data);
        blog();
      }
    });
  });
}

function categoryBox(name) {
  location.href = "Category.html";
  localStorage.setItem("categoryName", name);
}

categoryBtn.forEach((e) => {
  e.addEventListener("click", (e) => {
    categoryBox(e.target.name);
  });
});
