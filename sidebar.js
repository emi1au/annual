

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
    const targetMenu = document.getElementById(menuId);
    targetMenu.style.display = 'block';

    setTimeout(() => {
      document.addEventListener('click', outsideClickHandler);
    }, 0);
  } else {
    document.removeEventListener('click', outsideClickHandler);
  }

  if (window.innerWidth > 1600) {
    mainInfo.style.marginLeft = isMenuOpening ? '234px' : '0';
  }
}

function outsideClickHandler(event) {
  const menus = document.querySelectorAll('.side-menu');
  const clickedInsideMenu = Array.from(menus).some(menu =>
    menu.contains(event.target)
  );
  const clickedToggleButton = event.target.closest('[data-toggle-menu]');

  if (!clickedInsideMenu && !clickedToggleButton) {
    menus.forEach(menu => {
      menu.style.display = 'none';
    });

    const mainInfo = document.querySelector('.main-info');
    if (mainInfo && window.innerWidth > 1600) {
      mainInfo.style.marginLeft = '0';
    }

    document.removeEventListener('click', outsideClickHandler);
  }
}

function adjustMainInfoMargin() {
  const mainInfo = document.querySelector('.main-info');
  const menus = document.querySelectorAll('.side-menu');
  let anyMenuOpen = false;

  menus.forEach(menu => {
    if (getComputedStyle(menu).display === 'block') {
      anyMenuOpen = true;
    }
  });

  if (window.innerWidth > 1600) {
    mainInfo.style.marginLeft = anyMenuOpen ? '234px' : '0';
  } else {
    mainInfo.style.marginLeft = '0';
  }
}

window.addEventListener('resize', adjustMainInfoMargin);

document.addEventListener('DOMContentLoaded', function () {
  const sidebarHTML = `
    <!-- Side Menus -->
    <div id="performance-menu" class="side-menu">
      <div class="nd-menu">
        <div class="side-menu-title-close">
          <h6><a href="#">Performance report</a></h6>
          <button class="close-btn" data-toggle-menu onclick="toggleSideMenu('performance-menu')">&times;</button>
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
          <h6><a href="#">Accountability report</a></h6>
          <button class="close-btn" data-toggle-menu onclick="toggleSideMenu('accountability-menu')">&times;</button>
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

    <nav id="sidebar">
      <ul>
        <li class="active">
          <a href="index.html">
            <i class="ph ph-house"></i>
            <span>Foreword</span>
          </a>
        </li>
        <li>
          <button onclick="toggleSideMenu('performance-menu')" class="dropdown-btn" data-toggle-menu>
            <i class="ph ph-chart-line-up"></i>
            <span>Performance</span>
          </button>
        </li>
        <li>
          <button onclick="toggleSideMenu('accountability-menu')" class="dropdown-btn" data-toggle-menu>
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

  // Truncate long links
  document.querySelectorAll("ul li a").forEach(function (link) {
    let fullText = link.textContent.trim();
    if (fullText.length > 23) {
      link.setAttribute("title", fullText);
      link.textContent = fullText.substring(0, 23) + "...";
    }
  });

  // ✅ Clicking .trans-bg will close the associated menu
  document.addEventListener('click', function (e) {
    const bg = e.target.closest('.trans-bg');
    if (bg) {
      const parentMenu = bg.closest('.side-menu');
      if (parentMenu && parentMenu.id) {
        toggleSideMenu(parentMenu.id); // Close it
      }
    }
  });
});
