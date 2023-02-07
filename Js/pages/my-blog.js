let myPost = document.querySelector(".my-post-title"),
  add = document.getElementById("add"),
  TOKEN = localStorage.getItem("PORTFOLIO_TOKEN");
function addPost() {
  return `
    <div class="add-posts">
    <button  class="btn btn-primary ms-4"
    type="button"
    data-bs-toggle="modal"
    data-bs-target="#staticBackdrop">Add posts</button></div>`;
}
if (!TOKEN) {
  document.body.innerHTML = "";
  location.href = "Login.html";
} else {
  document.body.innerHTML;
  myPost.innerHTML += addPost();
}

// function getPost(photo, title, name, discription) {
//   return ` <div class="user-post-box">
//     <div class="post-left"> <img src="https://blog-backend.up.railway.app/upload/${photo} "/>
//     </div>  <div class="post-right"> <div class="post-info">
//     <span>BUSINESS</span><span><img src="./Image/edit.png" style="width: 25px;float: right;"></span>
//     <span><img src="./Image/delete.png" style="width: 25px;margin-right: 25px; float: right;" alt=""></span>
//     <h1>Step-by-step guide to choosing great font pairs</h1><p>
//       Lorem ipsum dolor sit amet, consectetur adipiscing elit,
//       sed do eiusmod tempor incididunt ut labore et dolore
//       magna aliqua. Non blandit massa enim nec.
//     </p></div></div></div>`;
// }

// request.get("").then((res) => {
//   console.log(res.data);
// });

backend.get("/post/login").then((res) => {
  console.log(res.data.data);
});
