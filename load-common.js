// ===============================
// Base Path Resolver
// ===============================
function getBasePath() {
    return window.location.pathname.includes('ParthNew') ? '/ParthNew/' : '/';
}

// ===============================
// Component Loader (Navbar / Footer)
// ===============================
async function loadComponent(id, file) {
    const basePath = getBasePath();
    const path = basePath + file;

    try {
        const response = await fetch(path);
        if (!response.ok) return;

        const container = document.getElementById(id);
        if (!container) return;

        container.innerHTML = await response.text();

        container.querySelectorAll('a').forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('http') && !href.startsWith('#')) {
                link.href = basePath + href.replace(/^\//, '');
            }
        });

        if (file === 'navbar.html') activateMobileMenu();

    } catch (e) {
        console.error('Component load error:', e);
    }
}

function activateMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.onclick = () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        };
    }
}

// ===============================
// Google Fonts Loader (ONCE)
// ===============================
function loadGoogleFonts() {
    if (document.getElementById('googleFonts')) return;

    const pre1 = document.createElement('link');
    pre1.rel = 'preconnect';
    pre1.href = 'https://fonts.googleapis.com';

    const pre2 = document.createElement('link');
    pre2.rel = 'preconnect';
    pre2.href = 'https://fonts.gstatic.com';
    pre2.crossOrigin = 'anonymous';

    const font = document.createElement('link');
    font.id = 'googleFonts';
    font.rel = 'stylesheet';
    font.href =
        'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap';

    document.head.append(pre1, pre2, font);
}

// ===============================
// Copy Protection
// ===============================
function enableProtection() {
    document.addEventListener('contextmenu', e => e.preventDefault());
    document.addEventListener('selectstart', e => e.preventDefault());

    document.addEventListener('keydown', e => {
        if (
            e.key === 'F12' ||
            (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) ||
            (e.ctrlKey && e.key === 'u')
        ) {
            e.preventDefault();
        }
    });
}

// ===============================
// Analytics (Deferred – 4s)
// ===============================
function loadAnalytics() {
    if (window.__analyticsLoaded) return;
    window.__analyticsLoaded = true;

    setTimeout(() => {
        const ga = document.createElement('script');
        ga.async = true;
        ga.src = 'https://www.googletagmanager.com/gtag/js?id=G-S146W8G7MB';
        document.head.appendChild(ga);

        window.dataLayer = window.dataLayer || [];
        function gtag(){ dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'G-S146W8G7MB');

        const va = document.createElement('script');
        va.src = '/_vercel/insights/script.js';
        va.defer = true;

        const vsi = document.createElement('script');
        vsi.src = '/_vercel/speed-insights/script.js';
        vsi.defer = true;

        document.head.append(va, vsi);
    }, 4000);
}

// ===============================
// PWA Registration
// ===============================
function registerPWA() {
    if (!('serviceWorker' in navigator)) return;

    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(() => console.log('PWA registered'))
            .catch(err => console.log('PWA error:', err));
    });
}

// ===============================
// PropellerAds (Deferred – 5s)
// ===============================
function loadPropellerAds() {

    if (!document.getElementById('propellerInPage')) {
        const s1 = document.createElement('script');
        s1.id = 'propellerInPage';
        s1.dataset.zone = '10668651';
        s1.src = 'https://nap5k.com/tag.min.js';
        s1.async = true;
        document.body.appendChild(s1);
    }

    if (!document.getElementById('propellerVignette')) {
        const s2 = document.createElement('script');
        s2.id = 'propellerVignette';
        s2.dataset.zone = '10668920';
        s2.src = 'https://gizokraijaw.net/vignette.min.js';
        s2.async = true;
        document.body.appendChild(s2);
    }

    if (!document.getElementById('propellerPush')) {
        const s3 = document.createElement('script');
        s3.id = 'propellerPush';
        s3.src = 'https://5gvci.com/act/files/tag.min.js?z=10668929';
        s3.async = true;
        s3.setAttribute('data-cfasync', 'false');
        document.body.appendChild(s3);
    }
}

// ===============================
// EXECUTION (ORDER MATTERS)
// ===============================
loadGoogleFonts();

loadComponent('navbar-placeholder', 'navbar.html');
loadComponent('footer-placeholder', 'footer.html');

enableProtection();
loadAnalytics();
registerPWA();

window.addEventListener('load', () => {
    setTimeout(loadPropellerAds, 5000);
});
