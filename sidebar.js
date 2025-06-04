let activeMenuId = null;

// Toggle menu visibility
function toggleSideMenu(menuId) {
  const targetMenu = document.getElementById(menuId);
  if (!targetMenu) return;

  const menus = document.querySelectorAll('.side-menu');

  if (window.innerWidth < 1600) {
    // Toggle visibility only below 1600
    if (activeMenuId === menuId) {
      closeAllMenus();
    } else {
      closeAllMenus();
      targetMenu.style.display = 'block';
      activeMenuId = menuId;
    }
  }
}

// Close all side menus
function closeAllMenus() {
  document.querySelectorAll('.side-menu').forEach(menu => {
    menu.style.display = 'none';
  });

  const mainInfo = document.querySelector('.main-info');
  if (mainInfo) mainInfo.style.marginLeft = '0';

  activeMenuId = null;
}

// Handle outside click only on mobile
function outsideClickHandler(event) {
  if (window.innerWidth >= 768) return;

  const clickedInsideMenu = event.target.closest('.side-menu');
  const clickedToggleButton = event.target.closest('[data-toggle-menu]');

  if (!clickedInsideMenu && !clickedToggleButton) {
    closeAllMenus();
  }
}

document.addEventListener('click', outsideClickHandler);

// Show/hide menus on resize
function adjustMenuOnResize() {
  const mainInfo = document.querySelector('.main-info');
  const allMenus = document.querySelectorAll('.side-menu');

  if (window.innerWidth >= 1600) {
    allMenus.forEach(menu => {
      menu.style.display = 'block';
    });

    if (mainInfo && activeMenuId) {
      mainInfo.style.marginLeft = '234px';
    }
  } else {
    allMenus.forEach(menu => {
      if (menu.id !== activeMenuId) {
        menu.style.display = 'none';
      }
    });

    if (mainInfo) mainInfo.style.marginLeft = '0';
  }
}

window.addEventListener('resize', adjustMenuOnResize);

// Setup on DOM ready
document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('sidebar-container');
  if (!container) return;

  container.innerHTML = `
    <div id="performance-menu" class="side-menu">
      <div class="nd-menu">
        <div class="side-menu-title-close">
          <h6><a href="/performance-overview/">Performance report</a></h6>
          <button class="close-btn" data-toggle-menu data-menu-id="performance-menu">&times;</button>
        </div>
        <ul>
          <li><a href="/performance-overview/mission-1/">Mission 1</a></li>
          <li><a href="/performance-overview/mission-2/">Mission 2</a></li>
          <li><a href="/performance-overview/mission-3/">Mission 3</a></li>
          <li><a href="/performance-overview/mission-4/">Mission 4</a></li>
          <li><a href="/performance-overview/mission-5/">Mission 5</a></li>
        </ul>
      </div>
      <div class="trans-bg"></div>
    </div>

    <div id="accountability-menu" class="side-menu">
      <div class="nd-menu">
        <div class="side-menu-title-close">
          <h6><a href="/accountability-report/">Accountability report</a></h6>
          <button class="close-btn" data-toggle-menu data-menu-id="accountability-menu">&times;</button>
        </div>
        <ul>
          <li><a href="/accountability-report/annual-governance-statement/">Annual Governance</a></li>
          <li><a href="/accountability-report/control-framework/">Control Framework</a></li>
          <li><a href="/accountability-report/directors-report/">Director’s Report</a></li>
          <li><a href="/accountability-report/governance-statement/">Governance Statement</a></li>
          <li><a href="/accountability-report/remuneration/">Remuneration</a></li>
          <li><a href="/accountability-report/staff-report/">Staff Report</a></li>
          <li><a href="/accountability-report/audit-report/">Audit Report</a></li>
        </ul>
      </div>
      <div class="trans-bg"></div>
    </div>

    <nav id="sidebar">
      <ul>
        <li><a href="/"><i class="ph ph-house"></i><span>Foreword</span></a></li>
        <li><button class="dropdown-btn" data-toggle-menu data-menu-id="performance-menu"><i class="ph ph-chart-line-up"></i><span>Performance</span></button></li>
        <li><button class="dropdown-btn" data-toggle-menu data-menu-id="accountability-menu"><i class="ph-fill ph-copy-simple"></i><span>Accountability</span></button></li>
        <li><a href="/dashboard.html"><i class="ph ph-file"></i><span>PDF</span></a></li>
      </ul>
      <div class="logo-container"><span class="logo">DHCW</span></div>
    </nav>
  `;

  // Activate menu based on path
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

      if (menuId === 'performance-menu' && currentPath.includes('/performance-')) match = true;
      if (menuId === 'accountability-menu' && currentPath.includes('/accountability-')) match = true;

      if (match && window.innerWidth >= 1600) {
        const targetMenu = document.getElementById(menuId);
        if (targetMenu) {
          targetMenu.style.display = 'block';
          activeMenuId = menuId;
          const mainInfo = document.querySelector('.main-info');
          if (mainInfo) mainInfo.style.marginLeft = '234px';
        }
      }
    }
  });

  // Handle menu button and background click
  document.addEventListener('click', function (event) {
    const toggleButton = event.target.closest('[data-toggle-menu]');
    if (toggleButton) {
      const menuId = toggleButton.getAttribute('data-menu-id');
      if (menuId) toggleSideMenu(menuId);
    }

    const bg = event.target.closest('.trans-bg');
    if (bg && window.innerWidth < 1600) {
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

  // Initial menu visibility check
  adjustMenuOnResize();
});
