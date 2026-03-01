// ===============================
// Component Loader (Navbar / Footer)
// ===============================
async function loadComponent(id, file) {
    const isGitHub = window.location.pathname.includes('ParthNew');
    const basePath = isGitHub ? '/ParthNew/' : './';
    const path = isGitHub ? `/ParthNew/${file}` : `./${file}`;

    try {
        const response = await fetch(path);
        const data = await response.text();
        document.getElementById(id).innerHTML = data;

        const container = document.getElementById(id);
        container.querySelectorAll('a').forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('http') && !href.startsWith('#')) {
                link.href = basePath + href.replace(/^\//, '');
            }
        });

        if (file === 'navbar.html') {
            activateMobileMenu();
        }
    } catch (e) {
        console.error("Error loading component:", e);
    }
}

function activateMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.getElementById('navMenu');
    if (hamburger && navMenu) {
        hamburger.onclick = function () {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        };
    }
}

// ===============================
// SEO, Favicon, Fonts
// ===============================
function injectHeadElements() {
    // Favicon
    let link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/png';
    link.href = './logo.png';
    document.head.appendChild(link);

    // Google Font
    let fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap';
    document.head.appendChild(fontLink);

    // Schema.org
    let schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.text = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "ParthNew",
        "url": window.location.origin
    });
    document.head.appendChild(schemaScript);
}

// ===============================
// Copy Protection
// ===============================
function enableProtection() {
    document.addEventListener('contextmenu', e => e.preventDefault());
    document.addEventListener('selectstart', e => e.preventDefault());
    document.onkeydown = e => {
        if (
            e.keyCode === 123 ||
            (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(String.fromCharCode(e.keyCode))) ||
            (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))
        ) {
            return false;
        }
    };
}

// ===============================
// Analytics (Google + Vercel)
// ===============================
function loadAllAnalytics() {
    // Google Analytics
    let ga = document.createElement('script');
    ga.async = true;
    ga.src = 'https://www.googletagmanager.com/gtag/js?id=G-S146W8G7MB';
    document.head.appendChild(ga);

    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-S146W8G7MB');

    // Vercel Web Analytics
    let va = document.createElement('script');
    va.src = '/_vercel/insights/script.js';
    va.defer = true;
    document.head.appendChild(va);

    // Vercel Speed Insights
    let vsi = document.createElement('script');
    vsi.src = '/_vercel/speed-insights/script.js';
    vsi.defer = true;
    document.head.appendChild(vsi);
}

// ===============================
// PWA
// ===============================
function registerPWA() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(() => console.log('PWA Registered'))
                .catch(err => console.log('PWA Error', err));
        });
    }
}

// ===============================
// ADS (FINAL – AUTO ON ALL PAGES)
// ===============================

// In-Page Push (Zone: 10668651)
function loadInPagePushAd() {
    if (document.getElementById('inPagePushAd')) return;

    let s = document.createElement('script');
    s.id = 'inPagePushAd';
    s.dataset.zone = '10668651';
    s.src = 'https://nap5k.com/tag.min.js';
    s.async = true;

    (document.documentElement || document.body).appendChild(s);
}

// Vignette Banner (Zone: 10668920)
function loadVignetteBannerAd() {
    if (document.getElementById('vignetteBannerAd')) return;

    let s = document.createElement('script');
    s.id = 'vignetteBannerAd';
    s.dataset.zone = '10668920';
    s.src = 'https://gizokraijaw.net/vignette.min.js';
    s.async = true;

    (document.documentElement || document.body).appendChild(s);
}

// Push Notification (Zone: 10668929)
function loadPushNotificationAd() {
    if (document.getElementById('pushNotificationAd')) return;

    let s = document.createElement('script');
    s.id = 'pushNotificationAd';
    s.src = 'https://5gvci.com/act/files/tag.min.js?z=10668929';
    s.async = true;
    s.setAttribute('data-cfasync', 'false');

    document.body.appendChild(s);
}

// ===============================
// EXECUTION (ORDER MATTERS)
// ===============================
injectHeadElements();
loadComponent('navbar-placeholder', 'navbar.html');
loadComponent('footer-placeholder', 'footer.html');
enableProtection();
loadAllAnalytics();
registerPWA();

// 🔥 Ads – Auto on Every Page
loadInPagePushAd();
loadVignetteBannerAd();
loadPushNotificationAd();
