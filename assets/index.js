let focalImageTimeout;
let previewBarTimeout;
let tryCount = 0;

const initFocalImages = () => {
  if (!window.imageFocus) {
    if (focalImageTimeout) clearTimeout(focalImageTimeout);

    focalImageTimeout = setTimeout(() => {
      initFocalImages();
    }, 10);

    return;
  }

  clearTimeout(focalImageTimeout);

  document.querySelectorAll(".focal-image").forEach((focalImage) => {
    const x = focalImage.getAttribute("data-focal-x");
    const y = focalImage.getAttribute("data-focal-y");

    new window.imageFocus(focalImage, {
      focus: {
        x: parseFloat(x) || 0,
        y: parseFloat(y) || 0,
      },
    });

    focalImage.style.opacity = 1;
  });
};

const initSearch = () => {
  const searchForm = document.querySelector("#search");
  const url = new URL(window.location.href);
  const input = searchForm.querySelector("input");

  if (!!url.searchParams.get("q")) {
    input.value = url.searchParams.get("q");
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const value = input.value;
    const route = search.getAttribute("action");

    url.href = url.origin + route;
    url.searchParams.set("q", value);

    window.location.href = url.href;
  };

  searchForm.addEventListener("submit", handleSearchSubmit);
};

const handleSetMobileMenuHeight = () => {
  const menu = document.querySelector(".header-floating-menu__wrapper");

  if (window.innerWidth > 762 || !menu) return;

  let totalHeight = 0;

  const previewBar = document.querySelector(".preview-bar__container");

  if (!previewBar && tryCount < 5) {
    tryCount += 1;

    if (previewBarTimeout) clearTimeout(previewBarTimeout);

    previewBarTimeout = setTimeout(() => {
      handleSetMobileMenuHeight();
    }, 100);

    return;
  }

  const header = document.querySelector(".header__wrapper");

  totalHeight =
    header.getBoundingClientRect().height +
    (previewBar?.getBoundingClientRect().height ?? 0);

  menu.style.height = `calc(100vh - ${totalHeight}px)`;
};

const handleScroll = () => {
  const previewBar = document.querySelector(".preview-bar__container");

  const header = document.querySelector("header");
  const contentContainer = document.querySelector("#main");

  let headerHeight = header.getBoundingClientRect().height;

  if (window.scrollY > 0) {
    if (previewBar) {
      headerHeight += previewBar.getBoundingClientRect().height;
    }

    header.classList.add("fixed");
    contentContainer.style.marginTop = `${headerHeight}px`;
  }

  if (window.scrollY === 0) {
    header.classList.remove("fixed");
    contentContainer.style.marginTop = 0;
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // Initializers
  initSearch();
  handleSetMobileMenuHeight();
});

window.addEventListener("load", initFocalImages);

window.addEventListener("resize", () => {
  handleSetMobileMenuHeight();
});

window.addEventListener("scroll", handleScroll);
