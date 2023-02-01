new Glider(document.querySelector(".glider"), {
  slidesToShow: 1.5,
  slidesToScroll: 1,
  draggable: true,
  loop: true,
  responsive: [
    {
      // If Screen Size More than 768px
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        duration: 0.5,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        duration: 0.5,
      },
    },
    {
      breakpoint: 655,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 175,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
});

const homeBtn = document.querySelector(".home-button"),
  mainWord = document.querySelector(".main-section"),
  blogsPopular = document.querySelector(".glider"),
  previous = document.getElementById("previous"),
  next = document.getElementById("next");

function main(userName, photo, title, date, description) {
  return `
  <div class="main-image">
    <img src="http://localhost:5000/upload/${photo} "/></div>
      <div class="container">
    <div class="main-word"><div class="main-title">
      <span>Posted on startup</span>  <h1>${title}</h1></div>
    <div class="main-word-date">  <span>By</span>&nbsp;&nbsp;<span ><span style="color: #ffd050;cursor:pointer;" onclick=category()>${userName}</span> </span>
      <span>&nbsp;|&nbsp; ${date}</span></div>
   <div class="main-discription"><p>
    ${description}</p></div><div class="main-button">
    <button onclick=category() ><a style="color:rgba(35, 37, 54, 1);" href="#">Read More</a> ></button>
  </div> </div></div>`;
}

request.get("post/lastone").then((res) => {
  let photoId = res.data.photo._id,
    photoName = res.data.photo.name.split(".").at(-1),
    photo = photoId + "." + photoName;
  let userCreateDate = res.data.updatedAt;
  let resdate = userCreateDate.split("T")[0];
  let date = resdate.replaceAll("-", " ");
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
    location.href = "./blog-post.html";
  });
}

// function mainDate() {
//   request("Main")
//     .then((res) => res)
//     .then((res) => res.json())
//     .then((res) => {
//       let data = JSON.stringify(res);
//       localStorage.setItem("date", data);
//       let localData = localStorage.getItem("date");
//       let localOBj = JSON.parse(localData);
//       localOBj.map((data) => {
//         mainWord.innerHTML = main(
//           data.title,
//           data.date,
//           data.discription,
//           data.userLink,
//           data.userLink
//         );
//       });
//     });
// }
// mainDate();
function popularBlogs(name, date, title, discription) {
  return `
  <div class="card">
  <div class="blogs-box"><div class="blogs-image">
    <img src="/Image/blogs-1.png" /></div><div class="user-blogs-info">
    <span>By <a href="#" class="user-name">${name}</a></span> <span>| ${date}</span></div>
    <div class="blogs-info"><span>${title}</span></div>
    <div class="blogs-discription"><p>${discription}</p></div></div>
</div>
  `;
}

// Glider Configuration
