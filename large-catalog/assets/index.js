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
  const url = new URL(window.location.href);
  const input = search.querySelector("input");

  if (url.searchParams.get("q")) {
    input.value = url.searchParams.get("q");
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const value = input.value;

    url.href = `${url.origin}/search${url.search}`;
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

window.addEventListener('resize', () => {
  // Handlers
  handleHeaderLayout();
})
