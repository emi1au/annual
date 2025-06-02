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
  if (window.innerWidth > 1600 && mainInfo) {
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

  if (window.innerWidth > 1600 && activeMenuId) {
    mainInfo.style.marginLeft = '234px';
  } else {
    mainInfo.style.marginLeft = '0';
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
          <h6><a href="#">Performance report</a></h6>
          <button class="close-btn" data-toggle-menu data-menu-id="performance-menu">&times;</button>
        </div>
        <ul>
          <li><a href="#">Mission 1</a></li>
          <li><a href="#">Mission 2</a></li>
          <li><a href="#">Mission 3</a></li>
          <li><a href="#">Mission 4</a></li>
          <li><a href="#">Mission 5</a></li>
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
          <li><a href="#">Annual governance statement</a></li>
          <li><a href="#">Other control framework elements</a></li>
          <li><a href="#">Director’s Report for the period ended 31 March 2023</a></li>
          <li><a href="#">Annual Governance Statement. Accountable Officer of the Special Health Authority.</a></li>
          <li><a href="#">Statement of Directors’ Responsibilities</a></li>
          <li><a href="#">Remuneration</a></li>
          <li><a href="#">Staff Report</a></li>
          <li><a href="#">Senedd Cymru/Welsh Parliamentary Accountability & Audit Report</a></li>
        </ul>
      </div>
      <div class="trans-bg"></div>
    </div>

    <!-- Sidebar -->
    <nav id="sidebar">
      <ul>
        <li class="active">
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

  // Dynamic button click handling
  document.addEventListener('click', function (event) {
    const toggleButton = event.target.closest('[data-toggle-menu]');
    if (toggleButton) {
      const menuId = toggleButton.getAttribute('data-menu-id');
      if (menuId) toggleSideMenu(menuId);
    }

    const bg = event.target.closest('.trans-bg');
    if (bg) {
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
