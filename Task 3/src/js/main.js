document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const closeBtn = document.getElementById("closeMenu");
  const menuOverlay = document.getElementById("menuOverlay");

  function openMenu() {
    mobileMenu.classList.add("active");
    menuOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    mobileMenu.classList.remove("active");
    menuOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  menuBtn?.addEventListener("click", openMenu);
  closeBtn?.addEventListener("click", closeMenu);
  menuOverlay?.addEventListener("click", closeMenu);

  const menuLinks = mobileMenu?.querySelectorAll("a");
  menuLinks?.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // navbar scroll
  const navbar = document.getElementById("navbar");
  var navTop = navbar.getBoundingClientRect();

  window.addEventListener("scroll", function () {
    if (window.scrollY > navTop.bottom) {
      navbar.classList.add("-translate-y-100");
    }
    if (
      window.scrollY >
        document.getElementById("levelId").getBoundingClientRect().top ||
      window.scrollY < navTop.bottom
    ) {
      navbar.classList.remove("-translate-y-100");
    }
    if (
      window.scrollY >
      document.getElementById("heropage").getBoundingClientRect().bottom
    ) {
      navbar.classList.remove("-translate-y-100");
    }
  });

  // Slider functionality
  const sections = [
    { id: "heropage", link: 'a[href="#heropage"]' },
    { id: "levelId", link: 'a[href="#levelId"]' },
    { id: "hikinggear", link: 'a[href="#hikinggear"]' },
    { id: "map&timing", link: 'a[href="#map&timing"]' },
  ];

  const slider = document.querySelector(".slidebar");
  if (!slider) return;

  function updateActiveLink(index) {
    sections.forEach((section, i) => {
      const link = document.querySelector(section.link);
      if (link) {
        if (i === index) {
          link.classList.add("text-yellow-400", "scale-110");
          link.classList.remove("text-white");
        } else {
          link.classList.remove("text-yellow-400", "scale-110");
          link.classList.add("text-white");
        }
      }
    });
  }

  function updateSlider() {
    const scrollY = window.scrollY;
    const viewportCenter = scrollY + window.innerHeight / 2;

    // Find which section is currently in view
    let currentIndex = 0;
    sections.forEach((section, i) => {
      const element = document.getElementById(section.id);
      if (element) {
        const rect = element.getBoundingClientRect();
        const sectionMiddle = scrollY + rect.top + rect.height / 2;

        if (viewportCenter >= sectionMiddle) {
          currentIndex = i;
        }
      }
    });

    // Move slider
    const progress = (currentIndex / (sections.length - 1)) * 100;
    slider.style.transition = "transform 0.3s ease-out";
    slider.style.transform = `translateY(${progress * 3}%)`;

    updateActiveLink(currentIndex);
  }

  window.addEventListener("scroll", () => {
    updateSlider();
  });

  window.addEventListener("resize", updateSlider);
  updateSlider();
});
