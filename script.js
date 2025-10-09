// Theme Toggle
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector("i");

// Check for saved theme preference or respect OS preference
if (
  localStorage.getItem("theme") === "dark" ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches &&
    !localStorage.getItem("theme"))
) {
  document.body.classList.add("dark-mode");
  themeIcon.classList.remove("fa-moon");
  themeIcon.classList.add("fa-sun");
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
    localStorage.setItem("theme", "dark");
  } else {
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
    localStorage.setItem("theme", "light");
  }
});

// Fade-in on Scroll
const fadeElements = document.querySelectorAll(".fade-in");

const fadeInOnScroll = () => {
  fadeElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("visible");
    }
  });
};

window.addEventListener("scroll", fadeInOnScroll);
// Initial check
fadeInOnScroll();

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navLinksContainer = document.querySelector(".nav-links");

// Navigation with sliding underline effect and page transitions
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const nav = document.querySelector('.nav-links');
    let isNavigating = false;
    let currentPageIndex = 0;
    
    // Set initial current page index
    const currentPath = window.location.pathname;
    navLinks.forEach((link, index) => {
        const linkHref = link.getAttribute('href');
        // Handle home page (empty path or '/')
        if ((currentPath === '/' || currentPath === '') && (linkHref === '/' || linkHref === '/index.html' || linkHref === 'index.html')) {
            currentPageIndex = index;
            link.classList.add('active');
        } 
        // Handle other pages
        else if (currentPath === linkHref || (currentPath + '.html' === linkHref)) {
            currentPageIndex = index;
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Create and append the indicator element
    let indicator = document.querySelector('.nav-active-indicator');
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.className = 'nav-active-indicator';
        nav.appendChild(indicator);
    }
    
    function updateIndicatorPosition(link) {
        if (!link) return;
        
        const linkRect = link.getBoundingClientRect();
        const navRect = nav.getBoundingClientRect();
        
        indicator.style.width = `${linkRect.width}px`;
        indicator.style.left = `${linkRect.left - navRect.left}px`;
        indicator.style.opacity = '1';
    }
    
    // Set initial indicator position
    const activeLink = document.querySelector('.nav-links a.active');
    if (activeLink) {
        updateIndicatorPosition(activeLink);
    }
    
    // Update indicator on window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const currentActive = document.querySelector('.nav-links a.active');
            if (currentActive) {
                updateIndicatorPosition(currentActive);
            }
        }, 100);
    });
    
    // Handle navigation clicks
    navLinks.forEach((link, nextIndex) => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const currentPath = window.location.pathname.split('/').pop() || 'index.html';
            
            // Don't do anything if clicking the current page link
            if (href === currentPath || 
                (currentPath === '/' && (href === '/index.html' || href === 'index.html')) ||
                (currentPath + '.html' === href)) {
                e.preventDefault();
                return;
            }
            
            e.preventDefault();
            if (isNavigating) return;
            isNavigating = true;
            
            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Update indicator position with smooth transition
            updateIndicatorPosition(this);
            
            // Determine direction
            const direction = nextIndex > currentPageIndex ? 'right' : 'left';
            currentPageIndex = nextIndex;
            
            // Add transitioning class to body
            document.body.classList.add('transitioning');
            
            // Add slide-out class to current content
            const mainContent = document.querySelector('main');
            if (mainContent) {
                mainContent.classList.add(direction === 'right' ? 'slide-out-left' : 'slide-out-right');
            }
            
            // Add slide-in class to body for next page
            document.body.classList.add(direction === 'right' ? 'slide-in-left' : 'slide-in-right');
            
            // Navigate after animation completes
            setTimeout(() => {
                window.location.href = href;
            }, 300);
        });
    });
    
    // Handle page load and page show events
    function handlePageLoad() {
        // Remove transitioning classes
        document.body.classList.remove('transitioning', 'slide-in-left', 'slide-in-right');
        
        // Reset main content styles
        const mainContent = document.querySelector('main');
        if (mainContent) {
            mainContent.classList.remove('slide-out-left', 'slide-out-right');
            mainContent.style.opacity = '1';
        }
        
        // Update active state based on current URL
        const currentPath = window.location.pathname;
        navLinks.forEach((link, index) => {
            const linkHref = link.getAttribute('href');
            // Handle home page (empty path or '/')
            if ((currentPath === '/' || currentPath === '') && (linkHref === '/' || linkHref === '/index.html' || linkHref === 'index.html')) {
                currentPageIndex = index;
                link.classList.add('active');
                updateIndicatorPosition(link);
            } 
            // Handle other pages
            else if (currentPath === linkHref || (currentPath + '.html' === linkHref)) {
                currentPageIndex = index;
                link.classList.add('active');
                updateIndicatorPosition(link);
            } else {
                link.classList.remove('active');
            }
        });
        
        isNavigating = false;
    }
    
    // Run on initial page load
    if (document.readyState === 'complete') {
        handlePageLoad();
    } else {
        window.addEventListener('load', handlePageLoad);
    }
    
    // Also run when navigating back/forward
    window.addEventListener('pageshow', handlePageLoad);
}

// Initialize mobile menu and navigation
if (mobileMenuBtn && navLinksContainer) {
    // Toggle mobile menu
    mobileMenuBtn.addEventListener("click", () => {
        navLinksContainer.classList.toggle("active");
        mobileMenuBtn.setAttribute(
            "aria-expanded",
            mobileMenuBtn.getAttribute("aria-expanded") === "true" ? "false" : "true"
        );
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll(".nav-links a").forEach((link) => {
        link.addEventListener("click", () => {
            if (navLinksContainer.classList.contains("active")) {
                navLinksContainer.classList.remove("active");
                mobileMenuBtn.setAttribute("aria-expanded", "false");
            }
        });
    });

    // Initialize navigation with sliding indicator
    initNavigation();
}

// Parallax Effect
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(".parallax");

  parallaxElements.forEach((element) => {
    const speed = 0.5;
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });

  const shapes = document.querySelectorAll(".shape");
  shapes.forEach((shape, index) => {
    const speed = 0.1 + index * 0.05;
    shape.style.transform = `translateY(${scrolled * speed}px) rotate(${
      scrolled * 0.02
    }deg)`;
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerHeight = document.querySelector("header").offsetHeight;
      const targetPosition =
        targetElement.getBoundingClientRect().top +
        window.pageYOffset -
        headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Active navigation link highlighting
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

const highlightNavLink = () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    const headerHeight = document.querySelector("header").offsetHeight;

    if (scrollY >= sectionTop - headerHeight - 50) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
};

window.addEventListener("scroll", highlightNavLink);

// Form handling (for newsletter)
const newsletterForm = document.querySelector(".newsletter-form");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;

    // In a real application, you would send this to your backend
    console.log("Newsletter subscription:", email);

    // Show success message
    alert("Thank you for subscribing to our newsletter!");
    newsletterForm.reset();
  });
}

// Loading state simulation
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// Skill bar animation
const animateSkillBars = () => {
  const skillBars = document.querySelectorAll(".skill-level, .level-bar");

  skillBars.forEach((bar) => {
    const width = bar.style.width;
    bar.style.width = "0";

    setTimeout(() => {
      bar.style.width = width;
    }, 500);
  });
};

// Animate skill bars when they come into view
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateSkillBars();
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

document
  .querySelectorAll(".skills-container, .skills-summary")
  .forEach((section) => {
    skillObserver.observe(section);
  });

// 3D card tilt effect
const projectCards = document.querySelectorAll(".project-card:not(.minimal)");

projectCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const cardRect = card.getBoundingClientRect();
    const cardWidth = cardRect.width;
    const cardHeight = cardRect.height;
    const centerX = cardRect.left + cardWidth / 2;
    const centerY = cardRect.top + cardHeight / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rotateX = (mouseY / cardHeight) * 10;
    const rotateY = (mouseX / cardWidth) * -10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) translateY(-10px)";
  });
});

// Add some interactive elements to the floating shapes
const shapes = document.querySelectorAll(".shape");
shapes.forEach((shape) => {
  shape.addEventListener("mouseenter", () => {
    shape.style.opacity = "0.3";
  });

  shape.addEventListener("mouseleave", () => {
    shape.style.opacity = "0.1";
  });
});

// Add a simple typing effect to the hero section
const heroText = document.querySelector(".hero h1");
if (heroText) {
  const originalText = heroText.textContent;
  heroText.textContent = "";

  let i = 0;
  const typeWriter = () => {
    if (i < originalText.length) {
      heroText.textContent += originalText.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  };

  // Start typing effect after a short delay
  setTimeout(typeWriter, 1000);
}

// Add a scroll to top button
const scrollToTopBtn = document.createElement("button");
scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
scrollToTopBtn.classList.add("scroll-to-top");
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background-color: var(--primary);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2rem;
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    transition: var(--transition);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

scrollToTopBtn.addEventListener("mouseenter", () => {
  scrollToTopBtn.style.transform = "translateY(-3px)";
  scrollToTopBtn.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.3)";
});

scrollToTopBtn.addEventListener("mouseleave", () => {
  scrollToTopBtn.style.transform = "translateY(0)";
  scrollToTopBtn.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.2)";
});

document.body.appendChild(scrollToTopBtn);

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.style.display = "flex";
  } else {
    scrollToTopBtn.style.display = "none";
  }
});

// Add some console art for fun
console.log(
  `
%cTaafeef Portfolio Website
%cDesigned and developed by Taafeef Bin Montaquim
%chttps://github.com/AverageTaaf

`,
  "color: #FF6B35; font-size: 18px; font-weight: bold;",
  "color: #666; font-size: 12px;",
  "color: #999; font-size: 10px;"
);
