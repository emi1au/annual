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

  // Highlight all relevant links
  const allLinks = document.querySelectorAll('#sidebar a, .side-menu ul li a, .side-menu h6 a');

  allLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    const resolvedHref = new URL(href, window.location.origin).pathname;
    if (currentPath === resolvedHref) {
      link.classList.add('active');
      const parentLi = link.closest('li');
      if (parentLi) parentLi.classList.add('active');
    }
  });

  // Activate and open correct menu
  const menuMatches = [
    {
      menuId: 'performance-menu',
      matchPaths: [
        '/annual-report-2025/performance-overview/',
        '/annual-report-2025/performance-overview/mission-1/',
        '/annual-report-2025/performance-overview/mission-2/',
        '/annual-report-2025/performance-overview/mission-3/',
        '/annual-report-2025/performance-overview/mission-4/',
        '/annual-report-2025/performance-overview/mission-5/'
      ]
    },
    {
      menuId: 'accountability-menu',
      matchPaths: [
        '/annual-report-2025/accountability-report/',
        '/annual-report-2025/accountability-report/annual-governance-statement/',
        '/annual-report-2025/accountability-report/control-framework/',
        '/annual-report-2025/accountability-report/directors-report/',
        '/annual-report-2025/accountability-report/governance-statement/',
        '/annual-report-2025/accountability-report/directors-responsibilities/',
        '/annual-report-2025/accountability-report/remuneration/',
        '/annual-report-2025/accountability-report/staff-report/',
        '/annual-report-2025/accountability-report/audit-report/'
      ]
    }
  ];

  menuMatches.forEach(({ menuId, matchPaths }) => {
    if (matchPaths.includes(currentPath)) {
      const toggleBtn = document.querySelector(`[data-menu-id="${menuId}"]`);
      if (toggleBtn) toggleBtn.parentElement.classList.add('active');
      if (window.innerWidth > 1600) toggleSideMenu(menuId);
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

  // Truncate long links
  document.querySelectorAll("ul li a").forEach(link => {
    let fullText = link.textContent.trim();
    if (fullText.length > 23) {
      link.setAttribute("title", fullText);
      link.textContent = fullText.substring(0, 23) + "...";
    }
  });
});
