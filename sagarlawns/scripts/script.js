const toggleBtn = document.querySelector(".toggle-button");
const dropdownMenu = document.querySelector(".dropdown-menu");
const toggleIcon = document.querySelector(".toggle-icon");
const overlay = document.querySelector(".overlay-bg");
const overlayText = document.querySelector(".overlay-text");

const blurBg = "blur-sm";

function toggleNavbar() {
  dropdownMenu.classList.toggle("top-16");
  overlayText.classList.toggle(blurBg);
  overlay.classList.toggle(blurBg);
  toggleIcon.classList.toggle("fa-bars");
  toggleIcon.classList.toggle("fa-xmark");
}

if (toggleBtn) {
  toggleBtn.addEventListener("click", toggleNavbar);
}

const observer = lozad(); // lazy loads elements with default selector as '.lozad'
observer.observe();

// Hero section background image lazy loading

document.addEventListener("DOMContentLoaded", () => {
  const bgElement = document.querySelector(".lozad.overlay-bg");

  if (!bgElement) return; // Ensure the element exists before proceeding

  const setBackgroundImage = () => {
    const screenWidth = window.innerWidth;
    const mobileSrc = bgElement.getAttribute("data-src-mobile");
    const desktopSrc = bgElement.getAttribute("data-src-desktop");

    // Determine which image to use
    const newSrc = screenWidth < 1024 ? mobileSrc : desktopSrc;

    // Apply the background image
    if (bgElement.style.backgroundImage !== `url(${newSrc})`) {
      bgElement.style.backgroundImage = `url(${newSrc})`;
    }

    // Fade in the background image
    bgElement.classList.remove("opacity-0");
  };

  // Run function on page load and window resize
  setBackgroundImage();
  window.addEventListener("resize", setBackgroundImage);
});

// Animation on links

document.querySelectorAll("a").forEach((link) => {
  link.classList.add("transition-all", "duration-300", "hover:scale-110");
});

// Animation on title

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".opacity-0").forEach((el) => {
    el.classList.remove("opacity-0", "translate-y-10");
  });
});

// Animation on paragraph

const elements = document.querySelectorAll(".opacity-0");

const observer2 = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("opacity-0", "translate-y-5");
      }
    });
  },
  { threshold: 0.2 },
);

elements.forEach((el) => observer2.observe(el));

// Reveal sections

const sections = document.querySelectorAll(".section");

const revealSection = () => {
  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;
    const triggerPoint = window.innerHeight * 0.8;

    if (sectionTop < triggerPoint) {
      section.classList.add("opacity-100", "translate-y-0");
      section.classList.remove("opacity-0", "translate-y-10");
    }
  });
};

window.addEventListener("scroll", revealSection);

// Stats Counter

const counters = document.querySelectorAll(".counter");

const runCounter = (counter) => {
  let target = +counter.getAttribute("data-target");
  let count = 0;
  let step = Math.ceil(target / 100);

  const updateCount = () => {
    count += step;
    counter.innerText = count > target ? target : count;
    if (count < target) requestAnimationFrame(updateCount);
  };

  counter.classList.remove("opacity-0");
  updateCount();
};

// Starts the counter when counter is visible on the page

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        runCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);

counters.forEach((counter) => counterObserver.observe(counter));

// Logout button

// Image slider Pause animation

document.addEventListener("DOMContentLoaded", function () {
  // Select both rows
  const firstRow = document.querySelector(".animate-loop-scroll-left");
  const secondRow = document.querySelector(".animate-loop-scroll-right");

  // Function to pause animation
  function pauseAnimation(event) {
    event.currentTarget.classList.add("paused");
  }

  // Function to resume animation
  function resumeAnimation(event) {
    event.currentTarget.classList.remove("paused");
  }

  // Attach event listeners
  firstRow.addEventListener("mouseover", pauseAnimation);
  firstRow.addEventListener("mouseleave", resumeAnimation);

  secondRow.addEventListener("mouseover", pauseAnimation);
  secondRow.addEventListener("mouseleave", resumeAnimation);
});
