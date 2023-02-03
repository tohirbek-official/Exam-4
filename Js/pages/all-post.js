const myPost = document.querySelector(".my-post-all"),
  pagination = document.querySelector(".pagination"),
  postSearch = document.getElementById("search");

let limit = 8,
  page = 1;

function getPost(photo, title, description) {
  return `
    <div class="user-post-box">
    <div class="post-left">
    <img src="https://blog-backend.up.railway.app/upload/${photo} "/></div>
    <div class="post-right">
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

function getExprience() {
  request.get(`post?page=${page}&limit=${limit}`).then((res) => {
    pagination.innerHTML = "";
    myPost.innerHTML = "";
    res.data.data.map((el) => {
      let photoId = el.photo._id,
        photoName = el.photo.name.split(".").at(-1),
        photo = photoId + "." + photoName;
      const post = getPost(photo, el.title, el.description);
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

postSearch.addEventListener("keyup", (e) => {
  pagination.innerHTML = "";
  myPost.innerHTML = "";
  let key = e.target.value;
  request(`post?search=${key}`).then((res) => {
    res.data.data.map((el) => {
      let photoId = el.photo._id,
        photoName = el.photo.name.split(".").at(-1),
        photo = photoId + "." + photoName;
      const post = getPost(photo, el.title, el.description);
      myPost.innerHTML += post;
    });
    if (!key) {
      getExprience();
    }
  });
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
