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

  search.addEventListener("submit", handleSearchSubmit);
};

const handleScrollIn = (target) => {
  target.setAttribute("data-focus", "true");
  target.scrollIntoView({ behavior: "smooth", block: "center" });
};

const handleRemoveFocus = () => {
  document
    .querySelectorAll("[data-focus]")
    ?.forEach((node) => node.removeAttribute("data-focus"));
};

const handleHeaderLayout = () => {
  const header = document.querySelector("header.header");
  const headerHeight = header.getBoundingClientRect().height;
  const contentContainer = document.querySelector("#main");

  if (headerHeight > 0) {
    contentContainer.style.marginTop = headerHeight + "px";
  }
};

const handleMessages = ({ type, data, isTrusted }) => {
  if (type === "message" && !!data && isTrusted) {
    handleRemoveFocus()

    let target;

    switch (data.type) {
      case "out":
        handleRemoveFocus();
        break;
      case "section":
        target = document.querySelector(`#main #section-${data.id}`);

        handleScrollIn(target);
        break;
      case "block":
        target = document.querySelector(
          `#main #section-${data.sectionId} #${data.id}`
        );

        handleScrollIn(target);
        break;
      case "footer":
        target = document.querySelector("footer");

        handleScrollIn(target);
        break;
    }
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

window.addEventListener("message", handleMessages);
