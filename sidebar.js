// Track active menu globally
let activeMenuId = null;

// Toggle menu visibility
function toggleSideMenu(menuId) {
  const menus = document.querySelectorAll('.side-menu');
  const mainInfo = document.querySelector('.main-info');

  if (activeMenuId === menuId) {
    closeAllMenus();
    return;
  }

  closeAllMenus();

  const targetMenu = document.getElementById(menuId);
  if (targetMenu) {
    targetMenu.style.display = 'block';
    activeMenuId = menuId;

    if (window.innerWidth > 1600 && mainInfo) {
      mainInfo.style.marginLeft = '234px';
    }
  }
}

// Close all side menus
function closeAllMenus() {
  document.querySelectorAll('.side-menu').forEach(menu => {
    menu.style.display = 'none';
  });

  const mainInfo = document.querySelector('.main-info');
  if (mainInfo) {
    mainInfo.style.marginLeft = '0';
  }

  activeMenuId = null;
}

// Outside click to close (only on mobile <768px)
function outsideClickHandler(event) {
  if (window.innerWidth >= 768) return;

  const clickedInsideMenu = event.target.closest('.side-menu');
  const clickedToggleButton = event.target.closest('[data-toggle-menu]');

  if (!clickedInsideMenu && !clickedToggleButton) {
    closeAllMenus();
  }
}

document.addEventListener('click', outsideClickHandler);

// Adjust margin on resize
function adjustMainInfoMargin() {
  const mainInfo = document.querySelector('.main-info');
  if (!mainInfo) return;

  if (window.innerWidth > 1600 && activeMenuId) {
    mainInfo.style.marginLeft = '234px';
  } else {
    mainInfo.style.marginLeft = '0';
  }
}

window.addEventListener('resize', () => {
  adjustMainInfoMargin();

  if (window.innerWidth <= 1600) {
    closeAllMenus();
  } else if (activeMenuId) {
    // Show the active menu again if resizing larger
    const targetMenu = document.getElementById(activeMenuId);
    if (targetMenu) {
      targetMenu.style.display = 'block';
      const mainInfo = document.querySelector('.main-info');
      if (mainInfo) mainInfo.style.marginLeft = '234px';
    }
  }
});

// DOM ready
document.addEventListener('DOMContentLoaded', function () {
  const sidebarHTML = `
    <!-- Side Menus -->
    <div id="performance-menu" class="side-menu">
      <div class="nd-menu">
        <div class="side-menu-title-close">
          <h6><a href="/annual-report-2025/performance-overview/">Performance report</a></h6>
          <button class="close-btn" data-toggle-menu data-menu-id="performance-menu"><i class="ph ph-x-circle"></i></button>
        </div>
        <ul>
          <li><a href="/annual-report-2025/performance-overview/mission-1/"><i class="ph-fill ph-number-circle-one"></i>Mission 1</a></li>
          <li><a href="/annual-report-2025/performance-overview/mission-2/"><i class="ph-fill ph-number-circle-two"></i>Mission 2</a></li>
          <li><a href="/annual-report-2025/performance-overview/mission-3/"><i class="ph-fill ph-number-circle-three"></i>Mission 3</a></li>
          <li><a href="/annual-report-2025/performance-overview/mission-4/"><i class="ph-fill ph-number-circle-four"></i>Mission 4</a></li>
          <li><a href="/annual-report-2025/performance-overview/mission-5/"><i class="ph-fill ph-number-circle-five"></i>Mission 5</a></li>
        </ul>
      </div>
      <div class="trans-bg"></div>
    </div>

    <div id="accountability-menu" class="side-menu">
      <div class="nd-menu">
        <div class="side-menu-title-close">
          <h6><a href="/annual-report-2025/accountability-report/">Accountability report</a></h6>
          <button class="close-btn" data-toggle-menu data-menu-id="accountability-menu"><i class="ph ph-x-circle"></i></button>
        </div>
        <ul>
          <li>
  <a href="/annual-report-2025/accountability-report/annual-governance-statement/">
    <i class="ph-fill ph-article"></i> Annual Governance Statement
  </a>
</li>

<li>
  <a href="/annual-report-2025/accountability-report/information-governance-arrangements/">
    <i class="ph-fill ph-shield-check"></i> Information Governance Arrangements
  </a>
</li>

<li>
  <a href="/annual-report-2025/accountability-report/directors-report/">
    <i class="ph-fill ph-briefcase"></i> Director’s Report
  </a>
</li>

<li>
  <a href="/annual-report-2025/accountability-report/governance-statement/">
    <i class="ph-fill ph-bank"></i> Governance Statement
  </a>
</li>

<li>
  <a href="/annual-report-2025/accountability-report/directors-responsibilities/">
    <i class="ph-fill ph-user-gear"></i> Directors’ Responsibilities
  </a>
</li>

<li>
  <a href="/annual-report-2025/accountability-report/remuneration/">
    <i class="ph-fill ph-currency-gbp"></i> Remuneration
  </a>
</li>

<li>
  <a href="/annual-report-2025/accountability-report/staff-report/">
    <i class="ph-fill ph-users-three"></i> Staff Report
  </a>
</li>

<li>
  <a href="/annual-report-2025/accountability-report/dhcw-annual-report-2024-2025-accountability-audit-report-eng-pdf/">
    <i class="ph-fill ph-clipboard-text"></i> Audit Report
  </a>
</li>

        </ul>
      </div>
      <div class="trans-bg"></div>
    </div>

    <!-- Sidebar -->
    <nav id="sidebar">
      <ul>
        <li>
          <a href="/annual-report-2025/">
            <i class="ph ph-house bg-blue-h"></i>
            <span>Foreword</span>
          </a>
        </li>
        <li>
          <button class="dropdown-btn" data-toggle-menu data-menu-id="performance-menu">
            <i class="ph ph-chart-line-up bg-blue-h"></i>
            <span>Performance</span>
          </button>
        </li>
        <li>
          <button class="dropdown-btn" data-toggle-menu data-menu-id="accountability-menu">
            <i class="ph ph-copy-simple bg-blue-h"></i>
            <span>Accountability</span>
          </button>
        </li>
        <li>
          <a href="/annual-report-2025/dhcw-annual-report-2024-2025-eng-pdf">
            <i class="ph ph-file bg-blue-h"></i>
            <span>PDF</span>
          </a>
        </li>
        <li>
          <a href="https://igdc.gig.cymru/rhagair-2025/">  <!-- Welsh version URL -->
            <i class="ph ph-translate bg-welsh"></i>
            <span>Cymraeg</span>
          </a>
        </li>
      </ul>
      <div class="logo-container">
        <span class="logo">DHCW</span>
      </div>
    </nav>
  `;

  const container = document.getElementById('sidebar-container');
  if (container) container.innerHTML = sidebarHTML;

  const currentPath = window.location.pathname;

  // Remove active classes just in case
  document.querySelectorAll('#sidebar li.active').forEach(li => li.classList.remove('active'));
  document.querySelectorAll('.side-menu ul li a.active').forEach(a => a.classList.remove('active'));

  const sidebarMenuButtons = document.querySelectorAll('#sidebar button[data-toggle-menu]');
  const sidebarMenuLinks = document.querySelectorAll('.side-menu ul li a');
  const sidebarTopLinks = document.querySelectorAll('#sidebar > ul > li > a');

  let activeMenuBtnId = null;

  // Normalize path to have trailing slash
  function normalizePath(path) {
    return path.endsWith('/') ? path : path + '/';
  }

  // Check if current path matches or starts with target path (for submenu links)
  function pathMatchesOrStartsWith(current, target) {
    const c = normalizePath(current);
    const t = normalizePath(target);
    return c === t || c.startsWith(t);
  }

  // Mark submenu links active if currentPath matches or is under their href
  sidebarMenuLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && pathMatchesOrStartsWith(currentPath, href)) {
      link.classList.add('active');
      const sideMenu = link.closest('.side-menu');
      if (sideMenu) activeMenuBtnId = sideMenu.id;
    }
  });

  // Mark top-level links active only if exact match
  sidebarTopLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && normalizePath(currentPath) === normalizePath(href)) {
      link.parentElement.classList.add('active');
    }
  });

  // Set active menu button and open its menu if applicable
  sidebarMenuButtons.forEach(button => {
    const menuId = button.getAttribute('data-menu-id');
    if (menuId === activeMenuBtnId) {
      button.parentElement.classList.add('active');
      toggleSideMenu(menuId);
    }
  });

  // Close menus on load if width <= 1600
  if (window.innerWidth <= 1600) {
    closeAllMenus();
  } else if (activeMenuBtnId) {
    // Adjust margin if menu is active on larger screens
    const mainInfo = document.querySelector('.main-info');
    if (mainInfo) mainInfo.style.marginLeft = '234px';
  }

  // Global click handler for toggle buttons and transparent background
  document.addEventListener('click', function (event) {
    const toggleButton = event.target.closest('[data-toggle-menu]');
    if (toggleButton) {
      const menuId = toggleButton.getAttribute('data-menu-id');
      if (menuId) toggleSideMenu(menuId);
    }

    const bg = event.target.closest('.trans-bg');
    if (bg && window.innerWidth <= 1600) {
      const parentMenu = bg.closest('.side-menu');
      if (parentMenu?.id) {
        toggleSideMenu(parentMenu.id);
      }
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
      adjustMainInfoMargin();

      const h1 = document.querySelector("#split-text");
      if (h1) {
        const words = h1.innerHTML.split(" ").map(word => `<span class="word">${word}</span>`).join(" ");
        h1.innerHTML = words;
      }

      gsap.to(".logo", {
        x: "0%",
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        delay: 0.1,
      });

      gsap.to("h1", { opacity: 1 });

      gsap.to("p", { opacity: 1, delay: 0.5, });

      gsap.to(".word", {
        y: "0%",
        opacity: 1,
        duration: 1,
        ease: "back.out(1.7)",
        stagger: 0.1,
        delay: 0.2,
      });

      // Header scroll animation
      gsap.to("header", {
        duration: 0.5,
        filter: "grayscale(1)",
        scale: 0.95,
        scrollTrigger: {
          trigger: "header",
          start: "top top",
          end: "bottom top",
          ease: "back.out(1.7)",
          scrub: true,
          scroller: "main" // Required for custom scroller
        }
      });

      gsap.to(".board-team", {
        ease: "none",
        filter: "grayscale(0)",
        scrollTrigger: {
          trigger: ".content-img",
          start: "-50% center", // when .content-img enters the viewport
          end: "center center",   // when it leaves
          scrub: true,
          scroller: "main"
        }
      });

      

    });
