let target;
let menu;

const handleCollapseMenus = () => {
  if (target) {
    target.checked = false;

    menu.querySelectorAll('input[type="checkbox"]').forEach((toggle) => {
      toggle.checked = false;
    });

    target = null;
    menu = null;
  }
};

const handleMenuClicks = (e) => {
  if (e.target.tagName === "LABEL") return;

  if (e.target.type === "checkbox" && e.target.hasAttribute("data-toggle")) {
    if (target || menu) {
      handleCollapseMenus();
    } else {
      target = e.target;
      menu = e.target.parentNode.querySelector(".header__nav-submenu");
    }
  }

  if (target && !target?.contains(e.target) && !menu?.contains(e.target)) {
    handleCollapseMenus();
  }
};

document.addEventListener("click", handleMenuClicks);

addEventListener("beforeunload", handleCollapseMenus);
