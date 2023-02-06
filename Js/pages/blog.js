let main = document.querySelector("main");
function post(photo, userName, date, title, description, tags) {
  return `
    <div class="container">
    <div class="blog">
      <div class="blog-image">
      <img src="https://blog-backend.up.railway.app/upload/${photo}" alt="Rasm mavjud emas"/></div>
      </div>
      <div class="blog-info">
        <div class="user-info">
          <span>${userName}</span>
          <p>Posted on &nbsp; ${date}</p>
        </div>
        <div class="blog-title">
          <h1>${title}</h1>
        </div>
        <div class="tags">
          <span>Startup &nbsp; (&nbsp;${tags} &nbsp;)</span>
        </div>
        <div class="post-description">
          <p>
           ${description}
          </p>
        </div>
      </div>
    </div>
  </div>`;
}

let local = localStorage.getItem("CategoryBlog"),
  blog = JSON.parse(local),
  photoId = blog.photo._id;
let photoName = blog.photo.name.split(".").at(-1);
let photo = photoId + "." + photoName,
  tags = blog.tags.join(", "),
  fullName = blog.user.first_name + " " + blog.user.last_name;
let userCreateDate = blog.updatedAt;
let resdate = userCreateDate.split("T")[0];
let date = resdate.replaceAll("-", " ");

const res = post(photo, fullName, date, blog.title, blog.description, tags);
main.innerHTML = res;



