let activeMenuId = null;

// Check if screen is wide enough
function isWideScreen() {
  return window.innerWidth > 1600;
}

// Toggle menu visibility
function toggleSideMenu(menuId) {
  const menus = document.querySelectorAll('.side-menu');
  const mainInfo = document.querySelector('.main-info');

  if (!isWideScreen()) {
    closeAllMenus(); // Don't allow toggle on small screens
    return;
  }

  if (activeMenuId === menuId) {
    closeAllMenus();
    return;
  }

  closeAllMenus();

  const targetMenu = document.getElementById(menuId);
  if (targetMenu) {
    targetMenu.style.display = 'block';
    activeMenuId = menuId;

    if (mainInfo) {
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

// Detect outside click to close menus
function outsideClickHandler(event) {
  const clickedInsideMenu = event.target.closest('.side-menu');
  const clickedToggleButton = event.target.closest('[data-toggle-menu]');

  if (!clickedInsideMenu && !clickedToggleButton) {
    closeAllMenus();
  }
}

document.addEventListener('click', outsideClickHandler);

// Responsive adjustment
function adjustMainInfoMargin() {
  const mainInfo = document.querySelector('.main-info');
  if (!mainInfo) return;

  if (isWideScreen() && activeMenuId) {
    mainInfo.style.marginLeft = '234px';
  } else {
    mainInfo.style.marginLeft = '0';
  }

  if (!isWideScreen()) {
    closeAllMenus();
    document.querySelectorAll('.side-menu').forEach(menu => {
      menu.style.display = 'none';
    });
  }
}

window.addEventListener('resize', adjustMainInfoMargin);

// Setup on DOM ready
document.addEventListener('DOMContentLoaded', function () {
  const sidebarHTML = `
    <!-- Side Menus -->
    <div id="performance-menu" class="side-menu">
      <div class="nd-menu">
        <div class="side-menu-title-close">
          <h6><a href="https://dhcw.nhs.wales/annual-report-2025/performance-overview/">Performance report</a></h6>
          <button class="close-btn" data-toggle-menu data-menu-id="performance-menu">&times;</button>
        </div>
        <ul>
          <li><a href="https://dhcw.nhs.wales/annual-report-2025/performance-overview/mission-1/">Mission 1</a></li>
          <li><a href="https://dhcw.nhs.wales/annual-report-2025/performance-overview/mission-2/">Mission 2</a></li>
          <li><a href="https://dhcw.nhs.wales/annual-report-2025/performance-overview/mission-3/">Mission 3</a></li>
          <li><a href="https://dhcw.nhs.wales/annual-report-2025/performance-overview/mission-4/">Mission 4</a></li>
          <li><a href="https://dhcw.nhs.wales/annual-report-2025/performance-overview/mission-5/">Mission 5</a></li>
        </ul>
      </div>
      <div class="trans-bg"></div>
    </div>

    <div id="accountability-menu" class="side-menu">
      <div class="nd-menu">
        <div class="side-menu-title-close">
          <h6><a href="https://dhcw.nhs.wales/annual-report-2025/accountability-report/">Accountability report</a></h6>
          <button class="close-btn" data-toggle-menu data-menu-id="accountability-menu">&times;</button>
        </div>
        <ul>
          <li><a href="https://dhcw.nhs.wales/annual-report-2025/accountability-report/annual-governance-statement/">Annual governance statement</a></li>
          <li><a href="https://dhcw.nhs.wales/annual-report-2025/accountability-report/control-framework/">Other control framework elements</a></li>
          <li><a href="https://dhcw.nhs.wales/annual-report-2025/accountability-report/directors-report/">Director’s Report</a></li>
          <li><a href="https://dhcw.nhs.wales/annual-report-2025/accountability-report/governance-statement/">Annual Governance Statement</a></li>
          <li><a href="https://dhcw.nhs.wales/annual-report-2025/accountability-report/directors-responsibilities/">Statement of Directors’ Responsibilities</a></li>
          <li><a href="https://dhcw.nhs.wales/annual-report-2025/accountability-report/remuneration/">Remuneration</a></li>
          <li><a href="https://dhcw.nhs.wales/annual-report-2025/accountability-report/staff-report/">Staff Report</a></li>
          <li><a href="https://dhcw.nhs.wales/annual-report-2025/accountability-report/audit-report/">Senedd Cymru/Welsh Parliamentary Accountability & Audit Report</a></li>
        </ul>
      </div>
      <div class="trans-bg"></div>
    </div>

    <!-- Sidebar -->
    <nav id="sidebar">
      <ul>
        <li>
          <a href="https://dhcw.nhs.wales/annual-report-2025/">
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
  if (container) {
    container.innerHTML = sidebarHTML;
  }

  // Highlight active links and open menus
  const currentPath = window.location.pathname;
  const sidebarLinks = document.querySelectorAll('#sidebar a, #sidebar button');

  sidebarLinks.forEach(link => {
    const href = link.getAttribute('href');
    const menuId = link.getAttribute('data-menu-id');

    if (href) {
      const resolvedHref = new URL(href, window.location.origin).pathname;
      if (currentPath === resolvedHref) {
        link.parentElement.classList.add('active');
      }
    }

    if (!href && menuId) {
      let match = false;

      if (menuId === 'performance-menu' && (
        currentPath.includes('/performance-report') ||
        currentPath.includes('/performance-overview') ||
        currentPath.includes('/mission-')
      )) {
        match = true;
      }

      if (menuId === 'accountability-menu' && (
        currentPath.includes('/accountability-report') ||
        currentPath.includes('/accountability-overview') ||
        currentPath.includes('/statement-of-directors-responsibilities') ||
        currentPath.includes('/remuneration') ||
        currentPath.includes('/staff-report') ||
        currentPath.includes('/senedd') ||
        currentPath.includes('/governance') ||
        currentPath.includes('/control-framework')
      )) {
        match = true;
      }

      if (match) {
        link.parentElement.classList.add('active');
        toggleSideMenu(menuId);
      }
    }
  });

  // Handle menu toggle and background clicks
  document.addEventListener('click', function (event) {
    const toggleButton = event.target.closest('[data-toggle-menu]');
    if (toggleButton) {
      const menuId = toggleButton.getAttribute('data-menu-id');
      if (menuId) {
        if (activeMenuId === menuId || !isWideScreen()) {
          closeAllMenus();
        } else {
          toggleSideMenu(menuId);
        }
      }
    }

    const bg = event.target.closest('.trans-bg');
    if (bg && !isWideScreen()) {
      const parentMenu = bg.closest('.side-menu');
      if (parentMenu?.id) {
        toggleSideMenu(parentMenu.id);
      }
    }
  });

  // Truncate long link text
  document.querySelectorAll("ul li a").forEach(link => {
    let fullText = link.textContent.trim();
    if (fullText.length > 23) {
      link.setAttribute("title", fullText);
      link.textContent = fullText.substring(0, 23) + "...";
    }
  });
});
