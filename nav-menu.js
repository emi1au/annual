document.addEventListener("DOMContentLoaded", () => {
    
    const sidebarContainer = document.getElementById("sidebar-container");
    
    // If the container doesn't exist on the page, stop the script
    if (!sidebarContainer) return;

    // 1. INJECT THE HTML
    const navHTML = `
    <!-- NAVIGATION HEADER -->
    <header class="site-header" id="site-header">
        <div class="nav-container">
            <div class="watermark">DHCW</div>
            
            <!-- DESKTOP NAV -->
            <nav aria-label="Main Navigation" class="desktop-nav">
                <ul style="display: flex; gap: 2.5rem; list-style: none;">
                    <li class="nav-item"><a href="#foreword">Foreword</a></li>
                    <li class="nav-item"><button aria-expanded="false" aria-controls="modal-performance" data-target="performance">Performance <svg class="chevron" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg></button></li>
                    <li class="nav-item"><button aria-expanded="false" aria-controls="modal-accountability" data-target="accountability">Accountability <svg class="chevron" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg></button></li>
                    <li class="nav-item"><a href="#pdf">PDF</a></li>
                </ul>
            </nav>

            <!-- RIGHT ALIGNED TOGGLES -->
            <div class="header-right">
                <button class="lang-btn" aria-label="Translate to Welsh">Cymraeg</button>
                <!-- Animated Hamburger Toggle -->
                <button class="mobile-toggle" id="mobile-toggle-btn" aria-label="Open mobile menu" aria-expanded="false">
                    <span class="hamburger-line"></span>
                    <span class="hamburger-line"></span>
                    <span class="hamburger-line"></span>
                </button>
            </div>
        </div>

        <!-- DESKTOP SQUARESPACE MODALS -->
        <div class="sq-modal-container" id="modal-performance" role="dialog" aria-modal="true" aria-label="Performance Menu">
            <div class="sq-modal-inner">
                <div class="sq-col-left">
                    <div class="sq-col-title">Missions</div>
                    <a href="#" class="sq-link active" data-title="Mission 1" data-desc="Delivering high-quality digital services that support patient care across Wales." data-pills="Patient Care, Digital Health, Systems" data-img="https://emi1au.github.io/annual/img/M1.png">Mission 1</a>
                    <a href="#" class="sq-link" data-title="Mission 2" data-desc="Empowering healthcare professionals with modern, reliable technology." data-pills="Workforce, Innovation, Equipment" data-img="https://emi1au.github.io/annual/img/M2.png">Mission 2</a>
                    <a href="#" class="sq-link" data-title="Mission 3" data-desc="Harnessing data for better health outcomes and operational efficiency." data-pills="Data Science, Analytics, Research" data-img="https://emi1au.github.io/annual/img/M3.png">Mission 3</a>
                    <a href="#" class="sq-link" data-title="Mission 4" data-desc="Enhancing cybersecurity and resilience within the NHS network." data-pills="Cybersecurity, Resilience, Infrastructure" data-img="https://emi1au.github.io/annual/img/M4.png">Mission 4</a>
                    <a href="#" class="sq-link" data-title="Mission 5" data-desc="Fostering innovation and sustainable digital ecosystems in healthcare." data-pills="Sustainability, Green Tech, Ecosystem" data-img="https://emi1au.github.io/annual/img/M5.png">Mission 5</a>
                </div>
                <div class="sq-col-mid">
                    <div class="sq-col-title">Explore</div>
                    <div class="sq-mid-content">
                        <a href="#" class="sq-mid-title sq-mid-title-link"><span class="sq-mid-title-text">Mission 1</span> <span>→</span></a>
                        <p class="sq-mid-desc">Delivering high-quality digital services that support patient care across Wales.</p>
                        <div class="sq-pills"><span class="sq-pill">Patient Care</span><span class="sq-pill">Digital Health</span><span class="sq-pill">Systems</span></div>
                    </div>
                </div>
                <div class="sq-col-right"><div class="sq-img-wrapper"><img src="https://emi1au.github.io/annual/img/M1.png" class="sq-img" alt="Feature Image"></div></div>
            </div>
        </div>

        <div class="sq-modal-container" id="modal-accountability" role="dialog" aria-modal="true" aria-label="Accountability Menu">
            <div class="sq-modal-inner">
                <div class="sq-col-left">
                    <div class="sq-col-title">Reports</div>
                    <a href="#" class="sq-link active" data-title="Accountability Report" data-desc="Comprehensive review of operational and financial accountability." data-pills="Financials, Operations, Oversight" data-img="https://emi1au.github.io/annual/img/A1.png">Accountability Report</a>
                    <a href="#" class="sq-link" data-title="Annual Gov. Statement" data-desc="Frameworks and controls managing our corporate risks." data-pills="Risk, Compliance, Controls" data-img="https://emi1au.github.io/annual/img/A2.png">Annual Governance Statement</a>
                    <a href="#" class="sq-link" data-title="Information Governance" data-desc="Ensuring strict compliance and security for patient data." data-pills="Data Privacy, Security, Compliance" data-img="https://emi1au.github.io/annual/img/A3.png">Information Governance</a>
                    <a href="#" class="sq-link" data-title="Director’s Report" data-desc="Strategic updates and responsibilities from our leadership." data-pills="Leadership, Strategy, Vision" data-img="https://emi1au.github.io/annual/img/A4.png">Director’s Report</a>
                    <a href="#" class="sq-link" data-title="Governance Statement" data-desc="Outlining our governance structure and board activities." data-pills="Board, Structure, Activities" data-img="https://emi1au.github.io/annual/img/A5.png">Governance Statement</a>
                    <a href="#" class="sq-link" data-title="Directors’ Responsibilities" data-desc="Duties and ethical standards upheld by our directors." data-pills="Ethics, Standards, Duties" data-img="https://emi1au.github.io/annual/img/A6.png">Directors’ Responsibilities</a>
                    <a href="#" class="sq-link" data-title="Remuneration" data-desc="Policy and metrics regarding staff and executive pay." data-pills="Pay Policy, Executives, Metrics" data-img="https://emi1au.github.io/annual/img/A7.png">Remuneration</a>
                    <a href="#" class="sq-link" data-title="Staff Report" data-desc="Metrics on workforce, diversity, and organizational culture." data-pills="Diversity, Culture, Metrics" data-img="https://emi1au.github.io/annual/img/A8.png">Staff Report</a>
                    <a href="#" class="sq-link" data-title="Audit Report" data-desc="Independent assessment of our financial statements." data-pills="Independent, Assessment, Financials" data-img="https://emi1au.github.io/annual/img/A9.png">Audit Report</a>
                </div>
                <div class="sq-col-mid">
                    <div class="sq-col-title">Explore</div>
                    <div class="sq-mid-content">
                        <a href="#" class="sq-mid-title sq-mid-title-link"><span class="sq-mid-title-text">Accountability Report</span> <span>→</span></a>
                        <p class="sq-mid-desc">Comprehensive review of operational and financial accountability.</p>
                        <div class="sq-pills"><span class="sq-pill">Financials</span><span class="sq-pill">Operations</span><span class="sq-pill">Oversight</span></div>
                    </div>
                </div>
                <div class="sq-col-right"><div class="sq-img-wrapper"><img src="https://emi1au.github.io/annual/img/A1.png" class="sq-img" alt="Feature Image"></div></div>
            </div>
        </div>
    </header>

    <!-- MOBILE NAVIGATION OVERLAY -->
    <div class="mobile-nav-overlay" id="mobile-nav-overlay" role="dialog" aria-modal="true">
        <div class="mobile-nav-content">
            <div class="mob-nav-item"><a href="#foreword" class="mob-nav-link">Foreword</a></div>
            
            <div class="mob-nav-item">
                <button class="mob-nav-link mob-accordion-toggle">Performance <svg class="chevron" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg></button>
                <div class="mob-sub-menu">
                    <div class="mob-sub-menu-inner">
                        <a href="#" class="mob-sub-link" data-title="Mission 1" data-desc="Delivering high-quality digital services that support patient care across Wales." data-pills="Patient Care, Digital Health, Systems" data-img="https://emi1au.github.io/annual/img/M1.png">Mission 1</a>
                        <a href="#" class="mob-sub-link" data-title="Mission 2" data-desc="Empowering healthcare professionals with modern, reliable technology." data-pills="Workforce, Innovation, Equipment" data-img="https://emi1au.github.io/annual/img/M2.png">Mission 2</a>
                        <a href="#" class="mob-sub-link" data-title="Mission 3" data-desc="Harnessing data for better health outcomes and operational efficiency." data-pills="Data Science, Analytics, Research" data-img="https://emi1au.github.io/annual/img/M3.png">Mission 3</a>
                        <a href="#" class="mob-sub-link" data-title="Mission 4" data-desc="Enhancing cybersecurity and resilience within the NHS network." data-pills="Cybersecurity, Resilience, Infrastructure" data-img="https://emi1au.github.io/annual/img/M4.png">Mission 4</a>
                        <a href="#" class="mob-sub-link" data-title="Mission 5" data-desc="Fostering innovation and sustainable digital ecosystems in healthcare." data-pills="Sustainability, Green Tech, Ecosystem" data-img="https://emi1au.github.io/annual/img/M5.png">Mission 5</a>
                    </div>
                </div>
            </div>

            <div class="mob-nav-item">
                <button class="mob-nav-link mob-accordion-toggle">Accountability <svg class="chevron" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg></button>
                <div class="mob-sub-menu">
                    <div class="mob-sub-menu-inner">
                        <a href="#" class="mob-sub-link" data-title="Accountability Report" data-desc="Comprehensive review of operational and financial accountability." data-pills="Financials, Operations, Oversight" data-img="https://emi1au.github.io/annual/img/A1.png">Accountability Report</a>
                        <a href="#" class="mob-sub-link" data-title="Annual Gov. Statement" data-desc="Frameworks and controls managing our corporate risks." data-pills="Risk, Compliance, Controls" data-img="https://emi1au.github.io/annual/img/A2.png">Annual Governance Statement</a>
                        <a href="#" class="mob-sub-link" data-title="Information Governance" data-desc="Ensuring strict compliance and security for patient data." data-pills="Data Privacy, Security, Compliance" data-img="https://emi1au.github.io/annual/img/A3.png">Information Governance</a>
                        <a href="#" class="mob-sub-link" data-title="Director’s Report" data-desc="Strategic updates and responsibilities from our leadership." data-pills="Leadership, Strategy, Vision" data-img="https://emi1au.github.io/annual/img/A4.png">Director’s Report</a>
                        <a href="#" class="mob-sub-link" data-title="Governance Statement" data-desc="Outlining our governance structure and board activities." data-pills="Board, Structure, Activities" data-img="https://emi1au.github.io/annual/img/A5.png">Governance Statement</a>
                        <a href="#" class="mob-sub-link" data-title="Directors’ Responsibilities" data-desc="Duties and ethical standards upheld by our directors." data-pills="Ethics, Standards, Duties" data-img="https://emi1au.github.io/annual/img/A6.png">Directors’ Responsibilities</a>
                        <a href="#" class="mob-sub-link" data-title="Remuneration" data-desc="Policy and metrics regarding staff and executive pay." data-pills="Pay Policy, Executives, Metrics" data-img="https://emi1au.github.io/annual/img/A7.png">Remuneration</a>
                        <a href="#" class="mob-sub-link" data-title="Staff Report" data-desc="Metrics on workforce, diversity, and organizational culture." data-pills="Diversity, Culture, Metrics" data-img="https://emi1au.github.io/annual/img/A8.png">Staff Report</a>
                        <a href="#" class="mob-sub-link" data-title="Audit Report" data-desc="Independent assessment of our financial statements." data-pills="Independent, Assessment, Financials" data-img="https://emi1au.github.io/annual/img/A9.png">Audit Report</a>
                    </div>
                </div>
            </div>
            
            <div class="mob-nav-item"><a href="#pdf" class="mob-nav-link">PDF Download</a></div>
        </div>

        <!-- Mobile Drill-down Detail Panel -->
        <div class="mobile-detail-panel" id="mobile-detail-panel">
            <div class="mob-detail-header">
                <button class="mob-back-btn" id="mob-back-btn" aria-label="Go back to menu">
                    <svg viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg> Explore
                </button>
            </div>
            <div class="mob-detail-content">
                <div class="mob-detail-img-wrap"><img id="mob-detail-img" src="" alt="Feature Image"></div>
                <h3 class="mob-detail-heading">
                    <a href="#" class="mob-detail-title" id="mob-detail-title-link"><span id="mob-detail-title-text">Title</span> →</a>
                </h3>
                <p class="mob-detail-desc" id="mob-detail-desc">Description goes here.</p>
                <div class="sq-pills" id="mob-detail-pills"></div>
            </div>
        </div>
    </div>
    `;

    // Inject into the page
    sidebarContainer.innerHTML = navHTML;

    // 2. INITIALIZE ALL NAVIGATION LOGIC

    // Header & Desktop Logic
    const header = document.getElementById("site-header");
    const navButtons = document.querySelectorAll(".desktop-nav .nav-item > button");
    const modalContainers = document.querySelectorAll(".sq-modal-container");
    let lastScrollTop = 0, isModalOpen = false;

    window.addEventListener("scroll", () => {
        let st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > 50) header.classList.add("scrolled"); else header.classList.remove("scrolled");
        if (st > lastScrollTop && st > 150) { if (!isModalOpen) header.classList.add("hidden"); closeAllModals(); } 
        else header.classList.remove("hidden");
        lastScrollTop = st;
    });

    function openModal(targetId, btn) {
        modalContainers.forEach(m => m.classList.remove("active"));
        navButtons.forEach(b => b.setAttribute("aria-expanded", "false"));
        document.getElementById(`modal-${targetId}`).classList.add("active");
        btn.setAttribute("aria-expanded", "true");
        header.classList.add("modal-open");
        isModalOpen = true;
    }
    function closeAllModals() {
        modalContainers.forEach(m => m.classList.remove("active"));
        navButtons.forEach(b => b.setAttribute("aria-expanded", "false"));
        header.classList.remove("modal-open");
        isModalOpen = false;
    }
    
    navButtons.forEach(btn => btn.addEventListener("click", e => {
        e.stopPropagation(); if (btn.getAttribute("aria-expanded") === "true") closeAllModals(); else openModal(btn.getAttribute("data-target"), btn);
    }));
    
    document.addEventListener("click", (e) => { if (isModalOpen && !header.contains(e.target)) closeAllModals(); });

    // Desktop Dynamic Hover & Click
    document.querySelectorAll('.sq-link').forEach(link => {
        
        // Prevent jumping to top if href is still "#"
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href') === '#') e.preventDefault();
        });

        link.addEventListener('mouseenter', function() {
            const wrapper = this.closest('.sq-modal-inner');
            wrapper.querySelectorAll('.sq-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Text and image updates
            wrapper.querySelector('.sq-mid-title-text').textContent = this.getAttribute('data-title');
            wrapper.querySelector('.sq-mid-desc').textContent = this.getAttribute('data-desc');
            const imgEl = wrapper.querySelector('.sq-img');
            if(imgEl.src !== this.getAttribute('data-img')) { imgEl.style.opacity = 0; setTimeout(() => { imgEl.src = this.getAttribute('data-img'); imgEl.style.opacity = 1; }, 200); }
            
            // Sync up the href of the "Explore" link
            const midTitleLink = wrapper.querySelector('.sq-mid-title-link');
            if (midTitleLink) midTitleLink.setAttribute('href', this.getAttribute('href'));

            const pillsContainer = wrapper.querySelector('.sq-pills');
            pillsContainer.innerHTML = '';
            const pillsData = this.getAttribute('data-pills');
            if (pillsData) {
                pillsData.split(',').forEach(pText => {
                    const span = document.createElement('span'); span.className = 'sq-pill'; span.textContent = pText.trim(); pillsContainer.appendChild(span);
                });
            }
        });
    });

    // Mobile Navigation Logic
    const mobileToggleBtn = document.getElementById("mobile-toggle-btn");
    const mobileNavOverlay = document.getElementById("mobile-nav-overlay");
    const mobileDetailPanel = document.getElementById("mobile-detail-panel");
    const mobileBackBtn = document.getElementById("mob-back-btn");
    let isMobileNavOpen = false;

    mobileToggleBtn.addEventListener("click", () => {
        isMobileNavOpen = !isMobileNavOpen;
        if (isMobileNavOpen) {
            mobileNavOverlay.classList.add("active");
            mobileToggleBtn.classList.add("is-active"); 
            document.body.classList.add("nav-open");
            mobileToggleBtn.setAttribute("aria-expanded", "true");
            mobileToggleBtn.setAttribute("aria-label", "Close mobile menu");
        } else {
            mobileNavOverlay.classList.remove("active");
            mobileDetailPanel.classList.remove("active");
            mobileToggleBtn.classList.remove("is-active"); 
            document.body.classList.remove("nav-open");
            mobileToggleBtn.setAttribute("aria-expanded", "false");
            mobileToggleBtn.setAttribute("aria-label", "Open mobile menu");
        }
    });

    // Mobile Accordion
    document.querySelectorAll('.mob-accordion-toggle').forEach(btn => {
        btn.addEventListener('click', function() {
            const parentItem = this.parentElement;
            const subMenu = parentItem.querySelector('.mob-sub-menu');
            parentItem.classList.toggle('active');
            if (parentItem.classList.contains('active')) {
                subMenu.style.maxHeight = subMenu.scrollHeight + "px";
            } else {
                subMenu.style.maxHeight = "0";
            }
        });
    });

    // Mobile Drill-down Detail Trigger
    document.querySelectorAll('.mob-sub-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Always prevent default so we can open the panel
            
            document.getElementById('mob-detail-title-text').textContent = this.getAttribute('data-title');
            document.getElementById('mob-detail-desc').textContent = this.getAttribute('data-desc');
            document.getElementById('mob-detail-img').src = this.getAttribute('data-img');
            
            // Sync up the drill-down title link with this sublink's href!
            const detailTitleLink = document.getElementById('mob-detail-title-link');
            if (detailTitleLink) detailTitleLink.setAttribute('href', this.getAttribute('href'));

            const pillsContainer = document.getElementById('mob-detail-pills');
            pillsContainer.innerHTML = '';
            const pillsData = this.getAttribute('data-pills');
            if (pillsData) {
                pillsData.split(',').forEach(pText => {
                    const span = document.createElement('span'); span.className = 'sq-pill'; span.textContent = pText.trim(); pillsContainer.appendChild(span);
                });
            }
            mobileDetailPanel.classList.add("active");
        });
    });

    mobileBackBtn.addEventListener('click', () => { mobileDetailPanel.classList.remove("active"); });

    // Responsive Close Handling
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 1024) {
            if (isModalOpen) closeAllModals(); 
        } else {
            if (isMobileNavOpen) { 
                isMobileNavOpen = false;
                mobileNavOverlay.classList.remove("active");
                mobileDetailPanel.classList.remove("active");
                mobileToggleBtn.classList.remove("is-active"); 
                document.body.classList.remove("nav-open");
                mobileToggleBtn.setAttribute("aria-expanded", "false");
            }
        }
    });
});
