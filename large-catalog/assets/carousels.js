const scrollToPrev = ({ inner, controls }) => {
  const size = inner.querySelector(".carousel__item").clientWidth;
  const withInfiniteScroll = inner.classList.contains("infinite-scroll");

  inner.scrollTo({
    left: inner.scrollLeft - size,
    behavior: "smooth",
  });

  if (!withInfiniteScroll) {
    if (inner.scrollLeft - size <= 0) {
      controls.prev.classList.add("hidden");
    }

    controls.next.classList.remove("hidden");
  }

  if (withInfiniteScroll && inner.scrollLeft === 0) {
    inner.scrollTo({
      left: inner.scrollWidth,
      behavior: "smooth",
    });
  }
};

const scrollToNext = ({ inner, controls }) => {
  const size = inner.querySelector(".carousel__item").clientWidth;
  const withInfiniteScroll = inner.classList.contains("infinite-scroll");

  inner.scrollTo({
    left: inner.scrollLeft + size,
    behavior: "smooth",
  });

  if (!withInfiniteScroll) {
    if (inner.scrollLeft >= inner.scrollWidth - inner.clientWidth - size) {
      controls.next.classList.add("hidden");
    }

    controls.prev.classList.remove("hidden");
  }

  if (
    withInfiniteScroll &&
    inner.scrollLeft >= inner.scrollWidth - inner.clientWidth
  ) {
    inner.scrollTo({
      left: 0,
      behavior: "smooth",
    });
  }
};

const scrollTo = ({ inner, index }) => {
  const size = inner.querySelector(".carousel__item").clientWidth;

  inner.scrollTo({
    left: size * index,
    behavior: "smooth",
  });
};

const initCarousels = () => {
  if (window.location.href.includes("product")) return;

  document.querySelectorAll(".carousel").forEach((carousel) => {
    const inner = carousel.querySelector(".carousel__inner");
    const innerWidth = inner.clientWidth;
    const itemCount = inner.querySelectorAll(".carousel__item")?.length || 0;
    const itemSize = inner.querySelector(".carousel__item")?.clientWidth || 0;

    const prev = carousel.querySelector(".carousel__control.prev");
    const next = carousel.querySelector(".carousel__control.next");

    if (innerWidth >= itemSize * itemCount) {
      prev.classList.add("hidden");
      next.classList.add("hidden");
    }

    if (innerWidth < itemSize * itemCount) {
      prev.classList.remove("hidden");
      next.classList.remove("hidden");
    }

    prev.classList.add("hidden");

    prev.addEventListener("click", () =>
      scrollToPrev({ inner, controls: { prev, next } })
    );
    next.addEventListener("click", () =>
      scrollToNext({ inner, controls: { prev, next } })
    );
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
  const thumbsInner = gallery.querySelector(
    ".product-gallery__items .carousel__inner"
  );
  const thumbs = thumbsInner.querySelectorAll(
    ".product-gallery__item-container img"
  );

  if (previewPrev && previewNext) {
    previewPrev.addEventListener("click", () =>
      scrollToPrev({
        inner: previewInner,
        controls: { prev: previewPrev, next: previewNext },
      })
    );
    previewNext.addEventListener("click", () =>
      scrollToNext({
        inner: previewInner,
        controls: { prev: previewPrev, next: previewNext },
      })
    );
  }

  if (thumbs) {
    thumbs.forEach((thumb) => {
      thumb.addEventListener("click", (e) => {
        const thumb = e.target.parentElement;
        const index = parseInt(thumb.getAttribute("data-index"));

        scrollTo({ inner: previewInner, index });
      });
    });
  }
};

const handleWindowResize = () => {
  if (window.location.href.includes("product")) return;

  document.querySelectorAll(".carousel").forEach((carousel) => {
    const inner = carousel.querySelector(".carousel__inner");
    const innerWidth = inner.clientWidth;
    const itemCount = inner.querySelectorAll(".carousel__item")?.length || 0;
    const itemSize = inner.querySelector(".carousel__item")?.clientWidth || 0;

    const prev = carousel.querySelector(".carousel__control.prev");
    const next = carousel.querySelector(".carousel__control.next");

    if (innerWidth >= itemSize * itemCount) {
      prev.classList.add("hidden");
      next.classList.add("hidden");
    }

    if (innerWidth < itemSize * itemCount) {
      prev.classList.remove("hidden");
      next.classList.remove("hidden");
    }

    if (inner.scrollLeft === 0) {
      prev.classList.add("hidden");
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  // Initializers
  initCarousels();
  initProductGallery();
});

window.addEventListener("resize", handleWindowResize);
