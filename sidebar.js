  // Toggle side menu with margin adjustment on wide screens
  function toggleSideMenu(menuId) {
    const menus = document.querySelectorAll('.side-menu');
    const mainInfo = document.querySelector('.main-info');
    let isMenuOpening = false;

    menus.forEach(menu => {
      const isTargetMenu = menu.id === menuId;
      const isMenuHidden = getComputedStyle(menu).display === 'none';

      if (isTargetMenu && isMenuHidden) {
        isMenuOpening = true;
      }
      menu.style.display = 'none';
    });

    if (isMenuOpening) {
      document.getElementById(menuId).style.display = 'block';
    }

    if (window.innerWidth > 1600 && mainInfo) {
      mainInfo.style.marginLeft = isMenuOpening ? '234px' : '0';
    }
  }

  // Adjust margin of main info based on any open menu
  function adjustMainInfoMargin() {
    const mainInfo = document.querySelector('.main-info');
    const menus = document.querySelectorAll('.side-menu');
    let anyMenuOpen = false;

    menus.forEach(menu => {
      if (getComputedStyle(menu).display === 'block') {
        anyMenuOpen = true;
      }
    });

    if (window.innerWidth > 1600 && mainInfo) {
      mainInfo.style.marginLeft = anyMenuOpen ? '234px' : '0';
    } else if (mainInfo) {
      mainInfo.style.marginLeft = '0';
    }
  }

  // Truncate card headers longer than 80 chars to 44 chars + ...
  function truncateCardHeaders() {
    if (window.innerWidth > 1440) {
      document.querySelectorAll(".card-header span").forEach(span => {
        const fullText = span.textContent.trim();
        if (fullText.length > 80) {
          span.setAttribute("title", fullText);
          span.textContent = fullText.substring(0, 44) + "...";
        }
      });
    }
  }

  // Update CSS variable --scroll-offset based on page-menu height + 15px
  function updateScrollOffset() {
    const menu = document.querySelector('.page-menu');
    if (menu) {
      const height = menu.offsetHeight + 15;
      document.documentElement.style.setProperty('--scroll-offset', `${height}px`);
    }
  }

  // Wrap each character in span.letter for animation
  function splitTextToSpans(element) {
    const text = element.textContent.trim();
    element.innerHTML = '';
    text.split('').forEach(char => {
      const span = document.createElement('span');
      span.classList.add('letter');
      span.textContent = char === ' ' ? '\u00A0' : char;
      element.appendChild(span);
    });
  }

  // Truncate menu links longer than 23 chars to 23 + ...
  function truncateMenuLinks() {
    document.querySelectorAll("ul li a").forEach(link => {
      const fullText = link.textContent.trim();
      if (fullText.length > 23) {
        link.setAttribute("title", fullText);
        link.textContent = fullText.substring(0, 23) + "...";
      }
    });
  }

  // Wrap words in #split-text with span.word for animation
  function splitWordsInH1() {
    const h1 = document.querySelector("#split-text");
    if (h1) {
      const words = h1.innerHTML.split(" ").map(word => `<span class="word">${word}</span>`).join(" ");
      h1.innerHTML = words;
    }
  }

  // Animate cards with GSAP (y and opacity)
  function animateCards(staggerAmount, delayTime, duration) {
    gsap.set(".card-item", { y: "10%", opacity: 0 });
    gsap.to(".card-item", {
      y: "0%",
      opacity: 1,
      duration: duration,
      ease: "back.out(1.7)",
      stagger: staggerAmount,
      delay: delayTime,
    });
  }

  // GSAP mouse circle animation in .full-grid
  function setupMouseCircle() {
    const fullGrid = document.querySelector(".full-grid");
    const circle = document.querySelector(".mouse-circle");

    if (fullGrid && circle) {
      fullGrid.addEventListener("mousemove", (e) => {
        const rect = fullGrid.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        gsap.to(circle, {
          x: x - 100,
          y: y - 100,
          duration: 0.3,
          ease: "back.out(1.7)"
        });
      });

      fullGrid.addEventListener("mouseleave", () => {
        gsap.to(circle, { opacity: 0, duration: 0.3 });
      });

      fullGrid.addEventListener("mouseenter", () => {
        gsap.to(circle, { opacity: 1, duration: 0.3 });
      });
    }
  }

  // Setup IntersectionObserver for menu link highlighting
  function setupMenuIntersectionObserver() {
    const menuLinks = document.querySelectorAll('.sub-menu a');
    const sections = Array.from(menuLinks).map(link => {
      const id = link.getAttribute('href').substring(1);
      return document.getElementById(id);
    });

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        const link = document.querySelector(`.sub-menu a[href="#${id}"]`);
        if (entry.isIntersecting) {
          menuLinks.forEach(a => a.classList.remove('active'));
          link?.classList.add('active');
        }
      });
    }, {
      rootMargin: '0px 0px -80% 0px',
      threshold: 0.2
    });

    sections.forEach(section => {
      if (section) observer.observe(section);
    });

    menuLinks.forEach(link => {
      link.addEventListener('click', function () {
        menuLinks.forEach(a => a.classList.remove('active'));
        this.classList.add('active');
      });
    });
  }

  // Board member names and profile image animations
  function setupBoardMemberAnimations() {
    const profileImages = document.querySelectorAll('.board-member-img');
    const nameElements = document.querySelectorAll('.board-info .board-title');

    nameElements.forEach(el => {
      const h2 = el.querySelector('h2');
      if (h2) splitTextToSpans(h2);
    });

    // After splitting, setup animations
    const updatedNameElements = document.querySelectorAll('.board-info .board-title');
    const defaultTitle = updatedNameElements[0];
    const defaultLetters = defaultTitle.querySelectorAll('.letter');

    updatedNameElements.forEach(el => {
      gsap.set(el.querySelectorAll('.letter'), { y: "100%" });
      el.style.position = 'absolute';
      el.style.top = 0;
      el.style.left = 0;
      el.style.right = 0;
      if (el.classList.contains('default')) {
        el.style.opacity = 1;
        el.style.pointerEvents = 'auto';
      } else {
        el.style.opacity = 0;
        el.style.pointerEvents = 'none';
      }
    });

    // Show default letters immediately
    gsap.to(defaultLetters, { y: "0%", duration: 0 });

    if (window.innerWidth > 900) {
      profileImages.forEach((img, index) => {
        const correspondingTitle = updatedNameElements[index + 1]; // skip default
        if (!correspondingTitle) return;
        const correspondingLetters = correspondingTitle.querySelectorAll('.letter');

        img.addEventListener('mouseenter', () => {
          updatedNameElements.forEach(el => {
            gsap.to(el, { opacity: 0, duration: 0.2 });
            el.style.pointerEvents = 'none';
          });

          gsap.to(correspondingTitle, { opacity: 1, duration: 0.2 });
          correspondingTitle.style.pointerEvents = 'auto';

          gsap.fromTo(correspondingLetters,
            { y: "100%" },
            {
              y: "0%",
              duration: 0.75,
              ease: "power4.out",
              stagger: { each: 0.025, from: "center" }
            }
          );

          gsap.to(img, {
            width: 140,
            height: 140,
            filter: "grayscale(0)",
            duration: 0.5,
            ease: "power4.out",
          });
        });

        img.addEventListener('mouseleave', () => {
          gsap.to(correspondingTitle, { opacity: 0, duration: 0.2 });
          correspondingTitle.style.pointerEvents = 'none';

          gsap.to(defaultTitle, { opacity: 1, duration: 0.2 });
          defaultTitle.style.pointerEvents = 'auto';

          gsap.to(defaultLetters, {
            y: "0%",
            duration: 0.75,
            ease: "power4.out",
            stagger: { each: 0.025, from: "center" }
          });

          gsap.to(img, {
            width: 70,
            height: 70,
            filter: "grayscale(1)",
            duration: 0.5,
            ease: "power4.out",
          });
        });
      });
    }
  }

  // Smooth scrolling for anchor links using GSAP ScrollToPlugin
  function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          gsap.to(window, {
            scrollTo: { y: `#${targetId}`, offsetY: 50 },
            duration: 1,
            ease: "power2.out"
          });
        }
      });
    });
  }

  // Animate slide-left-text sections and images on scroll
  function setupScrollTriggerForSections() {
    const sections = document.querySelectorAll(".slide-left-text");
    const images = document.querySelectorAll(".img-video-container");

    gsap.set(images, { opacity: 0, y: 30 });

    sections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveImage(index),
        onEnterBack: () => setActiveImage(index),
      });
    });

    function setActiveImage(index) {
      gsap.to(images, {
        opacity: (i) => (i === index ? 1 : 0),
        y: (i) => (i === index ? 0 : 30),
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }

  // Animate cards with responsive matchMedia
  function setupCardAnimations() {
    const mm = gsap.matchMedia();
    mm.add("(max-width: 768px)", () => animateCards(0.05, 0.2, 0.5));
    mm.add("(min-width: 769px)", () => animateCards(0.1, 0.3, 0.8));

    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (window.innerWidth <= 768) {
          animateCards(0.1, 0.2, 0.5);
        } else {
          animateCards(0.1, 0.3, 0.8);
        }
      }, 200);
    });
  }

  // Basic truncate menu links on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    adjustMainInfoMargin();
    truncateMenuLinks();
    truncateCardHeaders();
    setupMenuIntersectionObserver();
    splitWordsInH1();
    setupBoardMemberAnimations();
    setupSmoothScrolling();
    setupScrollTriggerForSections();
    setupCardAnimations();
    setupMouseCircle();

    // GSAP Animations for logo, h1 words
    gsap.to(".logo", {
      x: "0%",
      opacity: 1,
      duration: 0.8,
      ease: "back.out(1.7)",
      delay: 0.1,
    });

    gsap.to("h1", { opacity: 1 });

    gsap.to(".word", {
      y: "0%",
      opacity: 1,
      duration: 1,
      ease: "back.out(1.7)",
      stagger: 0.1,
      delay: 0.2,
    });

    // Header grayscale scroll animation
    gsap.to("header", {
      duration: 0.5,
      filter: "grayscale(1)",
      scrollTrigger: {
        trigger: "header",
        start: "top top",
        end: "bottom top",
        ease: "back.out(1.7)",
        scrub: true,
        scroller: "main" // your custom scroller
      }
    });

    // Board-team grayscale scroll animation
    gsap.to(".board-team", {
      ease: "none",
      filter: "grayscale(0)",
      scrollTrigger: {
        trigger: ".content-img",
        start: "-50% center",
        end: "center center",
        scrub: true,
        scroller: "main"
      }
    });

    // Animate grid images on scroll
    gsap.utils.toArray(".grid__item").forEach((item) => {
      gsap.to(item.querySelector(".grid__img"), {
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 90%",
          end: "top 10%",
          scrub: true,
          scroller: "main"
        }
      });
    });

    // Setup ScrollTrigger refresh
    ScrollTrigger.refresh();

    // Update scroll offset CSS variable initially and on window resize
    updateScrollOffset();
    window.addEventListener('resize', updateScrollOffset);
  });

  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

