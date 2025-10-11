// Error handling for extensions
window.addEventListener("error", function (e) {
  if (e.message.includes("language") || e.message.includes("Grammarly")) {
    console.log("Browser extension error detected - ignoring");
    e.preventDefault();
    return true;
  }
});

// Check if CSS is loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded - checking styles");

  // Test if CSS variables are working
  const rootStyles = getComputedStyle(document.documentElement);
  const primaryColor = rootStyles.getPropertyValue("--primary").trim();

  if (!primaryColor) {
    console.error("CSS variables not loading - check fonts.css");
    // Apply emergency styles
    document.body.style.backgroundColor = "#FFF8F0";
    document.body.style.color = "#2D3436";
    document.body.style.fontFamily = "system-ui, sans-serif";
  }
});

// Theme Toggle
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector("i");

// Check for saved theme or prefer-color-scheme
const savedTheme =
  localStorage.getItem("theme") ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light");

// Apply the saved theme
document.documentElement.setAttribute("data-theme", savedTheme);
updateThemeIcon(savedTheme);

// Toggle theme on button click
themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  if (theme === "dark") {
    themeIcon.className = "fas fa-sun";
  } else {
    themeIcon.className = "fas fa-moon";
  }
}

// Mobile Navigation Toggle
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    // Animate hamburger icon
    const spans = navToggle.querySelectorAll("span");
    spans.forEach((span) => span.classList.toggle("active"));
  });
}

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

// Update active nav link based on current page
function setActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop() || "home.html";
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach((link) => {
    const linkHref = link.getAttribute("href").split("/").pop();
    if (
      linkHref === currentPage ||
      (currentPage === "" && linkHref === "home.html")
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  setActiveNavLink();
  initializeSkillBars();
});

// Initialize skill bars animation
function initializeSkillBars() {
  const skillProgresses = document.querySelectorAll(".skill-progress");

  skillProgresses.forEach((progress) => {
    const progressValue = progress.getAttribute("data-progress");
    progress.style.width = `${progressValue}%`;
  });
}
