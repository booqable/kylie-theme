window.addEventListener("load", () => {
  document.querySelectorAll(".bq-carousel").forEach((carousel) => {
    const inner = carousel.querySelector(".bq-carousel__inner");
    const prev = carousel.querySelector(".bq-carousel__prev");
    const next = carousel.querySelector(".bq-carousel__next");

    new Glider(inner, {
      slidesToShow: "auto",
      slidesToScroll: 1,
      scrollLock: true,
      itemWidth: 212,
      exactWidth: true,
      arrows: {
        prev,
        next,
      },
      responsive: [
        {
          breakpoint: 810,
          settings: {
            slidesToShow: "auto",
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 2,
            itemWidth: 312,
          },
        },
      ],
    });
  });

  const hideFFScrollBars = (e) => {
    var scrollbarHeight = 17;
    if (/firefox/i.test(navigator.userAgent)) {
      if (window.innerWidth > 575) {
        e.target.parentNode.style.height =
          e.target.offsetHeight - scrollbarHeight + "px";
      }
    }
  };

  // Firefox hide scrollbar workaround
  document.addEventListener("glider-loaded", hideFFScrollBars);
  document.addEventListener("glider-refresh", hideFFScrollBars);
});
