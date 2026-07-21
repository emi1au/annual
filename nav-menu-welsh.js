document.addEventListener("DOMContentLoaded", () => {
    
    const sidebarContainer = document.getElementById("sidebar-container");
    
    // If the container doesn't exist on the page, stop the script
    if (!sidebarContainer) return;

    // 1. INJECT THE HTML (Welsh Version with English Hyperlink)
    const navHTML = `
    <!-- NAVIGATION HEADER -->
    <header class="site-header" id="site-header">
        <div class="nav-container">
            <div class="watermark">IGDC</div>
            
            <!-- DESKTOP NAV -->
            <nav aria-label="Prif Ddewislen" class="desktop-nav">
                <ul style="display: flex; gap: 2.5rem; list-style: none;">
                    <li class="nav-item"><a href="https://igdc.gig.cymru/rhagair-2026">Rhagair</a></li>
                    <li class="nav-item"><button aria-expanded="false" aria-controls="modal-performance" data-target="performance">Perfformiad <svg class="chevron" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg></button></li>
                    <li class="nav-item"><button aria-expanded="false" aria-controls="modal-accountability" data-target="accountability">Atebolrwydd <svg class="chevron" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg></button></li>
                    <li class="nav-item"><a href="https://igdc.gig.cymru/rhagair-2026/dhcw-igdc-annual-report-2025-2026-cymraeg-final-pdf/">PDF</a></li>
                </ul>
            </nav>

            <!-- RIGHT ALIGNED TOGGLES -->
            <div class="header-right">
                <a href="https://dhcw.nhs.wales/annual-report-2026/" class="lang-btn" aria-label="Cyfieithu i'r Saesneg">English</a>
                <!-- Animated Hamburger Toggle -->
                <button class="mobile-toggle" id="mobile-toggle-btn" aria-label="Agor y ddewislen symudol" aria-expanded="false">
                    <span class="hamburger-line"></span>
                    <span class="hamburger-line"></span>
                    <span class="hamburger-line"></span>
                </button>
            </div>
        </div>

        <!-- DESKTOP SQUARESPACE MODALS -->
        <div class="sq-modal-container" id="modal-performance" role="dialog" aria-modal="true" aria-label="Dewislen Perfformiad">
            <div class="sq-modal-inner">
                <div class="sq-col-left">
                    <div class="sq-col-title">Cenadaethau</div>
                    <a href="https://igdc.gig.cymru/rhagair-2026/perfformiad-cyffredinol" class="sq-link active" data-title="Trosolwg" data-desc="Trosolwg o'n cyflawniadau perfformiad, nodau, a metrigau dros y flwyddyn." data-img="https://emi1au.github.io/annual/img/P1.jpeg">Trosolwg</a>
                    <a href="https://igdc.gig.cymru/rhagair-2026/perfformiad-cyffredinol/Cenhadaeth-1" class="sq-link" data-title="Cenhadaeth 1" data-desc="Darparu llwyfan ar gyfer galluogi trawsnewid digidol" data-img="https://emi1au.github.io/annual/img/M1.png">Cenhadaeth 1</a>
                    <a href="https://igdc.gig.cymru/rhagair-2026/perfformiad-cyffredinol/Cenhadaeth-2" class="sq-link" data-title="Cenhadaeth 2" data-desc="Darparu cynhyrchion a gwasanaethau digidol o ansawdd uchel" data-img="https://emi1au.github.io/annual/img/M2.png">Cenhadaeth 2</a>
                    <a href="https://igdc.gig.cymru/rhagair-2026/perfformiad-cyffredinol/Cenhadaeth-3" class="sq-link" data-title="Cenhadaeth 3" data-desc="Ehangu'r cofnod iechyd a gofal digidol a'r defnydd o ddigidol i wella iechyd a gofal" data-img="https://emi1au.github.io/annual/img/M3.png">Cenhadaeth 3</a>
                    <a href="https://igdc.gig.cymru/rhagair-2026/perfformiad-cyffredinol/Cenhadaeth-4" class="sq-link" data-title="Cenhadaeth 4" data-desc="Ysgogi gwell gwerthoedd a chanlyniadau trwy arloesi" data-img="https://emi1au.github.io/annual/img/M4.png">Cenhadaeth 4</a>
                    <a href="https://igdc.gig.cymru/rhagair-2026/perfformiad-cyffredinol/Cenhadaeth-5" class="sq-link" data-title="Cenhadaeth 5" data-desc="Bod yn bartner strategol dibynadwy ac yn sefydliad uchelgeisiol, cynhwysol ac o ansawdd uchel" data-img="https://emi1au.github.io/annual/img/M5.png">Cenhadaeth 5</a>
                </div>
                <div class="sq-col-mid">
                    <div class="sq-col-title">Archwilio</div>
                    <div class="sq-mid-content">
                        <a href="https://igdc.gig.cymru/rhagair-2026/perfformiad-cyffredinol" class="sq-mid-title sq-mid-title-link"><span class="sq-mid-title-text">Trosolwg</span> <span>→</span></a>
                        <p class="sq-mid-desc">Trosolwg o'n cyflawniadau perfformiad, nodau, a metrigau dros y flwyddyn.</p>
                    </div>
                </div>
                <div class="sq-col-right"><div class="sq-img-wrapper"><img src="https://emi1au.github.io/annual/img/P1.jpeg" class="sq-img" alt="Feature Image"></div></div>
            </div>
        </div>

        <div class="sq-modal-container" id="modal-accountability" role="dialog" aria-modal="true" aria-label="Dewislen Atebolrwydd">
            <div class="sq-modal-inner">
                <div class="sq-col-left">
                    <div class="sq-col-title">Adroddiadau</div>
                    <a href="https://igdc.gig.cymru/rhagair-2026/adroddiad-atebolrwydd" class="sq-link active" data-title="Adroddiad Atebolrwydd" data-desc="Adolygiad cynhwysfawr o atebolrwydd gweithredol ac ariannol." data-img="https://emi1au.github.io/annual/img/A1.png">Adroddiad Atebolrwydd</a>
                    <a href="https://igdc.gig.cymru/rhagair-2026/adroddiad-atebolrwydd/datganiad-llywodraethu-blynyddol" class="sq-link" data-title="Datganiad Llywodraethu Blynyddol" data-desc="Fframweithiau a reolaethau sy'n rheoli ein risgiau corfforaethol." data-img="https://emi1au.github.io/annual/img/A2.png">Datganiad Llywodraethu Blynyddol</a>
                    <a href="https://igdc.gig.cymru/rhagair-2026/adroddiad-atebolrwydd/trefniadau-llywodraethu-gwybodaeth" class="sq-link" data-title="Trefniadau Llywodraethu Gwybodaeth" data-desc="Sicrhau cydymffurfiad llym a diogelwch i ddata cleifion." data-img="https://emi1au.github.io/annual/img/A3.png">Trefniadau Llywodraethu Gwybodaeth</a>
                    <a href="https://igdc.gig.cymru/rhagair-2026/adroddiad-atebolrwydd/adroddiad-cyfarwyddwyr" class="sq-link" data-title="Adroddiad y Cyfarwyddwyr" data-desc="Diweddariadau strategol a chyfrifoldebau gan ein harweinwyr." data-img="https://emi1au.github.io/annual/img/A4.png">Adroddiad y Cyfarwyddwyr</a>
                    <a href="https://igdc.gig.cymru/rhagair-2026/adroddiad-atebolrwydd/swyddog-atebol" class="sq-link" data-title="Swyddog Atebol" data-desc="Amlinellu cyfrifolbebau a throsolwg y Swyddog Atebol." data-img="https://emi1au.github.io/annual/img/A5.png">Swyddog Atebol</a>
                    <a href="https://igdc.gig.cymru/rhagair-2026/adroddiad-atebolrwydd/cyfrifoldebau-cyfarwyddwyr" class="sq-link" data-title="Cyfrifoldebau Cyfarwyddwyr" data-desc="Dyletswyddau a safonau moesegol a gynhelir gan ein cyfarwyddwyr." data-img="https://emi1au.github.io/annual/img/A6.png">Cyfrifoldebau Cyfarwyddwyr</a>
                    <a href="https://igdc.gig.cymru/rhagair-2026/adroddiad-atebolrwydd/remunerasiwn" class="sq-link" data-title="Remunerasiwn" data-desc="Polisi a metrigau ynghylch cyflogau staff a gweithredwyr." data-img="https://emi1au.github.io/annual/img/A7.png">Remunerasiwn</a>
                    <a href="https://igdc.gig.cymru/rhagair-2026/adroddiad-atebolrwydd/adroddiad-staff" class="sq-link" data-title="Adroddiad Staff" data-desc="Metrigau ar y gweithlu, amrywiaeth, a diwylliant sefydliadol." data-img="https://emi1au.github.io/annual/img/A8.png">Adroddiad Staff</a>
                    <a href="https://igdc.gig.cymru/rhagair-2026/adroddiad-atebolrwydd/DHCW-IGDC-Annual-Report-2025-2026-Welsh-Accountability-Audit-Report-" class="sq-link" data-title="Adroddiad Archwilio" data-desc="Asesiad annibynnol o'n datganiadau ariannol." data-img="https://emi1au.github.io/annual/img/A9.png">Adroddiad Archwilio</a>
                </div>
                <div class="sq-col-mid">
                    <div class="sq-col-title">Archwilio</div>
                    <div class="sq-mid-content">
                        <a href="https://igdc.gig.cymru/rhagair-2026/adroddiad-atebolrwydd" class="sq-mid-title sq-mid-title-link"><span class="sq-mid-title-text">Adroddiad Atebolrwydd</span> <span>→</span></a>
                        <p class="sq-mid-desc">Adolygiad cynhwysfawr o atebolrwydd gweithredol ac ariannol.</p>
                    </div>
                </div>
                <div class="sq-col-right"><div class="sq-img-wrapper"><img src="https://emi1au.github.io/annual/img/A1.png" class="sq-img" alt="Feature Image"></div></div>
            </div>
        </div>
    </header>

    <!-- MOBILE NAVIGATION OVERLAY -->
    <div class="mobile-nav-overlay" id="mobile-nav-overlay" role="dialog" aria-modal="true">
        <div class="mobile-nav-content">
            <div class="mob-nav-item"><a href="https://igdc.gig.cymru/rhagair-2026" class="mob-nav-link">Rhagair</a></div>
            
            <div class="mob-nav-item">
                <button class="mob-nav-link mob-accordion-toggle">Perfformiad <svg class="chevron" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg></button>
                <div class="mob-sub-menu">
                    <div class="mob-sub-menu-inner">
                        <a href="https://igdc.gig.cymru/rhagair-2026/perfformiad-cyffredinol" class="mob-sub-link" data-title="Trosolwg" data-desc="Trosolwg o'n cyflawniadau perfformiad, nodau, a metrigau dros y flwyddyn." data-img="https://emi1au.github.io/annual/img/P1.jpeg">Trosolwg</a>
                        <a href="https://igdc.gig.cymru/rhagair-2026/perfformiad-cyffredinol/Cenhadaeth-1" class="mob-sub-link" data-title="Cenhadaeth 1" data-desc="Darparu llwyfan ar gyfer galluogi trawsnewid digidol" data-img="https://emi1au.github.io/annual/img/M1.png">Cenhadaeth 1</a>
                        <a href="https://igdc.gig.cymru/rhagair-2026/perfformiad-cyffredinol/Cenhadaeth-2" class="mob-sub-link" data-title="Cenhadaeth 2" data-desc="Darparu cynhyrchion a gwasanaethau digidol o ansawdd uchel" data-img="https://emi1au.github.io/annual/img/M2.png">Cenhadaeth 2</a>
                        <a href="https://igdc.gig.cymru/rhagair-2026/perfformiad-cyffredinol/Cenhadaeth-3" class="mob-sub-link" data-title="Cenhadaeth 3" data-desc="Ehangu'r cofnod iechyd a gofal digidol a'r defnydd o ddigidol i wella iechyd a gofal" data-img="https://emi1au.github.io/annual/img/M3.png">Cenhadaeth 3</a>
                        <a href="https://igdc.gig.cymru/rhagair-2026/perfformiad-cyffredinol/Cenhadaeth-4" class="mob-sub-link" data-title="Cenhadaeth 4" data-desc="Ysgogi gwell gwerthoedd a chanlyniadau trwy arloesi" data-img="https://emi1au.github.io/annual/img/M4.png">Cenhadaeth 4</a>
                        <a href="https://igdc.gig.cymru/rhagair-2026/perfformiad-cyffredinol/Cenhadaeth-5" class="mob-sub-link" data-title="Cenhadaeth 5" data-desc="Bod yn bartner strategol dibynadwy ac yn sefydliad uchelgeisiol, cynhwysol ac o ansawdd uchel" data-img="https://emi1au.github.io/annual/img/M5.png">Cenhadaeth 5</a>
                    </div>
                </div>
            </div>

            <div class="mob-nav-item">
                <button class="mob-nav-link mob-accordion-toggle">Atebolrwydd <svg class="chevron" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg></button>
                <div class="mob-sub-menu">
                    <div class="mob-sub-menu-inner">
                        <a href="https://igdc.gig.cymru/rhagair-2026/adroddiad-atebolrwydd" class="mob-sub-link" data-title="Adroddiad Atebolrwydd" data-desc="Adolygiad cynhwysfawr o atebolrwydd gweithredol ac ariannol." data-img="https://emi1au.github.io/annual/img/A1.png">Adroddiad Atebolrwydd</a>
                        <a href="https://igdc.gig.cymru/rhagair-2026/adroddiad-atebolrwydd/datganiad-llywodraethu-blynyddol" class="mob-sub-link" data-title="Datganiad Llywodraethu Blynyddol" data-desc="Fframweithiau a reolaethau sy'n rheoli ein risgiau corfforaethol." data-img="https://emi1au.github.io/annual/img/A2.png">Datganiad Llywodraethu Blynyddol</a>
                        <a href="https://igdc.gig.cymru/rhagair-2026/adroddiad-atebolrwydd/trefniadau-llywodraethu-gwybodaeth" class="mob-sub-link" data-title="Trefniadau Llywodraethu Gwybodaeth" data-desc="Sicrhau cydymffurfiad llym a diogelwch i ddata cleifion." data-img="https://emi1au.github.io/annual/img/A3.png">Trefniadau Llywodraethu Gwybodaeth</a>
                        <a href="https://igdc.gig.cymru/rhagair-2026/adroddiad-atebolrwydd/adroddiad-cyfarwyddwyr" class="mob-sub-link" data-title="Adroddiad y Cyfarwyddwyr" data-desc="Diweddariadau strategol a chyfrifoldebau gan ein harweinwyr." data-img="https://emi1au.github.io/annual/img/A4.png">Adroddiad y Cyfarwyddwyr</a>
                        <a href="https://igdc.gig.cymru/rhagair-2026/adroddiad-atebolrwydd/swyddog-atebol" class="mob-sub-link" data-title="Swyddog Atebol" data-desc="Amlinellu cyfrifolbebau a throsolwg y Swyddog Atebol." data-img="https://emi1au.github.io/annual/img/A5.png">Swyddog Atebol</a>
                        <a href="https://igdc.gig.cymru/rhagair-2026/adroddiad-atebolrwydd/cyfrifoldebau-cyfarwyddwyr" class="mob-sub-link" data-title="Cyfrifoldebau Cyfarwyddwyr" data-desc="Dyletswyddau a safonau moesegol a gynhelir gan ein cyfarwyddwyr." data-img="https://emi1au.github.io/annual/img/A6.png">Cyfrifoldebau Cyfarwyddwyr</a>
                        <a href="https://igdc.gig.cymru/rhagair-2026/adroddiad-atebolrwydd/remunerasiwn" class="mob-sub-link" data-title="Remunerasiwn" data-desc="Polisi a metrigau ynghylch cyflogau staff a gweithredwyr." data-img="https://emi1au.github.io/annual/img/A7.png">Remunerasiwn</a>
                        <a href="https://igdc.gig.cymru/rhagair-2026/adroddiad-atebolrwydd/adroddiad-staff" class="mob-sub-link" data-title="Adroddiad Staff" data-desc="Metrigau ar y gweithlu, amrywiaeth, a diwylliant sefydliadol." data-img="https://emi1au.github.io/annual/img/A8.png">Adroddiad Staff</a>
                        <a href="https://igdc.gig.cymru/rhagair-2026/adroddiad-atebolrwydd/DHCW-IGDC-Annual-Report-2025-2026-Welsh-Accountability-Audit-Report-" class="mob-sub-link" data-title="Adroddiad Archwilio" data-desc="Asesiad annibynnol o'n datganiadau ariannol." data-img="https://emi1au.github.io/annual/img/A9.png">Adroddiad Archwilio</a>
                    </div>
                </div>
            </div>
            
            <div class="mob-nav-item"><a href="https://igdc.gig.cymru/rhagair-2026/dhcw-igdc-annual-report-2025-2026-cymraeg-final-pdf/" class="mob-nav-link">Lawrlwytho PDF</a></div>
        </div>

        <!-- Mobile Drill-down Detail Panel -->
        <div class="mobile-detail-panel" id="mobile-detail-panel">
            <div class="mob-detail-header">
                <button class="mob-back-btn" id="mob-back-btn" aria-label="Mynd yn ôl i'r ddewislen">
                    <svg viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg> Archwilio
                </button>
            </div>
            <div class="mob-detail-content">
                <div class="mob-detail-img-wrap"><img id="mob-detail-img" src="" alt="Feature Image"></div>
                <h3 class="mob-detail-heading">
                    <a href="#" class="mob-detail-title" id="mob-detail-title-link"><span id="mob-detail-title-text">Teitl</span> →</a>
                </h3>
                <p class="mob-detail-desc" id="mob-detail-desc">Mae'r disgrifiad yn mynd yma.</p>
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
            mobileToggleBtn.setAttribute("aria-label", "Cau'r ddewislen symudol");
        } else {
            mobileNavOverlay.classList.remove("active");
            mobileDetailPanel.classList.remove("active");
            mobileToggleBtn.classList.remove("is-active"); 
            document.body.classList.remove("nav-open");
            mobileToggleBtn.setAttribute("aria-expanded", "false");
            mobileToggleBtn.setAttribute("aria-label", "Agor y ddewislen symudol");
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
