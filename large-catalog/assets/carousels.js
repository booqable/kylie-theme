const scrollToPrev = (inner) => {
  const size = inner.querySelector('.carousel__item').clientWidth;

  inner.scrollTo({
    left: inner.scrollLeft - size,
    behavior: "smooth"
  })
}

const scrollToNext = (inner) => {
  const size = inner.querySelector('.carousel__item').clientWidth;

  inner.scrollTo({
    left: inner.scrollLeft + size,
    behavior: "smooth"
  })
}

const scrollTo = ({ inner, index }) => {
  const size = inner.querySelector('.carousel__item').clientWidth;

  inner.scrollTo({
    left: size * index,
    behavior: "smooth"
  })
}  

const initCarousels = () => {
  if (window.location.href.includes("product")) return;

  document.querySelectorAll(".carousel").forEach((carousel) => {
    const inner = carousel.querySelector(".carousel__inner");
    const prev = carousel.querySelector(".carousel__control.prev");
    const next = carousel.querySelector(".carousel__control.next");

    prev.addEventListener("click", () => scrollToPrev(inner));
    next.addEventListener("click", () => scrollToNext(inner));
  });
};

const initProductGallery = () => {
  if (!window.location.href.includes("product")) return;

  const gallery = document.querySelector(".product-gallery");

  // Main preview
  const previewInner = gallery.querySelector(".product-gallery__preview-inner");
  const previewPrev = gallery.querySelector(".carousel__control.prev");
  const previewNext = gallery.querySelector(".carousel__control.next");

  // Thumbs
  const thumbsInner = gallery.querySelector(".product-gallery__items");
  const thumbs = thumbsInner.querySelectorAll(
    ".product-gallery__item-container img"
  );

  previewPrev.addEventListener('click', () => scrollToPrev(previewInner));
  previewNext.addEventListener('click', () => scrollToNext(previewInner));

  thumbs.forEach((thumb) => {
    thumb.addEventListener('click', (e) => {
      const thumb = e.target.parentElement
      const index = thumb.getAttribute('data-index')
  
      scrollTo({ inner: previewInner, index: parseInt(index) })
    })
  })
};

document.addEventListener("DOMContentLoaded", () => {
  // Initializers
  initCarousels();
  initProductGallery();
});
