const homeBtn = document.querySelector(".home-button"),
  mainWord = document.querySelector(".main-section"),
  blogsPopular = document.querySelector(".glider"),
  previous = document.getElementById("previous"),
  next = document.getElementById("next");

const INPOINT =
  "https://63d25c4106556a0fdd3a2cd7.mockapi.io/Exaplecategories/1/";

function request(url, options) {
  return fetch(INPOINT + url, options);
}

function main(title, mainWord, date, discription) {
  return `
  <div class="main-image">
    <img src="./Image/main.png  "/></div>
      <div class="container">
    <div class="main-word"><div class="main-title">
      <span>${title}</span>  <h1>${mainWord}</h1></div>
    <div class="main-word-date">  <span>By</span><span style="color: #ffd050"> James West </span>
      <span>&nbsp;|&nbsp; ${date}</span></div>
   <div class="main-discription"><p>
    ${discription}</p></div><div class="main-button">
    <button onclick=readMore() >Read More ></button>
  </div> </div></div>`;
}

function mainDate() {
  request("Main")
    .then((res) => res)
    .then((res) => res.json())
    .then((res) => {
      let data = JSON.stringify(res);
      localStorage.setItem("date", data);
      let localData = localStorage.getItem("date");
      let localOBj = JSON.parse(localData);
      localOBj.map((data) => {
        mainWord.innerHTML = main(
          data.title,
          data.mainWord,
          data.date,
          data.discription
        );
      });
    });
}
mainDate();

function readMore() {
  this.addEventListener("click", () => {
    location.href = "category.html";
  });
}

function popularBlogs() {
  return `
  <div class="card">
  <div class="blogs-box"><div class="blogs-image">
    <img src="/Image/blogs-1.png" /></div><div class="user-blogs-info">
    <span>By <a href="#" class="user-name">John Doe</a></span> <span>| Aug 23, 2021</span></div>
    <div class="blogs-info"><span>A UX Case Study Creating a Studious Environment for
      Students:</span></div>
    <div class="blogs-discription"><p>
      Duis aute irure dolor in reprehenderit in voluptate velit
      esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
      occaecat cupidatat non proident.</p></div></div>
</div>
  `;
}

for (let i = 0; i <= 70; i++) {
  blogsPopular.innerHTML += popularBlogs();
}
// Glider Configuration
