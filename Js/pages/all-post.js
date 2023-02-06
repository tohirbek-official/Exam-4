const myPost = document.querySelector(".my-post-all"),
  pagination = document.querySelector(".pagination"),
  postSearch = document.getElementById("search"),
  search = document.querySelector(".search");

let limit = 5,
  page = 1;

function getPost(photo, title, description,id) {
  return `
    <div class="user-post-box">
    <div class="post-left">
    <img src="./Image/main.png" />
    </div>
    <div class="post-right">
    <div class="link-category">
    <img src="./Image/link.png" title="Read more" onclick="data('${id}')"></div>
      <div class="post-info">
        <span>BUSINESS</span>
        <h1>${title}</h1>
        <p>
          ${description}
        </p>
      </div>
      </div>
    </div>
  </div>`;
}
//* <img src="https://blog-backend.up.railway.app/upload/${photo} "/> */
function data(id) {
  request.get(`post?page=${page}&limit=${limit}`).then((res) => {
    res.data.data.forEach((e) => {
      if (e._id == id) {
        let obj = JSON.stringify(e);
        localStorage.setItem("CategoryBlog", obj);
        location.href = "./blog.html";
      }
    });
  });
}

function getExprience() {
  request.get(`post?page=${page}&limit=${limit}`).then((res) => {
    pagination.innerHTML = "";
    myPost.innerHTML = "";
    res.data.data.map((el) => {
      let photoId = el.photo._id,
        photoName = el.photo.name.split(".").at(-1),
        photo = photoId + "." + photoName;
      const post = getPost(photo, el.title, el.description, el._id);
      myPost.innerHTML += post;
    });
    let pagesNum = Math.ceil(
      res.data.pagination.total / res.data.pagination.limit
    );
    let pages = "";
    for (var i = 1; i <= pagesNum; i++) {
      pages += `<li class="page-item"><a class="page-link ${
        page == i ? "active" : ""
      }"  onclick=changePage(${i})>${i}</a></li>`;
    }
    pagination.innerHTML = `
    <li class="page-item"><a class="page-link ${
      page === 1 ? "disabled" : ""
    }"  onclick="changePage('prev')"  >Previous</a></li>
   ${pages}
    <li class="page-item"><a class="page-link ${
      pagesNum == page ? "disabled" : ""
    }"  onclick="changePage('next')">Next</a></li>`;
  });
}
getExprience();
function categoryLoading() {
  return `
  <div class="loading-category">
  <div class="loading-left">
    <span></span>
  </div>
  <div class="loading-right">
    <span></span>
    <span></span>
    <span></span>
  </div></div>`;
}

search.addEventListener("click", () => {
  pagination.innerHTML = "";
  myPost.innerHTML = categoryLoading();

  let key = postSearch.value;
  request(`post?search=${key}`).then((res) => {
    if (res.data.data == false) {
      myPost.innerHTML = "The search has not given any results";
    } else {
      myPost.innerHTML = "";
    }
    res.data.data.map((el) => {
      let photoId = el.photo._id,
        photoName = el.photo.name.split(".").at(-1),
        photo = photoId + "." + photoName;
      const post = getPost(photo, el.title, el.description);
      myPost.innerHTML += post;
    });
  });
});
postSearch.addEventListener("keyup", (e) => {
  if (e.target.value == "") {
    getExprience();
  }
});

function changePage(value) {
  if (value === "next") {
    page++;
  } else if (value == "prev") {
    page--;
  } else {
    page = value;
  }
  getExprience();
}
