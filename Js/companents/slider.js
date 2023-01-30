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
