/* =========================================================
   KENYANKRABZ PORTFOLIO CMS
   Public Website Content Loader
   ========================================================= */

(function () {
    "use strict";

    let cmsData = {
        settings: null,
        about: null,
        aboutItems: [],
        stats: [],
        certificates: [],
        timeline: [],
        origins: [],
        projects: [],
        projectImages: [],
        gallery: [],
        socials: [],
        sections: [],
        customSections: []
    };

    /* =====================================================
       HELPERS
       ===================================================== */

    function escapeHTML(value) {
        if (value === null || value === undefined) {
            return "";
        }

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function safeUrl(url) {
        if (!url) {
            return "#";
        }

        try {
            const parsed = new URL(
                String(url),
                window.location.origin
            );

            if (
                parsed.protocol === "http:" ||
                parsed.protocol === "https:" ||
                parsed.protocol === "mailto:" ||
                parsed.protocol === "tel:" ||
                parsed.protocol === "sms:"
            ) {
                return parsed.href;
            }

            return "#";

        } catch {
            return "#";
        }
    }

    function safeEmail(email) {
        if (!email) {
            return "#";
        }

        return `mailto:${String(email).trim()}`;
    }

    function safeText(value, fallback = "") {
        if (
            value === null ||
            value === undefined ||
            String(value).trim() === ""
        ) {
            return fallback;
        }

        return String(value);
    }

    function getSection(sectionKey) {

        return cmsData.sections.find(
            section =>
                section.section_key === sectionKey
        );
    }

    function isSectionVisible(sectionKey) {

        const section =
            getSection(sectionKey);

        if (!section) {
            return true;
        }

        return section.visible !== false;
    }

    function hideSection(element, hidden) {

        if (!element) {
            return;
        }

        element.style.display =
            hidden ? "none" : "";
    }

    function sortByOrder(items) {

        return [...items].sort(
            (a, b) =>
                Number(a.display_order || 0) -
                Number(b.display_order || 0)
        );
    }

    /* =====================================================
       LOAD ALL CMS DATA
       ===================================================== */

    async function loadCMSData() {

        const queries = await Promise.all([

            /* 1. SITE SETTINGS */

            supabaseClient
                .from("site_settings")
                .select("*")
                .order(
                    "updated_at",
                    {
                        ascending: false
                    }
                )
                .limit(1),

            /* 2. ABOUT */

            supabaseClient
                .from("about")
                .select("*")
                .order(
                    "updated_at",
                    {
                        ascending: false
                    }
                )
                .limit(1),

            /* 3. ABOUT ITEMS */

            supabaseClient
                .from("about_items")
                .select("*")
                .order(
                    "display_order",
                    {
                        ascending: true
                    }
                ),

            /* 4. STATS */

            supabaseClient
                .from("stats")
                .select("*")
                .order(
                    "display_order",
                    {
                        ascending: true
                    }
                ),

            /* 5. CERTIFICATES */

            supabaseClient
                .from("certificates")
                .select("*")
                .order(
                    "display_order",
                    {
                        ascending: true
                    }
                ),

            /* 6. TIMELINE */

            supabaseClient
                .from("timeline")
                .select("*")
                .order(
                    "display_order",
                    {
                        ascending: true
                    }
                ),

            /* 7. COFFEE ORIGINS */

            supabaseClient
                .from("coffee_origins")
                .select("*")
                .order(
                    "display_order",
                    {
                        ascending: true
                    }
                ),

            /* 8. PROJECTS */

            supabaseClient
                .from("projects")
                .select("*")
                .order(
                    "display_order",
                    {
                        ascending: true
                    }
                ),

            /* 9. PROJECT IMAGES */

            supabaseClient
                .from("project_images")
                .select("*")
                .order(
                    "display_order",
                    {
                        ascending: true
                    }
                ),

            /* 10. GALLERY */

            supabaseClient
                .from("gallery")
                .select("*")
                .order(
                    "display_order",
                    {
                        ascending: true
                    }
                ),

            /* 11. SOCIAL LINKS */

            supabaseClient
                .from("social_links")
                .select("*")
                .eq("active", true)
                .order(
                    "display_order",
                    {
                        ascending: true
                    }
                ),

            /* 12. SECTIONS */

            supabaseClient
                .from("sections")
                .select("*")
                .order(
                    "display_order",
                    {
                        ascending: true
                    }
                ),

            /* 13. CUSTOM SECTIONS */

            supabaseClient
                .from("custom_sections")
                .select("*")

        ]);

        const names = [

            "settings",
            "about",
            "aboutItems",
            "stats",
            "certificates",
            "timeline",
            "origins",
            "projects",
            "projectImages",
            "gallery",
            "socials",
            "sections",
            "customSections"

        ];

        queries.forEach(
            (result, index) => {

                const name =
                    names[index];

                if (result.error) {

                    console.error(
                        `CMS error loading ${name}:`,
                        result.error
                    );

                    return;
                }

                if (
                    name === "settings" ||
                    name === "about"
                ) {

                    cmsData[name] =
                        result.data?.[0] ||
                        null;

                } else {

                    cmsData[name] =
                        result.data || [];
                }
            }
        );

        console.log(
            "✅ Kenyankrabz CMS data loaded"
        );

        console.log(
            cmsData
        );
    }

    /* =====================================================
       SITE SETTINGS
       ===================================================== */

    function renderSiteSettings() {

        const settings =
            cmsData.settings;

        if (!settings) {
            return;
        }

        /* PAGE TITLE */

        document.title =
            `${safeText(
                settings.site_name,
                "Kenyankrabz"
            )} | Coffee Portfolio`;

        /* =================================================
           NAVBAR
           ================================================= */

        const logoTitle =
            document.querySelector(
                ".logo-wrapper h2"
            );

        if (logoTitle) {

            logoTitle.textContent =
                safeText(
                    settings.site_name,
                    "KENYANKRABZ"
                );
        }

        const logoSubtitle =
            document.querySelector(
                ".logo-wrapper p"
            );

        if (logoSubtitle) {

            logoSubtitle.textContent =
                safeText(
                    settings.tagline,
                    "BARISTA • ROASTER • CONNOISSEUR"
                );
        }

        /* =================================================
           HERO IMAGE
           ================================================= */

        const heroImage =
            document.querySelector(
                "#home .hero-image img"
            );

        if (
            heroImage &&
            settings.hero_image
        ) {

            heroImage.src =
                safeUrl(
                    settings.hero_image
                );
        }

        /* =================================================
           HERO MINI TITLE
           ================================================= */

        const heroMiniTitle =
            document.querySelector(
                "#home .mini-title"
            );

        if (
            heroMiniTitle &&
            settings.hero_mini_title
        ) {

            heroMiniTitle.textContent =
                settings.hero_mini_title;
        }

        /* =================================================
           HERO MAIN TITLE
           ================================================= */

        const heroTitle =
            document.querySelector(
                "#home h1"
            );

        if (
            heroTitle &&
            settings.hero_title
        ) {

            heroTitle.innerHTML =
                escapeHTML(
                    settings.hero_title
                ).replace(
                    /\r?\n/g,
                    "<br>"
                );
        }

        /* =================================================
           HERO DESCRIPTION
           ================================================= */

        const heroDescription =
            document.querySelector(
                "#home .hero-text"
            );

        if (
            heroDescription &&
            settings.hero_description
        ) {

            heroDescription.textContent =
                settings.hero_description;
        }

        /* =================================================
           HERO PRIMARY BUTTON
           ================================================= */

        const heroButtons =
            document.querySelectorAll(
                "#home .hero-buttons a"
            );

        if (
            heroButtons.length >= 1
        ) {

            const primary =
                heroButtons[0];

            primary.textContent =
                safeText(
                    settings.hero_primary_text,
                    "EXPLORE MY JOURNEY"
                );

            primary.href =
                safeUrl(
                    safeText(
                        settings.hero_primary_url,
                        "#about"
                    )
                );
        }

        /* =================================================
           HERO SECONDARY BUTTON
           ================================================= */

        if (
            heroButtons.length >= 2
        ) {

            const secondary =
                heroButtons[1];

            secondary.textContent =
                safeText(
                    settings.hero_secondary_text,
                    "VIEW CERTIFICATIONS"
                );

            secondary.href =
                safeUrl(
                    safeText(
                        settings.hero_secondary_url,
                        "#certifications"
                    )
                );
        }

        /* =================================================
           HERO SOCIAL LINKS
           ================================================= */

        const heroSocials =
            document.querySelectorAll(
                "#home .socials a"
            );

        heroSocials.forEach(
            link => {

                const text =
                    link.textContent
                        .trim()
                        .toLowerCase();

                /* INSTAGRAM */

                if (
                    text === "ig" ||
                    text === "instagram"
                ) {

                    if (
                        settings.instagram
                    ) {

                        link.href =
                            safeUrl(
                                settings.instagram
                            );

                        link.target =
                            "_blank";

                        link.rel =
                            "noopener noreferrer";
                    }
                }

                /* TIKTOK */

                if (
                    text === "tiktok"
                ) {

                    if (
                        settings.tiktok
                    ) {

                        link.href =
                            safeUrl(
                                settings.tiktok
                            );

                        link.target =
                            "_blank";

                        link.rel =
                            "noopener noreferrer";
                    }
                }

                /* LINKEDIN */

                if (
                    text === "linkedin"
                ) {

                    if (
                        settings.linkedin
                    ) {

                        link.href =
                            safeUrl(
                                settings.linkedin
                            );

                        link.target =
                            "_blank";

                        link.rel =
                            "noopener noreferrer";
                    }
                }

                /* EMAIL */

                if (
                    text === "email"
                ) {

                    if (
                        settings.email
                    ) {

                        link.href =
                            safeEmail(
                                settings.email
                            );

                        link.removeAttribute(
                            "target"
                        );

                        link.removeAttribute(
                            "rel"
                        );
                    }
                }
            }
        );

        /* =================================================
           WHATSAPP
           ================================================= */

        const whatsappLinks =
            document.querySelectorAll(
                'a[href*="wa.me"], .whatsapp-btn'
            );

        whatsappLinks.forEach(
            link => {

                if (
                    !settings.whatsapp
                ) {
                    return;
                }

                const number =
                    String(
                        settings.whatsapp
                    ).replace(
                        /\D/g,
                        ""
                    );

                link.href =
                    `https://wa.me/${number}`;

                link.target =
                    "_blank";

                link.rel =
                    "noopener noreferrer";
            }
        );

        /* =================================================
           EMAIL
           ================================================= */

        const emailLinks =
            document.querySelectorAll(
                'a[href^="mailto:"], .email-btn'
            );

        emailLinks.forEach(
            link => {

                if (
                    !settings.email
                ) {
                    return;
                }

                if (
                    link.classList.contains(
                        "email-btn"
                    )
                ) {

                    link.href =
                        `mailto:${settings.email}?subject=Coffee Consultation Booking`;

                } else {

                    link.href =
                        `mailto:${settings.email}`;
                }
            }
        );

        /* =================================================
           LINKEDIN
           ================================================= */

        if (
            settings.linkedin
        ) {

            document
                .querySelectorAll(
                    'a[href*="linkedin.com"]'
                )
                .forEach(
                    link => {

                        link.href =
                            safeUrl(
                                settings.linkedin
                            );
                    }
                );
        }

        /* =================================================
           INSTAGRAM
           ================================================= */

        if (
            settings.instagram
        ) {

            document
                .querySelectorAll(
                    'a[href*="instagram.com"]'
                )
                .forEach(
                    link => {

                        link.href =
                            safeUrl(
                                settings.instagram
                            );
                    }
                );
        }

        /* =================================================
           TIKTOK
           ================================================= */

        if (
            settings.tiktok
        ) {

            document
                .querySelectorAll(
                    'a[href*="tiktok.com"]'
                )
                .forEach(
                    link => {

                        link.href =
                            safeUrl(
                                settings.tiktok
                            );

                        link.target =
                            "_blank";

                        link.rel =
                            "noopener noreferrer";
                    }
                );
        }

        /* =================================================
           FOOTER BRAND
           ================================================= */

        const footerBrand =
            document.querySelector(
                ".footer-brand h2"
            );

        if (footerBrand) {

            footerBrand.textContent =
                safeText(
                    settings.site_name,
                    "KENYANKRABZ"
                );
        }
    }

    /* =====================================================
       HERO
       ===================================================== */

    function renderHero() {

        const hero =
            document.querySelector(
                "#home"
            );

        if (!hero) {
            return;
        }

        /* ONLY USE SECTIONS FOR VISIBILITY */

        hideSection(
            hero,
            !isSectionVisible("hero")
        );

        /*
         * Hero content comes from site_settings.
         *
         * It does NOT come from:
         * sections.title
         * sections.subtitle
         * sections.description
         *
         * This prevents admin labels such as
         * "Hero" or "# Homepage introduction"
         * from appearing on the public website.
         */

        const settings =
            cmsData.settings;

        if (!settings) {
            return;
        }

        /* MINI TITLE */

        const miniTitle =
            hero.querySelector(
                ".mini-title"
            );

        if (
            miniTitle &&
            settings.hero_mini_title
        ) {

            miniTitle.textContent =
                settings.hero_mini_title;
        }

        /* MAIN TITLE */

        const heading =
            hero.querySelector(
                "h1"
            );

        if (
            heading &&
            settings.hero_title
        ) {

            heading.innerHTML =
                escapeHTML(
                    settings.hero_title
                ).replace(
                    /\r?\n/g,
                    "<br>"
                );
        }

        /* DESCRIPTION */

        const paragraph =
            hero.querySelector(
                ".hero-text"
            );

        if (
            paragraph &&
            settings.hero_description
        ) {

            paragraph.textContent =
                settings.hero_description;
        }

        /* PRIMARY BUTTON */

        const buttons =
            hero.querySelectorAll(
                ".hero-buttons a"
            );

        if (
            buttons.length >= 1
        ) {

            buttons[0].textContent =
                safeText(
                    settings.hero_primary_text,
                    "EXPLORE MY JOURNEY"
                );

            buttons[0].href =
                safeUrl(
                    safeText(
                        settings.hero_primary_url,
                        "#about"
                    )
                );
        }

        /* SECONDARY BUTTON */

        if (
            buttons.length >= 2
        ) {

            buttons[1].textContent =
                safeText(
                    settings.hero_secondary_text,
                    "VIEW CERTIFICATIONS"
                );

            buttons[1].href =
                safeUrl(
                    safeText(
                        settings.hero_secondary_url,
                        "#certifications"
                    )
                );
        }
    }

    /* =====================================================
       ABOUT
       ===================================================== */

    function renderAbout() {

        const about =
            cmsData.about;

        const section =
            document.querySelector(
                "#about"
            );

        if (!section) {
            return;
        }

        hideSection(
            section,
            !isSectionVisible("about")
        );

        if (about) {

            const heading =
                section.querySelector(
                    ".about-left h2"
                );

            const description =
                section.querySelector(
                    ".about-left p"
                );

            const name =
                section.querySelector(
                    ".about-left h3"
                );

            if (
                heading &&
                about.title
            ) {

                heading.textContent =
                    about.title;
            }

            if (
                description &&
                about.description
            ) {

                description.textContent =
                    about.description;
            }

            if (name) {

                name.textContent =
                    "Eugene";
            }

            const aboutImage =
                section.querySelector(
                    ".about-left img"
                );

            if (
                aboutImage &&
                about.image
            ) {

                aboutImage.src =
                    safeUrl(
                        about.image
                    );
            }
        }

        /* ABOUT CARDS */

        const grid =
            section.querySelector(
                ".about-grid"
            );

        if (!grid) {
            return;
        }

        if (
            !cmsData.aboutItems.length
        ) {
            return;
        }

        grid.innerHTML = "";

        sortByOrder(
            cmsData.aboutItems
        ).forEach(
            item => {

                const card =
                    document.createElement(
                        "div"
                    );

                card.className =
                    "about-card tilt";

                card.innerHTML = `

                    <h4>
                        ${escapeHTML(
                            item.title
                        )}
                    </h4>

                    <p>
                        ${escapeHTML(
                            item.description
                        )}
                    </p>

                `;

                grid.appendChild(
                    card
                );
            }
        );
    }

    /* =====================================================
       STATS
       ===================================================== */

    function renderStats() {

        const section =
            document.querySelector(
                ".stats"
            );

        if (!section) {
            return;
        }

        hideSection(
            section,
            !isSectionVisible("stats")
        );

        if (
            !cmsData.stats.length
        ) {
            return;
        }

        section.innerHTML = "";

        sortByOrder(
            cmsData.stats
        ).forEach(
            stat => {

                const item =
                    document.createElement(
                        "div"
                    );

                item.className =
                    "stat";

                item.innerHTML = `

                    <h2
                        class="counter"
                        data-target="${escapeHTML(
                            stat.value
                        )}"
                    >
                        0
                    </h2>

                    <p>
                        ${escapeHTML(
                            stat.label
                        )}
                    </p>

                `;

                section.appendChild(
                    item
                );
            }
        );

        animateStats();
    }

    function animateStats() {

        const counters =
            document.querySelectorAll(
                ".stats .counter"
            );

        counters.forEach(
            counter => {

                const target =
                    Number(
                        counter.dataset
                            .target || 0
                    );

                const duration =
                    1500;

                const startTime =
                    performance.now();

                function update(
                    currentTime
                ) {

                    const progress =
                        Math.min(
                            (
                                currentTime -
                                startTime
                            ) / duration,
                            1
                        );

                    const eased =
                        1 -
                        Math.pow(
                            1 - progress,
                            3
                        );

                    const current =
                        Math.floor(
                            target *
                            eased
                        );

                    counter.textContent =
                        current.toLocaleString();

                    if (
                        progress < 1
                    ) {

                        requestAnimationFrame(
                            update
                        );

                    } else {

                        counter.textContent =
                            target.toLocaleString();
                    }
                }

                requestAnimationFrame(
                    update
                );
            }
        );
    }

    /* =====================================================
       CERTIFICATIONS
       ===================================================== */

    function renderCertificates() {

        const section =
            document.querySelector(
                "#certifications"
            );

        if (!section) {
            return;
        }

        hideSection(
            section,
            !isSectionVisible(
                "certifications"
            )
        );

        const wrapper =
            section.querySelector(
                ".certSwiper .swiper-wrapper"
            );

        if (!wrapper) {
            return;
        }

        wrapper.innerHTML = "";

        sortByOrder(
            cmsData.certificates
        ).forEach(
            cert => {

                const slide =
                    document.createElement(
                        "div"
                    );

                slide.className =
                    "swiper-slide";

                slide.innerHTML = `

                    <div
                        class="cert-card tilt"
                        data-certificate-url="${escapeHTML(
                            cert.certificate_url ||
                            ""
                        )}"
                    >

                        <div
                            class="cert-thumb"
                        >

                            <img
                                src="${escapeHTML(
                                    cert.image_url ||
                                    "assets/images/certificate-1.jpg"
                                )}"
                                alt="${escapeHTML(
                                    cert.title
                                )}"
                            >

                            <div
                                class="cert-overlay"
                            >

                                <span>
                                    View Certificate
                                </span>

                            </div>

                        </div>

                        <h3>
                            ${escapeHTML(
                                cert.title
                            )}
                        </h3>

                        <p>
                            ${escapeHTML(
                                cert.issuer ||
                                "SCA"
                            )}
                        </p>

                    </div>

                `;

                const card =
                    slide.querySelector(
                        ".cert-card"
                    );

                card.addEventListener(
                    "click",
                    function () {

                        if (
                            cert.certificate_url
                        ) {

                            openCert(
                                cert.certificate_url
                            );
                        }
                    }
                );

                wrapper.appendChild(
                    slide
                );
            }
        );

        initializeCertificateSwiper();
    }

    function initializeCertificateSwiper() {

        const element =
            document.querySelector(
                ".certSwiper"
            );

        if (!element) {
            return;
        }

        if (
            element.swiper &&
            typeof element.swiper.destroy ===
            "function"
        ) {

            element.swiper.destroy(
                true,
                true
            );
        }

        if (
            typeof Swiper ===
            "undefined"
        ) {
            return;
        }

        new Swiper(
            element,
            {
                slidesPerView: 1,
                spaceBetween: 20,
                loop: false,

                breakpoints: {

                    600: {
                        slidesPerView: 2
                    },

                    900: {
                        slidesPerView: 3
                    },

                    1200: {
                        slidesPerView: 4
                    }

                }
            }
        );
    }

    /* =====================================================
       CERTIFICATE MODAL
       ===================================================== */

    window.openCert =
        function (pdfUrl) {

            const modal =
                document.getElementById(
                    "certModal"
                );

            const frame =
                document.getElementById(
                    "certFrame"
                );

            if (
                !modal ||
                !frame
            ) {
                return;
            }

            frame.src =
                safeUrl(pdfUrl);

            modal.style.display =
                "block";
        };

    window.closeCert =
        function () {

            const modal =
                document.getElementById(
                    "certModal"
                );

            const frame =
                document.getElementById(
                    "certFrame"
                );

            if (
                !modal ||
                !frame
            ) {
                return;
            }

            modal.style.display =
                "none";

            frame.src = "";
        };

    /* =====================================================
       TIMELINE
       ===================================================== */

    function renderTimeline() {

        const section =
            document.querySelector(
                ".timeline-section"
            );

        if (!section) {
            return;
        }

        hideSection(
            section,
            !isSectionVisible(
                "experience"
            )
        );

        const timeline =
            section.querySelector(
                ".timeline"
            );

        if (!timeline) {
            return;
        }

        timeline.innerHTML = "";

        sortByOrder(
            cmsData.timeline
        ).forEach(
            item => {

                const element =
                    document.createElement(
                        "div"
                    );

                element.className =
                    "timeline-item";

                element.innerHTML = `

                    <h3>
                        ${escapeHTML(
                            item.year
                        )}
                    </h3>

                    <p>
                        ${escapeHTML(
                            item.title
                        )}
                    </p>

                    ${
                        item.description
                            ? `
                                <small>
                                    ${escapeHTML(
                                        item.description
                                    )}
                                </small>
                              `
                            : ""
                    }

                `;

                timeline.appendChild(
                    element
                );
            }
        );
    }

    /* =====================================================
       COFFEE MAP
       ===================================================== */

    let coffeeMap = null;

    function renderMap() {

        const section =
            document.querySelector(
                "#map-section"
            );

        if (!section) {
            return;
        }

        hideSection(
            section,
            !isSectionVisible(
                "coffee-map"
            )
        );

        const mapElement =
            document.getElementById(
                "map"
            );

        if (!mapElement) {
            return;
        }

        if (
            typeof L ===
            "undefined"
        ) {

            console.warn(
                "Leaflet is not loaded."
            );

            return;
        }

        if (coffeeMap) {

            coffeeMap.remove();

            coffeeMap = null;
        }

        mapElement.innerHTML = "";

        coffeeMap =
            L.map("map");

        L.tileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
                attribution:
                    "&copy; OpenStreetMap contributors"
            }
        ).addTo(
            coffeeMap
        );

        const validOrigins =
            cmsData.origins.filter(
                origin =>
                    origin.latitude !==
                        null &&
                    origin.longitude !==
                        null
            );

        if (
            !validOrigins.length
        ) {

            coffeeMap.setView(
                [0, 37],
                3
            );

            return;
        }

        const bounds = [];

        validOrigins.forEach(
            origin => {

                const lat =
                    Number(
                        origin.latitude
                    );

                const lng =
                    Number(
                        origin.longitude
                    );

                if (
                    Number.isNaN(lat) ||
                    Number.isNaN(lng)
                ) {
                    return;
                }

                bounds.push([
                    lat,
                    lng
                ]);

                const marker =
                    L.marker([
                        lat,
                        lng
                    ])
                    .addTo(
                        coffeeMap
                    );

                const title =
                    origin.region
                        ? `${origin.country} — ${origin.region}`
                        : origin.country;

                marker.bindPopup(`
                    <strong>
                        ${escapeHTML(
                            title
                        )}
                    </strong>

                    ${
                        origin.flavor_notes
                            ? `
                                <br>
                                ${escapeHTML(
                                    origin.flavor_notes
                                )}
                              `
                            : ""
                    }
                `);

                marker.on(
                    "click",
                    function () {

                        updateMapCard(
                            origin
                        );
                    }
                );
            }
        );

        if (
            bounds.length === 1
        ) {

            coffeeMap.setView(
                bounds[0],
                5
            );

        } else {

            coffeeMap.fitBounds(
                bounds,
                {
                    padding: [
                        30,
                        30
                    ]
                }
            );
        }

        if (
            validOrigins.length
        ) {

            updateMapCard(
                validOrigins[0]
            );
        }
    }

    function updateMapCard(
        origin
    ) {

        const card =
            document.querySelector(
                "#map-section .map-card"
            );

        if (!card) {
            return;
        }

        const title =
            origin.region
                ? `${origin.country} — ${origin.region}`
                : origin.country;

        card.innerHTML = `

            <h3>
                ${escapeHTML(
                    title
                )}
            </h3>

            ${
                origin.flavor_notes
                    ? `
                        <p>
                            <strong>
                                Flavor Notes:
                            </strong><br>

                            ${escapeHTML(
                                origin.flavor_notes
                            )}
                        </p>
                      `
                    : ""
            }

            ${
                origin.processing
                    ? `
                        <p>
                            <strong>
                                Processing:
                            </strong><br>

                            ${escapeHTML(
                                origin.processing
                            )}
                        </p>
                      `
                    : ""
            }

            ${
                origin.roast
                    ? `
                        <p>
                            <strong>
                                Roast:
                            </strong><br>

                            ${escapeHTML(
                                origin.roast
                            )}
                        </p>
                      `
                    : ""
            }

            ${
                origin.description
                    ? `
                        <p>
                            ${escapeHTML(
                                origin.description
                            )}
                        </p>
                      `
                    : ""
            }

            <button
                type="button"
                class="map-journey-btn"
            >
                VIEW JOURNEY
            </button>

        `;

        const button =
            card.querySelector(
                ".map-journey-btn"
            );

        if (button) {

            button.addEventListener(
                "click",
                function () {

                    if (
                        origin.latitude !==
                            null &&
                        origin.longitude !==
                            null &&
                        coffeeMap
                    ) {

                        coffeeMap.setView(
                            [
                                Number(
                                    origin.latitude
                                ),
                                Number(
                                    origin.longitude
                                )
                            ],
                            7
                        );
                    }
                }
            );
        }
    }

    /* =====================================================
       PROJECTS
       ===================================================== */

    function renderProjects() {

        const section =
            document.querySelector(
                "#projects"
            );

        if (!section) {
            return;
        }

        hideSection(
            section,
            !isSectionVisible(
                "projects"
            )
        );

        const wrapper =
            section.querySelector(
                ".projectSwiper .swiper-wrapper"
            );

        if (!wrapper) {
            return;
        }

        wrapper.innerHTML = "";

        /*
         * If there are featured projects,
         * show those.
         *
         * If there are no featured projects,
         * show all projects instead of leaving
         * the public section empty.
         */

        const featured =
            cmsData.projects.filter(
                project =>
                    project.featured === true
            );

        const projectsToRender =
            featured.length
                ? featured
                : cmsData.projects;

        sortByOrder(
            projectsToRender
        ).forEach(
            project => {

                const slide =
                    document.createElement(
                        "div"
                    );

                slide.className =
                    "swiper-slide";

                const projectImages =
                    cmsData.projectImages.filter(
                        image =>
                            image.project_id ===
                            project.id
                    );

                const image =
                    project.main_image ||
                    projectImages?.[0]?.image_url ||
                    "";

                slide.innerHTML = `

                    <div
                        class="project-card tilt"
                    >

                        ${
                            image
                                ? `
                                    <img
                                        src="${escapeHTML(
                                            image
                                        )}"
                                        alt="${escapeHTML(
                                            project.title
                                        )}"
                                        loading="lazy"
                                    >
                                  `
                                : ""
                        }

                        <h3>
                            ${escapeHTML(
                                project.title
                            )}
                        </h3>

                        ${
                            project.category
                                ? `
                                    <p>
                                        ${escapeHTML(
                                            project.category
                                        )}
                                    </p>
                                  `
                                : ""
                        }

                        ${
                            project.description
                                ? `
                                    <p
                                        class="project-description"
                                    >
                                        ${escapeHTML(
                                            project.description
                                        )}
                                    </p>
                                  `
                                : ""
                        }

                        ${
                            project.link
                                ? `
                                    <a
                                        href="${safeUrl(
                                            project.link
                                        )}"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="project-link"
                                    >
                                        VIEW PROJECT
                                    </a>
                                  `
                                : ""
                        }

                    </div>

                `;

                wrapper.appendChild(
                    slide
                );
            }
        );

        initializeProjectSwiper();
    }

    function initializeProjectSwiper() {

        const element =
            document.querySelector(
                ".projectSwiper"
            );

        if (!element) {
            return;
        }

        if (
            element.swiper &&
            typeof element.swiper.destroy ===
            "function"
        ) {

            element.swiper.destroy(
                true,
                true
            );
        }

        if (
            typeof Swiper ===
            "undefined"
        ) {
            return;
        }

        new Swiper(
            element,
            {
                slidesPerView: 1,
                spaceBetween: 20,

                breakpoints: {

                    600: {
                        slidesPerView: 2
                    },

                    1000: {
                        slidesPerView: 3
                    },

                    1300: {
                        slidesPerView: 4
                    }

                }
            }
        );
    }

    /* =====================================================
       GALLERY
       ===================================================== */

    function renderGallery() {

        const section =
            document.querySelector(
                "#gallery"
            );

        if (!section) {
            return;
        }

        hideSection(
            section,
            !isSectionVisible(
                "gallery"
            )
        );

        const wrapper =
            section.querySelector(
                ".gallerySwiper .swiper-wrapper"
            );

        if (!wrapper) {
            return;
        }

        wrapper.innerHTML = "";

        sortByOrder(
            cmsData.gallery
        ).forEach(
            image => {

                const slide =
                    document.createElement(
                        "div"
                    );

                slide.className =
                    "swiper-slide";

                slide.innerHTML = `

                    <img
                        src="${escapeHTML(
                            image.image_url
                        )}"
                        alt="${escapeHTML(
                            image.title ||
                            "Kenyankrabz Coffee Gallery"
                        )}"
                        loading="lazy"
                    >

                `;

                wrapper.appendChild(
                    slide
                );
            }
        );

        initializeGallerySwiper();
    }

    function initializeGallerySwiper() {

        const element =
            document.querySelector(
                ".gallerySwiper"
            );

        if (!element) {
            return;
        }

        if (
            element.swiper &&
            typeof element.swiper.destroy ===
            "function"
        ) {

            element.swiper.destroy(
                true,
                true
            );
        }

        if (
            typeof Swiper ===
            "undefined"
        ) {
            return;
        }

        new Swiper(
            element,
            {
                slidesPerView: 1,
                spaceBetween: 15,
                loop: true,

                breakpoints: {

                    600: {
                        slidesPerView: 2
                    },

                    900: {
                        slidesPerView: 3
                    },

                    1200: {
                        slidesPerView: 4
                    }

                }
            }
        );
    }

    /* =====================================================
       SOCIAL LINKS
       ===================================================== */

    function renderSocialLinks() {

        if (
            !cmsData.socials.length
        ) {
            return;
        }

        cmsData.socials.forEach(
            link => {

                const platform =
                    String(
                        link.platform ||
                        ""
                    )
                    .toLowerCase()
                    .trim();

                let selector = "";

                if (
                    platform ===
                    "instagram"
                ) {

                    selector =
                        'a[href*="instagram.com"]';
                }

                if (
                    platform ===
                    "linkedin"
                ) {

                    selector =
                        'a[href*="linkedin.com"]';
                }

                if (
                    platform ===
                    "tiktok"
                ) {

                    selector =
                        'a[href*="tiktok.com"]';
                }

                if (
                    platform ===
                    "whatsapp"
                ) {

                    selector =
                        'a[href*="wa.me"]';
                }

                if (
                    platform ===
                    "email"
                ) {

                    selector =
                        'a[href^="mailto:"]';
                }

                if (!selector) {
                    return;
                }

                document
                    .querySelectorAll(
                        selector
                    )
                    .forEach(
                        element => {

                            element.href =
                                safeUrl(
                                    link.url
                                );

                            if (
                                !String(
                                    link.url
                                ).startsWith(
                                    "mailto:"
                                )
                            ) {

                                element.target =
                                    "_blank";

                                element.rel =
                                    "noopener noreferrer";
                            }
                        }
                    );
            }
        );
    }

    /* =====================================================
       SECTION VISIBILITY
       ===================================================== */

    function applySectionVisibility() {

        const mappings = {

            hero:
                "#home",

            about:
                "#about",

            stats:
                ".stats",

            certifications:
                "#certifications",

            experience:
                ".timeline-section",

            "coffee-map":
                "#map-section",

            projects:
                "#projects",

            gallery:
                "#gallery",

            contact:
                "#contact"
        };

        Object.keys(
            mappings
        ).forEach(
            key => {

                const element =
                    document.querySelector(
                        mappings[key]
                    );

                if (!element) {
                    return;
                }

                hideSection(
                    element,
                    !isSectionVisible(
                        key
                    )
                );
            }
        );
    }

    /* =====================================================
       CUSTOM SECTIONS
       ===================================================== */

    function renderCustomSections() {

        let container =
            document.getElementById(
                "cms-custom-sections"
            );

        if (!container) {

            container =
                document.createElement(
                    "div"
                );

            container.id =
                "cms-custom-sections";

            const contact =
                document.querySelector(
                    "#contact"
                );

            if (contact) {

                contact.parentNode.insertBefore(
                    container,
                    contact
                );

            } else {

                document.body.appendChild(
                    container
                );
            }
        }

        container.innerHTML = "";

        const custom =
            cmsData.sections.filter(
                section =>
                    ![
                        "hero",
                        "about",
                        "stats",
                        "certifications",
                        "experience",
                        "coffee-map",
                        "projects",
                        "gallery",
                        "contact"
                    ].includes(
                        section.section_key
                    )
            );

        custom
            .filter(
                section =>
                    section.visible !== false
            )
            .sort(
                (a, b) =>
                    Number(
                        a.display_order || 0
                    ) -
                    Number(
                        b.display_order || 0
                    )
            )
            .forEach(
                section => {

                    const content =
                        cmsData.customSections.find(
                            item =>
                                item.section_id ===
                                section.id
                        );

                    const element =
                        document.createElement(
                            "section"
                        );

                    element.className =
                        "cms-custom-section";

                    element.id =
                        `cms-${section.section_key}`;

                    /*
                     * CONTENT IS ESCAPED HERE.
                     *
                     * This means normal text from the
                     * CMS cannot inject arbitrary HTML.
                     */

                    element.innerHTML = `

                        <div class="section-top">

                            ${
                                section.title
                                    ? `
                                        <h2>
                                            ${escapeHTML(
                                                section.title
                                            )}
                                        </h2>
                                      `
                                    : ""
                            }

                            ${
                                section.subtitle
                                    ? `
                                        <p>
                                            ${escapeHTML(
                                                section.subtitle
                                            )}
                                        </p>
                                      `
                                    : ""
                            }

                        </div>

                        ${
                            content?.image_url
                                ? `
                                    <div
                                        class="cms-custom-image"
                                    >

                                        <img
                                            src="${escapeHTML(
                                                content.image_url
                                            )}"
                                            alt="${escapeHTML(
                                                section.title ||
                                                "Kenyankrabz"
                                            )}"
                                            loading="lazy"
                                        >

                                    </div>
                                  `
                                : ""
                        }

                        ${
                            content?.content
                                ? `
                                    <div
                                        class="cms-custom-content"
                                    >
                                        ${escapeHTML(
                                            content.content
                                        )}
                                    </div>
                                  `
                                : ""
                        }

                        ${
                            content?.button_text &&
                            content?.button_url
                                ? `
                                    <a
                                        href="${safeUrl(
                                            content.button_url
                                        )}"
                                        class="btn-primary"
                                    >
                                        ${escapeHTML(
                                            content.button_text
                                        )}
                                    </a>
                                  `
                                : ""
                        }

                    `;

                    container.appendChild(
                        element
                    );
                }
            );
    }

    /* =====================================================
       CONTACT
       ===================================================== */

    function renderContact() {

        const section =
            document.querySelector(
                "#contact"
            );

        if (!section) {
            return;
        }

        hideSection(
            section,
            !isSectionVisible(
                "contact"
            )
        );

        const cmsSection =
            getSection(
                "contact"
            );

        if (!cmsSection) {
            return;
        }

        const heading =
            section.querySelector(
                "h2"
            );

        const paragraph =
            section.querySelector(
                "p"
            );

        if (
            heading &&
            cmsSection.title
        ) {

            heading.textContent =
                cmsSection.title;
        }

        if (
            paragraph &&
            cmsSection.description
        ) {

            paragraph.textContent =
                cmsSection.description;
        }
    }

    /* =====================================================
       FOOTER
       ===================================================== */

    function renderFooter() {

        const settings =
            cmsData.settings;

        if (!settings) {
            return;
        }

        const footer =
            document.querySelector(
                ".footer"
            );

        if (!footer) {
            return;
        }

        const footerDescription =
            footer.querySelector(
                ".footer-brand p"
            );

        if (footerDescription) {

            footerDescription.textContent =
                settings.tagline
                    ? `Brewing legacy through ${settings.tagline.toLowerCase()}.`
                    : "Brewing legacy through coffee, creativity and excellence.";
        }

        const footerYear =
            footer.querySelector(
                ".footer-bottom p"
            );

        if (footerYear) {

            footerYear.textContent =
                `© ${new Date().getFullYear()} ${
                    settings.site_name ||
                    "Kenyankrabz"
                }. All rights reserved.`;
        }
    }

    /* =====================================================
       ANIMATIONS
       ===================================================== */

    function refreshAnimations() {

        if (
            typeof AOS !==
            "undefined"
        ) {

            try {

                AOS.refreshHard();

            } catch (error) {

                console.warn(
                    "AOS refresh failed:",
                    error
                );
            }
        }

        if (
            typeof VanillaTilt !==
            "undefined"
        ) {

            try {

                VanillaTilt.init(
                    document.querySelectorAll(
                        ".tilt"
                    )
                );

            } catch (error) {

                console.warn(
                    "VanillaTilt initialization failed:",
                    error
                );
            }
        }
    }

    /* =====================================================
       MAIN RENDER
       ===================================================== */

    async function initializeCMS() {

        if (
            typeof supabaseClient ===
            "undefined"
        ) {

            console.error(
                "❌ supabaseClient is not available."
            );

            return;
        }

        try {

            console.log(
                "☕ Loading Kenyankrabz CMS..."
            );

            await loadCMSData();

            /*
             * IMPORTANT:
             *
             * Hero content is now rendered from
             * site_settings.
             */

            renderSiteSettings();

            renderHero();

            renderAbout();

            renderStats();

            renderCertificates();

            renderTimeline();

            renderMap();

            renderProjects();

            renderGallery();

            renderSocialLinks();

            applySectionVisibility();

            renderCustomSections();

            renderContact();

            renderFooter();

            refreshAnimations();

            console.log(
                "✅ Kenyankrabz CMS rendered successfully."
            );

        } catch (error) {

            console.error(
                "❌ CMS initialization failed:",
                error
            );
        }
    }

    /* =====================================================
       START
       ===================================================== */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initializeCMS
        );

    } else {

        initializeCMS();
    }

})();