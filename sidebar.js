document.addEventListener('DOMContentLoaded', function () {
  // Insert sidebar HTML
  const sidebarHTML = `
    <!-- Side Menus -->
    <div id="performance-menu" class="side-menu" style="display:none;">
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

    <div id="accountability-menu" class="side-menu" style="display:none;">
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

  // State to track active menu
  let activeMenuId = null;

  // Normalize path (remove trailing slash except root "/")
  function normalizePath(path) {
    if (path.length > 1 && path.endsWith('/')) return path.slice(0, -1);
    return path;
  }

  const currentPath = normalizePath(window.location.pathname);

  // Toggle menu visibility and margin adjustment
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

  // Close all menus and reset margin
  function closeAllMenus() {
    document.querySelectorAll('.side-menu').forEach(menu => {
      menu.style.display = 'none';
    });
    const mainInfo = document.querySelector('.main-info');
    if (mainInfo) mainInfo.style.marginLeft = '0';
    activeMenuId = null;
  }

  // Adjust margin on resize and open/close menu based on width
  function adjustMainInfoMargin() {
    const mainInfo = document.querySelector('.main-info');
    if (!mainInfo) return;

    if (window.innerWidth > 1600 && activeMenuId) {
      mainInfo.style.marginLeft = '234px';
      const targetMenu = document.getElementById(activeMenuId);
      if (targetMenu) targetMenu.style.display = 'block';
    } else {
      mainInfo.style.marginLeft = '0';
      if (activeMenuId) {
        const targetMenu = document.getElementById(activeMenuId);
        if (targetMenu) targetMenu.style.display = 'none';
      }
    }
  }

  // Outside click to close menu on mobile <768
  function outsideClickHandler(event) {
    if (window.innerWidth >= 768) return;

    const clickedInsideMenu = event.target.closest('.side-menu');
    const clickedToggleButton = event.target.closest('[data-toggle-menu]');

    if (!clickedInsideMenu && !clickedToggleButton) {
      closeAllMenus();
    }
  }

  document.addEventListener('click', outsideClickHandler);

  window.addEventListener('resize', () => {
    adjustMainInfoMargin();

    if (window.innerWidth <= 1600 && activeMenuId) {
      closeAllMenus();
    }
  });

  // Find all menu buttons and links
  const sidebarMenuButtons = document.querySelectorAll('#sidebar button[data-toggle-menu]');
  const sidebarMenuLinks = document.querySelectorAll('.side-menu ul li a');

  // Remove all active classes first
  document.querySelectorAll('#sidebar li.active').forEach(li => li.classList.remove('active'));
  document.querySelectorAll('.side-menu ul li a.active').forEach(a => a.classList.remove('active'));

  // Mark submenu links active based on current path
  sidebarMenuLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const normalizedHref = normalizePath(href);

    if (currentPath === normalizedHref || currentPath.startsWith(normalizedHref + '/')) {
      link.classList.add('active');
      const sideMenu = link.closest('.side-menu');
      if (sideMenu) {
        activeMenuId = sideMenu.id;
      }
    }
  });

  // Mark top menu buttons active and open corresponding menu
  sidebarMenuButtons.forEach(button => {
    const menuId = button.getAttribute('data-menu-id');
    if (menuId === activeMenuId) {
      button.parentElement.classList.add('active');
      toggleSideMenu(menuId);
    }
  });

  // Also mark top-level link active if exact match
  const sidebarTopLinks = document.querySelectorAll('#sidebar > ul > li > a');
  sidebarTopLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const normalizedHref = normalizePath(href);

    if (currentPath === normalizedHref) {
      link.parentElement.classList.add('active');
    }
  });

  // Global click handler for toggle buttons and background overlays
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

  // Initial margin adjustment
  adjustMainInfoMargin();
});
