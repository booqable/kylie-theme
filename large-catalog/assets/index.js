const initFocalImages = () => {
  document.querySelectorAll(".focal-image").forEach((focalImage) => {
    const x = focalImage.getAttribute("data-focal-x");
    const y = focalImage.getAttribute("data-focal-y");

    new window.imageFocus.FocusedImage(focalImage, {
      focus: {
        x: parseFloat(x) || 0,
        y: parseFloat(y) || 0,
      },
    });
  });
};

const initSearch = () => {
  const search = document.querySelector("#search");
  const queryPlaceholder = document.querySelector("#search__query")
  const url = new URL(window.location.href);
  const input = search.querySelector("input");

  if (!!url.searchParams.get("q")) {
    input.value = url.searchParams.get("q");
    queryPlaceholder.innerHTML = `for "${url.searchParams.get("q")}"`;
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const value = input.value;
    const route = search.getAttribute("action");

    url.href = url.origin + route;
    url.searchParams.set("q", value);

    window.location.href = url.href;
  };

  search.addEventListener("submit", handleSearchSubmit);
};

const handleHeaderLayout = () => {
  const header = document.querySelector("header.header");
  const headerHeight = header.getBoundingClientRect().height;
  const contentContainer = document.querySelector("#main");

  if (headerHeight > 0) {
    contentContainer.style.marginTop = headerHeight + "px";
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // Initializers
  initFocalImages();
  initSearch();

  // Handlers
  handleHeaderLayout();
});

window.addEventListener("resize", () => {
  // Handlers
  handleHeaderLayout();
});
