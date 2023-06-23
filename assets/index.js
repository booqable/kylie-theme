let timeout

const initFocalImages = () => {
  if (!window.imageFocus) {
    if (timeout) clearTimeout(timeout)

    timeout = setTimeout(() => {
      initFocalImages();
    }, 10);

    return;
  }

  clearTimeout(timeout)

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
  target?.setAttribute("data-focus", "true");
  target?.scrollIntoView({ behavior: "smooth", block: "center" });
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

const handleRemoveFocus = () => {
  document
    .querySelectorAll("[data-focus]")
    ?.forEach((node) => node.removeAttribute("data-focus"));
};

const handleMessages = ({ type, data, isTrusted }) => {
  if (type === "message" && !!data && isTrusted) {
    handleRemoveFocus();

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
          `#section-${data.sectionId} #${data.id}`
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
  initSearch();
  initFocalImages();
});

document.addEventListener("image-focus:load", () => {
  initFocalImages();
});

window.addEventListener("scroll", handleScroll);
window.addEventListener("message", handleMessages);
