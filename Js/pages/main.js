const homeBtn = document.querySelector(".home-button"),
  mainWord = document.querySelector(".main-section"),
  popular = document.querySelector(".popular-blogs");

function main(userName, photo, title, date, description) {
  return `
  <div class="main-image">
  <img src="https://blog-backend.up.railway.app/upload/${photo} "/></div>
      <div class="container">
    <div class="main-word"><div class="main-title">
      <span>Posted on startup</span>  <h1>${title}</h1></div>
    <div class="main-word-date">  <span>By</span>&nbsp;&nbsp;<span ><a href="./blog-post.html" style="color: #ffd050;">${userName}</a> </span>
      <span>&nbsp;|&nbsp; ${date}</span></div>
   <div class="main-discription"><p>
    ${description}</p></div><div class="main-button">
    <a style="color:rgba(35, 37, 54, 1);" href="./blog-post.html" ><button >Read More</button></a> 
  </div> </div></div>`;
}

request.get("post/lastone").then((res) => {
  let photoId = res.data.photo._id,
    photoName = res.data.photo.name.split(".").at(-1),
    photo = photoId + "." + photoName;
  let userCreateDate = res.data.updatedAt;
  let resdate = userCreateDate.split("T")[0];
  let date = resdate.replaceAll("-", ", ");
  let result = main(
    res.data.user.first_name,
    photo,
    res.data.title,
    date,
    res.data.description
  );
  mainWord.innerHTML = result;
});

function category() {
  request.get("post/lastone").then((res) => {
    let blogPost = JSON.stringify(res.data);
    localStorage.setItem("BLOG_POST", blogPost);
  });
}
category();

{
  /* <img src="https://blog-backend.up.railway.app/upload/${photo} "/> */
}
function popularBlogs(photo, name, date, title, discription) {
  return `
  <div class="card"><div class="blogs-box">
  <div class="blogs-image">
  <img src="./Image/main.png" />
  </div><div class="user-blogs-info"><span>By <a href="#" class="user-name">
  ${name}</a></span> <span>${date}</span></div>
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
request.get("post/lastones").then((res) => {
  let arr = Object.entries(res.data);
  let resSlice = arr.slice(-3);
  resSlice.map((e) => {
    let data = e[1],
      fullName = data.user.first_name + " " + data.user.last_name;
    (photoId = data.photo._id),
      (photoName = data.photo.name.split(".").at(-1)),
      (photo = photoId + "." + photoName),
      (userCreateDate = data.updatedAt),
      (resdate = userCreateDate.split("T")[0]),
      (date = resdate.replaceAll("-", ", ")),
      (result = popularBlogs(
        photo,
        fullName,
        date,
        data.title,
        data.description
      ));
    popular.innerHTML += result;
  });
});

// function startup() {
//   request.get("category").then((res) => {
//     console.log(res.data);
//   });
// }
