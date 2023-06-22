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
  if (e.target.tagName !== "INPUT" && e.target.type !== "checkbox") return;

  if (e.target.hasAttribute("data-toggle")) {
    // Target is the same, so we are collapsing menu and not re-assigning target
    if (target === e.target) {
      handleCollapseMenus();
      return;
    }

    // Target is different, so we are collapsing previous menu and re-assigning target
    if (target) {
      handleCollapseMenus();
    }

    target = e.target;
    menu = e.target.parentNode.querySelector(".header__nav-submenu");
  }

  if (!target?.contains(e.target) && !menu?.contains(e.target)) {
    handleCollapseMenus();
  }
};

document.addEventListener("click", handleMenuClicks);

addEventListener("beforeunload", handleCollapseMenus);
