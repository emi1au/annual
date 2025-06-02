
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

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

        if (window.innerWidth > 1600) {
            mainInfo.style.marginLeft = isMenuOpening ? '234px' : '0';
        }
    }

    function adjustMainInfoMargin() {
        const mainInfo = document.querySelector('.main-info');
        const menus = document.querySelectorAll('.side-menu');
        const anyMenuOpen = Array.from(menus).some(menu => getComputedStyle(menu).display === 'block');
        mainInfo.style.marginLeft = window.innerWidth > 1600 && anyMenuOpen ? '234px' : '0';
    }

    function truncateLinks(limit) {
        document.querySelectorAll("ul li a").forEach(link => {
            const fullText = link.textContent.trim();
            if (fullText.length > limit) {
                link.setAttribute("title", fullText);
                link.textContent = fullText.substring(0, limit) + "...";
            }
        });
    }

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

    function updateScrollOffset() {
        const menu = document.querySelector('.page-menu');
        if (menu) {
            const height = menu.offsetHeight + 15;
            document.documentElement.style.setProperty('--scroll-offset', `${height}px`);
        }
    }

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

    function setActiveImage(index) {
        const images = document.querySelectorAll(".img-video-container");
        gsap.to(images, {
            opacity: i => (i === index ? 1 : 0),
            y: i => (i === index ? 0 : 30),
            duration: 0.5,
            ease: "power2.out",
        });
    }

    document.addEventListener("DOMContentLoaded", () => {
        adjustMainInfoMargin();
        truncateLinks(23);
        truncateCardHeaders();
        updateScrollOffset();

        // Split text
        const h1 = document.querySelector("#split-text");
        if (h1) {
            h1.innerHTML = h1.innerHTML.split(" ").map(word => `<span class="word">${word}</span>`).join(" ");
        }

        // GSAP animations
        gsap.to(".logo", { x: "0%", opacity: 1, duration: 0.8, ease: "back.out(1.7)", delay: 0.1 });
        gsap.to("h1", { opacity: 1 });
        gsap.to(".word", {
            y: "0%",
            opacity: 1,
            duration: 1,
            ease: "back.out(1.7)",
            stagger: 0.1,
            delay: 0.1,
        });

        const mm = gsap.matchMedia();
        mm.add("(max-width: 768px)", () => animateCards(0.05, 0.2, 0.5));
        mm.add("(min-width: 769px)", () => animateCards(0.1, 0.3, 0.8));

        // Scroll-linked image reveal
        const sectionsScroll = document.querySelectorAll(".slide-left-text");
        const images = document.querySelectorAll(".img-video-container");
        gsap.set(images, { opacity: 0, y: 30 });

        sectionsScroll.forEach((section, index) => {
            ScrollTrigger.create({
                trigger: section,
                start: "top center",
                end: "bottom center",
                onEnter: () => setActiveImage(index),
                onEnterBack: () => setActiveImage(index),
            });
        });

        // Side menu active link highlighting
        const menuLinks = document.querySelectorAll('.sub-menu a');
        const sections = Array.from(menuLinks).map(link => document.getElementById(link.getAttribute('href').substring(1)));

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                const id = entry.target.id;
                const link = document.querySelector(`.sub-menu a[href="#${id}"]`);
                if (entry.isIntersecting) {
                    menuLinks.forEach(a => a.classList.remove('active'));
                    link?.classList.add('active');
                }
            });
        }, { rootMargin: '0px 0px -80% 0px', threshold: 0.2 });

        sections.forEach(section => section && observer.observe(section));

        menuLinks.forEach(link => {
            link.addEventListener('click', function () {
                menuLinks.forEach(a => a.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Mouse-following circle
        const fullGrid = document.querySelector(".full-grid");
        const circle = document.querySelector(".mouse-circle");

        if (fullGrid && circle) {
            fullGrid.addEventListener("mousemove", (e) => {
                const rect = fullGrid.getBoundingClientRect();
                gsap.to(circle, {
                    x: e.clientX - rect.left - 100,
                    y: e.clientY - rect.top - 100,
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

        // Smooth scrolling for anchor links
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
    });

    // Resize adjustments
    window.addEventListener("resize", () => {
        adjustMainInfoMargin();
        truncateCardHeaders();
        updateScrollOffset();
    });

    // Background click closes side menu
    document.addEventListener('click', function (e) {
        const bg = e.target.closest('.trans-bg');
        if (bg) {
            const parentMenu = bg.closest('.side-menu');
            if (parentMenu && parentMenu.id) {
                toggleSideMenu(parentMenu.id);
            }
        }
    });
