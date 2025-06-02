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
