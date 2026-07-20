const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const menuContent = mobileMenu?.querySelector("nav");
const menuIcon = document.getElementById("menu-icon");
const closeIcon = document.getElementById("close-icon");

// Function to close menu (DRY)
function closeMenu() {
  mobileMenu?.classList.add("opacity-0", "pointer-events-none");
  menuContent?.classList.add("translate-y-[-20px]");
  menuIcon?.classList.remove("opacity-0", "pointer-events-none");
  closeIcon?.classList.add("opacity-0", "pointer-events-none");
  mobileMenuBtn?.setAttribute("aria-expanded", "false");
  // Return focus to button
  mobileMenuBtn?.focus();
}

mobileMenuBtn?.addEventListener("click", () => {
  const isOpen = !mobileMenu?.classList.contains("pointer-events-none");

  if (isOpen) {
    closeMenu();
  } else {
    // Open menu
    mobileMenu?.classList.remove("opacity-0", "pointer-events-none");
    menuContent?.classList.remove("translate-y-[-20px]");
    menuIcon?.classList.add("opacity-0", "pointer-events-none");
    closeIcon?.classList.remove("opacity-0", "pointer-events-none");
    mobileMenuBtn?.setAttribute("aria-expanded", "true");

    // Focus first link in menu
    const firstLink = mobileMenu?.querySelector("a");
    firstLink?.focus();
  }
});

// Close menu when clicking outside
mobileMenu?.addEventListener("click", (e) => {
  if (e.target === mobileMenu) {
    closeMenu();
  }
});

// Close menu on Escape key
mobileMenu?.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeMenu();
  }
});

// Focus trap inside menu
mobileMenu?.addEventListener("keydown", (e) => {
  if (e.key !== "Tab") return;

  const focusableElements = mobileMenu?.querySelectorAll(
    "a[href], button:not([disabled])",
  );
  const firstElement = focusableElements?.[0] as HTMLElement;
  const lastElement = focusableElements?.[
    focusableElements.length - 1
  ] as HTMLElement;

  if (e.shiftKey && document.activeElement === firstElement) {
    e.preventDefault();
    lastElement?.focus();
  } else if (!e.shiftKey && document.activeElement === lastElement) {
    e.preventDefault();
    firstElement?.focus();
  }
});

// Close menu on navigation
mobileMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    closeMenu();
  });
});

export {};
