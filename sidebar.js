// Track active menu
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

  if (window.innerWidth <= 1600 && activeMenuId) {
    // Auto-close menu when resizing to smaller screen
    closeAllMenus();
  }

  if (window.innerWidth > 1600 && activeMenuId) {
    // Reopen menu when resizing back to large screen
    const targetMenu = document.getElementById(activeMenuId);
    if (targetMenu) {
      targetMenu.style.display = 'block';
      const mainInfo = document.querySelector('.main-info');
      if (mainInfo) {
        mainInfo.style.marginLeft = '234px';
      }
    }
  }
});

// Helper functions
function pathsMatchExactly(path1, path2) {
  const a = path1.endsWith('/') ? path1 : path1 + '/';
  const b = path2.endsWith('/') ? path2 : path2 + '/';
  return a === b;
}

function pathStartsWith(base, target) {
  const normBase = base.endsWith('/') ? base : base + '/';
  const normTarget = target.endsWith('/') ? target : target + '/';
  return normBase.startsWith(normTarget);
}

// DOM ready
document.addEventListener('DOMContentLoaded', function () {
  const sidebarHTML = `
    <!-- Side Menus -->
    <div id="performance-menu" class="side-menu">
      <div class="nd-menu">
        <div class="side-menu-title-close">
          <h6><a href="/annual-report-2025/performance-overview/">Performance report</a></h6>
          <button class="close-btn" data-toggle-menu data-menu-id="performance-menu">&times;</button>
        </div>
        <ul>
          <li><a href="/annual-report-2025/performance-overview/mission-1/">Mission 1</a></li>
          <li><a href="/annual-report-2025/performance-overview/mission-2/">Mission 2</a></li>
          <li><a href="/annual-report-2025/performance-overview/mission-3/">Mission 3</a></li>
          <li><a href="/annual-report-2025/performance-overview/mission-4/">Mission 4</a></li>
          <li><a href="/annual-report-2025/performance-overview/mission-5/">Mission 5</a></li>
        </ul>
      </div>
      <div class="trans-bg"></div>
    </div>

    <div id="accountability-menu" class="side-menu">
      <div class="nd-menu">
        <div class="side-menu-title-close">
          <h6><a href="/annual-report-2025/accountability-report/">Accountability report</a></h6>
          <button class="close-btn" data-toggle-menu data-menu-id="accountability-menu">&times;</button>
        </div>
        <ul>
          <li><a href="/annual-report-2025/accountability-report/annual-governance-statement/">Annual governance statement</a></li>
          <li><a href="/annual-report-2025/accountability-report/control-framework/">Other control framework elements</a></li>
          <li><a href="/annual-report-2025/accountability-report/directors-report/">Director’s Report</a></li>
          <li><a href="/annual-report-2025/accountability-report/governance-statement/">Governance Statement</a></li>
          <li><a href="/annual-report-2025/accountability-report/directors-responsibilities/">Directors’ Responsibilities</a></li>
          <li><a href="/annual-report-2025/accountability-report/remuneration/">Remuneration</a></li>
          <li><a href="/annual-report-2025/accountability-report/staff-report/">Staff Report</a></li>
          <li><a href="/annual-report-2025/accountability-report/audit-report/">Audit Report</a></li>
        </ul>
      </div>
      <div class="trans-bg"></div>
    </div>

    <!-- Sidebar -->
    <nav id="sidebar">
      <ul>
        <li>
          <a href="/annual-report-2025/">
            <i class="ph ph-house"></i>
            <span>Foreword</span>
          </a>
        </li>
        <li>
          <button class="dropdown-btn" data-toggle-menu data-menu-id="performance-menu">
            <i class="ph ph-chart-line-up"></i>
            <span>Performance</span>
          </button>
        </li>
        <li>
          <button class="dropdown-btn" data-toggle-menu data-menu-id="accountability-menu">
            <i class="ph-fill ph-copy-simple"></i>
            <span>Accountability</span>
          </button>
        </li>
        <li>
          <a href="dashboard.html">
            <i class="ph ph-file"></i>
            <span>PDF</span>
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

  // Find all menu buttons and links
  const sidebarMenuButtons = document.querySelectorAll('#sidebar button[data-toggle-menu]');
  const sidebarMenuLinks = document.querySelectorAll('.side-menu ul li a');

  // Track which menu button should be active
  let activeMenuBtnId = null;

  // Mark submenu links active if they match current path by starting with path
  sidebarMenuLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && pathStartsWith(currentPath, href)) {
      link.classList.add('active');

      // Determine which menu this link belongs to by walking up the DOM
      const sideMenu = link.closest('.side-menu');
      if (sideMenu) {
        activeMenuBtnId = sideMenu.id; // e.g. "performance-menu" or "accountability-menu"
      }
    }
  });

  // Mark top menu buttons active and open menu if needed
  sidebarMenuButtons.forEach(button => {
    const menuId = button.getAttribute('data-menu-id');
    if (menuId === activeMenuBtnId) {
      button.parentElement.classList.add('active');
      toggleSideMenu(menuId);
    }
  });

  // Mark only exact matching top-level links active
  const sidebarTopLinks = document.querySelectorAll('#sidebar > ul > li > a');
  sidebarTopLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && pathsMatchExactly(currentPath, href)) {
      link.parentElement.classList.add('active');
    }
  });

  // Global click handler for toggles and trans-bg
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
