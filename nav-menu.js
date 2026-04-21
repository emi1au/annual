document.addEventListener("DOMContentLoaded", () => {
    
    const sidebarContainer = document.getElementById("sidebar-container");
    
    // If the container doesn't exist on the page, stop the script
    if (!sidebarContainer) return;

    // 1. INJECT THE HTML
    // Note: To change images, change "m1.png" etc to your full GitHub raw URLs if they break on sub-pages
    // Example: "https://emi1au.github.io/annual/images/m1.png"
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
                <button class="mobile-toggle" id="mobile-toggle-btn" aria-label="Open mobile menu" aria-expanded="false">☰</button>
            </div>
        </div>

        <!-- DESKTOP SQUARESPACE MODALS -->
        <div class="sq-modal-container" id="modal-performance" role="dialog" aria-modal="true" aria-label="Performance Menu">
            <div class="sq-modal-inner">
                <div class="sq-col-left">
                    <div class="sq-col-title">Missions</div>
                    <button class="sq-link active" data-title="Mission 1" data-desc="Delivering high-quality digital services that support patient care across Wales." data-pills="Patient Care, Digital Health, Systems" data-img="img/m1.png">Mission 1</button>
                    <button class="sq-link" data-title="Mission 2" data-desc="Empowering healthcare professionals with modern, reliable technology." data-pills="Workforce, Innovation, Equipment" data-img="img/m2.png">Mission 2</button>
                    <button class="sq-link" data-title="Mission 3" data-desc="Harnessing data for better health outcomes and operational efficiency." data-pills="Data Science, Analytics, Research" data-img="img/m3.png">Mission 3</button>
                    <button class="sq-link" data-title="Mission 4" data-desc="Enhancing cybersecurity and resilience within the NHS network." data-pills="Cybersecurity, Resilience, Infrastructure" data-img="img/m4.png">Mission 4</button>
                    <button class="sq-link" data-title="Mission 5" data-desc="Fostering innovation and sustainable digital ecosystems in healthcare." data-pills="Sustainability, Green Tech, Ecosystem" data-img="img/m5.png">Mission 5</button>
                </div>
                <div class="sq-col-mid">
                    <div class="sq-col-title">Explore</div>
                    <div class="sq-mid-content">
                        <div class="sq-mid-title"><span class="sq-mid-title-text">Mission 1</span> <span>→</span></div>
                        <p class="sq-mid-desc">Delivering high-quality digital services that support patient care across Wales.</p>
                        <div class="sq-pills"><span class="sq-pill">Patient Care</span><span class="sq-pill">Digital Health</span><span class="sq-pill">Systems</span></div>
                    </div>
                </div>
                <div class="sq-col-right"><div class="sq-img-wrapper"><img src="m1.png" class="sq-img" alt="Feature Image"></div></div>
            </div>
        </div>

        <div class="sq-modal-container" id="modal-accountability" role="dialog" aria-modal="true" aria-label="Accountability Menu">
            <div class="sq-modal-inner">
                <div class="sq-col-left">
                    <div class="sq-col-title">Reports</div>
                    <button class="sq-link active" data-title="Accountability Report" data-desc="Comprehensive review of operational and financial accountability." data-pills="Financials, Operations, Oversight" data-img="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=600&q=80">Accountability Report</button>
                    <button class="sq-link" data-title="Annual Gov. Statement" data-desc="Frameworks and controls managing our corporate risks." data-pills="Risk, Compliance, Controls" data-img="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80">Annual Governance Statement</button>
                    <button class="sq-link" data-title="Information Governance" data-desc="Ensuring strict compliance and security for patient data." data-pills="Data Privacy, Security, Compliance" data-img="https://images.unsplash.com/photo-1614064641913-6b70fea566d0?auto=format&fit=crop&w=600&q=80">Information Governance</button>
                    <button class="sq-link" data-title="Director’s Report" data-desc="Strategic updates and responsibilities from our leadership." data-pills="Leadership, Strategy, Vision" data-img="https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&w=600&q=80">Director’s Report</button>
                    <button class="sq-link" data-title="Governance Statement" data-desc="Outlining our governance structure and board activities." data-pills="Board, Structure, Activities" data-img="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80">Governance Statement</button>
                    <button class="sq-link" data-title="Directors’ Responsibilities" data-desc="Duties and ethical standards upheld by our directors." data-pills="Ethics, Standards, Duties" data-img="https://images.unsplash.com/photo-1434626881859-194d67b2b86f?auto=format&fit=crop&w=600&q=80">Directors’ Responsibilities</button>
                    <button class="sq-link" data-title="Remuneration" data-desc="Policy and metrics regarding staff and executive pay." data-pills="Pay Policy, Executives, Metrics" data-img="https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=600&q=80">Remuneration</button>
                    <button class="sq-link" data-title="Staff Report" data-desc="Metrics on workforce, diversity, and organizational culture." data-pills="Diversity, Culture, Metrics" data-img="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80">Staff Report</button>
                    <button class="sq-link" data-title="Audit Report" data-desc="Independent assessment of our financial statements." data-pills="Independent, Assessment, Financials" data-img="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80">Audit Report</button>
                </div>
                <div class="sq-col-mid">
                    <div class="sq-col-title">Explore</div>
                    <div class="sq-mid-content">
                        <div class="sq-mid-title"><span class="sq-mid-title-text">Accountability Report</span> <span>→</span></div>
                        <p class="sq-mid-desc">Comprehensive review of operational and financial accountability.</p>
                        <div class="sq-pills"><span class="sq-pill">Financials</span><span class="sq-pill">Operations</span><span class="sq-pill">Oversight</span></div>
                    </div>
                </div>
                <div class="sq-col-right"><div class="sq-img-wrapper"><img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=600&q=80" class="sq-img" alt="Feature Image"></div></div>
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
                        <button class="mob-sub-link" data-title="Mission 1" data-desc="Delivering high-quality digital services that support patient care across Wales." data-pills="Patient Care, Digital Health, Systems" data-img="img/m1.png">Mission 1</button>
                        <button class="mob-sub-link" data-title="Mission 2" data-desc="Empowering healthcare professionals with modern, reliable technology." data-pills="Workforce, Innovation, Equipment" data-img="img/m2.png">Mission 2</button>
                        <button class="mob-sub-link" data-title="Mission 3" data-desc="Harnessing data for better health outcomes and operational efficiency." data-pills="Data Science, Analytics, Research" data-img="img/m3.png">Mission 3</button>
                        <button class="mob-sub-link" data-title="Mission 4" data-desc="Enhancing cybersecurity and resilience within the NHS network." data-pills="Cybersecurity, Resilience, Infrastructure" data-img="img/m4.png">Mission 4</button>
                        <button class="mob-sub-link" data-title="Mission 5" data-desc="Fostering innovation and sustainable digital ecosystems in healthcare." data-pills="Sustainability, Green Tech, Ecosystem" data-img="img/m5.png">Mission 5</button>
                    </div>
                </div>
            </div>

            <div class="mob-nav-item">
                <button class="mob-nav-link mob-accordion-toggle">Accountability <svg class="chevron" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg></button>
                <div class="mob-sub-menu">
                    <div class="mob-sub-menu-inner">
                        <button class="mob-sub-link" data-title="Accountability Report" data-desc="Comprehensive review of operational and financial accountability." data-pills="Financials, Operations, Oversight" data-img="img/A1.png">Accountability Report</button>
                        <button class="mob-sub-link" data-title="Annual Gov. Statement" data-desc="Frameworks and controls managing our corporate risks." data-pills="Risk, Compliance, Controls" data-img="img/A2.png">Annual Governance Statement</button>
                        <button class="mob-sub-link" data-title="Information Governance" data-desc="Ensuring strict compliance and security for patient data." data-pills="Data Privacy, Security, Compliance" data-img="img/A3.png">Information Governance</button>
                        <button class="mob-sub-link" data-title="Director’s Report" data-desc="Strategic updates and responsibilities from our leadership." data-pills="Leadership, Strategy, Vision" data-img="img/A4.png">Director’s Report</button>
                        <button class="mob-sub-link" data-title="Governance Statement" data-desc="Outlining our governance structure and board activities." data-pills="Board, Structure, Activities" data-img="img/A5.png">Governance Statement</button>
                        <button class="mob-sub-link" data-title="Directors’ Responsibilities" data-desc="Duties and ethical standards upheld by our directors." data-pills="Ethics, Standards, Duties" data-img="img/A6.png">Directors’ Responsibilities</button>
                        <button class="mob-sub-link" data-title="Remuneration" data-desc="Policy and metrics regarding staff and executive pay." data-pills="Pay Policy, Executives, Metrics" data-img="img/A7.png">Remuneration</button>
                        <button class="mob-sub-link" data-title="Staff Report" data-desc="Metrics on workforce, diversity, and organizational culture." data-pills="Diversity, Culture, Metrics" data-img="img/A8.png">Staff Report</button>
                        <button class="mob-sub-link" data-title="Audit Report" data-desc="Independent assessment of our financial statements." data-pills="Independent, Assessment, Financials" data-img="img/A9.png">Audit Report</button>
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
                <h3 class="mob-detail-title"><span id="mob-detail-title-text">Title</span> →</h3>
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

    // Desktop Dynamic Hover
    document.querySelectorAll('.sq-link').forEach(link => {
        link.addEventListener('mouseenter', function() {
            const wrapper = this.closest('.sq-modal-inner');
            wrapper.querySelectorAll('.sq-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            wrapper.querySelector('.sq-mid-title-text').textContent = this.getAttribute('data-title');
            wrapper.querySelector('.sq-mid-desc').textContent = this.getAttribute('data-desc');
            const imgEl = wrapper.querySelector('.sq-img');
            if(imgEl.src !== this.getAttribute('data-img')) { imgEl.style.opacity = 0; setTimeout(() => { imgEl.src = this.getAttribute('data-img'); imgEl.style.opacity = 1; }, 200); }
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
            document.body.classList.add("nav-open");
            mobileToggleBtn.innerHTML = "✕";
            mobileToggleBtn.setAttribute("aria-expanded", "true");
            mobileToggleBtn.setAttribute("aria-label", "Close mobile menu");
        } else {
            mobileNavOverlay.classList.remove("active");
            mobileDetailPanel.classList.remove("active");
            document.body.classList.remove("nav-open");
            mobileToggleBtn.innerHTML = "☰";
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

    // Mobile Drill-down Detail
    document.querySelectorAll('.mob-sub-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); 
            document.getElementById('mob-detail-title-text').textContent = this.getAttribute('data-title');
            document.getElementById('mob-detail-desc').textContent = this.getAttribute('data-desc');
            document.getElementById('mob-detail-img').src = this.getAttribute('data-img');
            
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
                document.body.classList.remove("nav-open");
                mobileToggleBtn.innerHTML = "☰";
                mobileToggleBtn.setAttribute("aria-expanded", "false");
            }
        }
    });
});
