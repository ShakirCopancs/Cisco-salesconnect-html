document.querySelectorAll(".accordion-btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    e.stopPropagation();

    const target = document.querySelector(this.dataset.bsTarget);
    const isExpanded = this.getAttribute("aria-expanded") === "true";

    this.classList.toggle("collapsed");
    this.setAttribute("aria-expanded", !isExpanded);

    if (isExpanded) {
      const height = target.scrollHeight;
      target.style.height = height + "px";
      target.classList.add("collapsing");
      target.classList.remove("collapse", "show");

      target.offsetHeight;

      target.style.height = "";

      setTimeout(() => {
        target.classList.remove("collapsing");
        target.classList.add("collapse");
        target.style.height = "";
      }, 350);
    } else {
      target.classList.remove("collapse");
      target.classList.add("collapsing");
      target.style.height = "";

      const height = target.scrollHeight;
      target.style.height = "0px";

      target.offsetHeight;

      target.style.height = height + "px";

      setTimeout(() => {
        target.classList.remove("collapsing");
        target.classList.add("collapse", "show");
        target.style.height = "";
      }, 350);
    }

    const currentAccordion = button.closest(".accordion");
    const siblings = currentAccordion.querySelectorAll(
      ".accordion-collapse.show"
    );

    siblings.forEach((sibling) => {
      if (
        sibling !== target &&
        sibling.closest(".accordion") === currentAccordion
      ) {
        const siblingButton = currentAccordion.querySelector(
          `[data-bs-target="#${sibling.id}"]`
        );
        siblingButton.classList.add("collapsed");
        siblingButton.setAttribute("aria-expanded", "false");

        const height = sibling.scrollHeight;
        sibling.style.height = height + "px";
        sibling.classList.add("collapsing");
        sibling.classList.remove("collapse", "show");

        sibling.offsetHeight;

        sibling.style.height = "";

        setTimeout(() => {
          sibling.classList.remove("collapsing");
          sibling.classList.add("collapse");
          sibling.style.height = "";
        }, 350);
      }
    });
  });
});

// -------------------------------------drawer js -->

const overlay = document.getElementById("ow-overlay-2");
const drawer = document.querySelector(".ea3-preview-drawer");

function openSidebar() {
  document.getElementById("offcanvas-sidebar").style.transform =
    "translateX(0)";
  overlay.style.display = "block";
}

function closeSidebar() {
  document.getElementById("offcanvas-sidebar").style.transform =
    "translateX(100%)";
  overlay.style.display = "none";
  drawer.style.right = "-403px";
}

let activeMenu = null;
let activeButton = null;

function initializeDropdowns() {
  // Move all menus to body immediately
  document.querySelectorAll(".ea3-dropdown-menu").forEach((menu) => {
    document.body.appendChild(menu);
  });

  // Add click handlers to all buttons
  document.querySelectorAll(".ea3-dropdown-btn").forEach((button) => {
    button.addEventListener("click", handleButtonClick);
  });

  // Global click handler
  document.addEventListener("click", handleGlobalClick);

  // Prevent menu clicks from closing
  document.querySelectorAll(".ea3-dropdown-menu").forEach((menu) => {
    menu.addEventListener("click", (e) => e.stopPropagation());
  });
}

function handleButtonClick(event) {
  event.stopPropagation();
  const button = event.target;
  const container = button.closest(".ea3-dropdown");
  const menu = document.querySelector(
    `.ea3-dropdown-menu[data-for="${button.dataset.controls}"]`
  );

  if (!menu) return;

  // If clicking the same button, just toggle
  if (activeButton === button) {
    hideDropdown();
    return;
  }

  // Hide any active dropdown
  hideDropdown();

  // Show new dropdown
  showDropdown(button, menu);
}

function showDropdown(button, menu) {
  const rect = button.getBoundingClientRect();

  menu.style.display = "block";
  menu.style.top = `${rect.bottom + window.scrollY}px`;
  menu.style.left = `${rect.left + window.scrollX}px`;

  activeMenu = menu;
  activeButton = button;
}

function hideDropdown() {
  if (activeMenu) {
    activeMenu.style.display = "none";
    activeMenu = null;
    activeButton = null;
  }
}

function handleGlobalClick(event) {
  if (!event.target.closest(".ea3-dropdown-menu")) {
    hideDropdown();
  }
}

// Initialize dropdowns when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // Add data attributes for association
  document.querySelectorAll(".ea3-dropdown").forEach((container, index) => {
    const button = container.querySelector(".ea3-dropdown-btn");
    const menu = container.querySelector(".ea3-dropdown-menu");
    const id = `dropdown-${index}`;

    button.dataset.controls = id;
    menu.dataset.for = id;
  });

  initializeDropdowns();
});

// ------------------------------------dropdown-position
function showDropdown(button, menu) {
  const rect = button.getBoundingClientRect();

  menu.style.display = "block";
  menu.style.top = `${rect.bottom + window.scrollY}px`;

  if (menu.classList.contains("ea3-dropdown-menu-end")) {
    // Align the dropdown menu to the right end of the button
    menu.style.left = `${rect.right - menu.offsetWidth + window.scrollX}px`;
  } else {
    // Default: Align the dropdown menu to the left of the button
    menu.style.left = `${rect.left + window.scrollX}px`;
  }

  activeMenu = menu;
  activeButton = button;
}

//  -------------------------------------popover js

document.addEventListener("DOMContentLoaded", () => {
  const popover = document.getElementById("popover");
  const targets = document.querySelectorAll(".targetElement");
  const showPopover = (event) => {
    event.stopPropagation();
    const target = event.currentTarget;
    const content = target.getAttribute("data-popover-content");
    popover.innerHTML = content;
    popover.style.display = "block";
    const { left, bottom } = target.getBoundingClientRect();
    popover.style.left = `${left + window.scrollX}px`;
    popover.style.top = `${bottom + window.scrollY}px`;
    popover.offsetHeight;
    popover.style.opacity = "1";
    document.activeElement = target;
  };
  const hidePopover = () => {
    popover.style.opacity = "0";
    setTimeout(() => {
      if (popover.style.opacity === "0") {
        popover.style.display = "none";
      }
    }, 300);
  };
  targets.forEach((target) => target.addEventListener("click", showPopover));
  document.addEventListener("click", (event) => {
    if (
      !popover.contains(event.target) &&
      !Array.from(targets).some((target) => target.contains(event.target))
    ) {
      hidePopover();
    }
  });
});
