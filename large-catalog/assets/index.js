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

  // Handlers
  handleHeaderLayout();
});
