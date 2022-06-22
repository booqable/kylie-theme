const initCarousels = () => {
  document.querySelectorAll(".bq-carousel").forEach((carousel) => {
    const inner = carousel.querySelector(".bq-carousel__inner");
    const prev = carousel.querySelector(".bq-carousel__prev");
    const next = carousel.querySelector(".bq-carousel__next");

    new Glider(inner, {
      slidesToShow: "auto",
      slidesToScroll: 1,
      scrollLock: true,
      itemWidth: 280,
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
          },
        },
      ],
    });
  });
};

const initProductGallery = () => {
  if (!window.location.href.includes("product")) return;

  const gallery = document.querySelector(".product-gallery");
  const preview = gallery.querySelector(".product-gallery__preview-inner");
  const thumbsContainer = gallery.querySelector(".product-gallery__items");
  const thumbs = thumbsContainer.querySelectorAll(
    ".product-gallery__item-container"
  );

  const previewGlider = new Glider(preview, {
    slidesToShow: 1,
    slidesToScroll: 1,
    scrollLock: true,
    arrows: {
      prev: gallery.querySelector('.product-gallery__prev'),
      next: gallery.querySelector('.product-gallery__next'),
    },
  });
  
  // Thumbs gallery
  new Glider(thumbsContainer, {
    slidesToShow: "auto",
    exactWidth: true,
    itemWidth: 72,
    slidesToScroll: 1,
    scrollLock: true
  });

  thumbs.forEach((thumb) => {
    thumb.addEventListener('click', (e) => {
      const thumb = e.target.parentElement
      const index = thumb.getAttribute('data-gslide')
  
      previewGlider.scrollItem(parseInt(index), true)
    })
  })
};

document.addEventListener("DOMContentLoaded", () => {
  // Initializers
  initCarousels();
  initProductGallery();
});
