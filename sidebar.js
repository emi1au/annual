document.addEventListener('DOMContentLoaded', function () {
  // Inject Sidebar HTML
  const sidebarHTML = `
    <!-- Side Menus -->
    <div id="performance-menu" class="side-menu">
      <div class="nd-menu">
        <div class="side-menu-title-close">
          <h6><a href="#">Performance report</a></h6>
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
          <h6><a href="https://dhcw.nhs.wales/annual-report-2025/accountability-report/">Accountability report</a></h6>
          <button class="close-btn" data-toggle-menu data-menu-id="accountability-menu">&times;</button>
        </div>
        <ul>
          <li><a href="/annual-report-2025/accountability-report/annual-governance/">Annual governance statement</a></li>
          <li><a href="/annual-report-2025/accountability-report/control-framework/">Other control framework elements</a></li>
          <li><a href="/annual-report-2025/accountability-report/directors-report/">Director’s Report</a></li>
          <li><a href="/annual-report-2025/accountability-report/accountable-officer/">Accountable Officer Statement</a></li>
          <li><a href="/annual-report-2025/accountability-report/directors-responsibilities/">Statement of Directors’ Responsibilities</a></li>
          <li><a href="/annual-report-2025/accountability-report/remuneration/">Remuneration</a></li>
          <li><a href="/annual-report-2025/accountability-report/staff-report/">Staff Report</a></li>
          <li><a href="/annual-report-2025/accountability-report/senedd-report/">Senedd Cymru/Welsh Parliamentary Accountability</a></li>
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

  // Toggle logic
  let activeMenuId = null;

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

  function outsideClickHandler(event) {
    const clickedInsideMenu = event.target.closest('.side-menu');
    const clickedToggleButton = event.target.closest('[data-toggle-menu]');

    if (!clickedInsideMenu && !clickedToggleButton) {
      closeAllMenus();
    }
  }

  function adjustMainInfoMargin() {
    const mainInfo = document.querySelector('.main-info');
    if (!mainInfo) return;

    if (window.innerWidth > 1600 && activeMenuId) {
      mainInfo.style.marginLeft = '234px';
    } else {
      mainInfo.style.marginLeft = '0';
    }
  }

  // Highlight active link
  function highlightActiveLink() {
    const currentURL = window.location.href;
    const path = window.location.pathname;

    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    sidebar.querySelectorAll('li').forEach(li => li.classList.remove('active'));
    document.querySelectorAll('.side-menu a').forEach(a => a.classList.remove('active'));

    // Top-level menu highlighting
    if (path === '/annual-report-2025/' || path === '/annual-report-2025') {
      const foreword = sidebar.querySelector('a[href="https://dhcw.nhs.wales/annual-report-2025/"]');
      if (foreword) foreword.parentElement.classList.add('active');
    }

    if (path.startsWith('/annual-report-2025/performance-overview')) {
      const performanceBtn = sidebar.querySelector('[data-menu-id="performance-menu"]');
      if (performanceBtn) performanceBtn.parentElement.classList.add('active');
    }

    if (path.startsWith('/annual-report-2025/accountability-report')) {
      const accountabilityBtn = sidebar.querySelector('[data-menu-id="accountability-menu"]');
      if (accountabilityBtn) accountabilityBtn.parentElement.classList.add('active');
    }

    // Submenu link highlighting
    document.querySelectorAll('.side-menu a').forEach(link => {
      if (link.href && currentURL.startsWith(link.href)) {
        link.classList.add('active');
      }
    });
  }

  // Truncate long sub-links (optional)
  document.querySelectorAll("ul li a").forEach(link => {
    let fullText = link.textContent.trim();
    if (fullText.length > 23) {
      link.setAttribute("title", fullText);
      link.textContent = fullText.substring(0, 23) + "...";
    }
  });

  // Event listeners
  document.addEventListener('click', outsideClickHandler);
  window.addEventListener('resize', adjustMainInfoMargin);
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

  highlightActiveLink();
});
