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
    } catch (e) { console.error("Error loading component:", e); }
}

function activateMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.getElementById('navMenu');
    if (hamburger && navMenu) {
        hamburger.onclick = function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        };
    }
}

// 1. SEO, Favicon aur Fonts Injector
function injectHeadElements() {
    // Favicon
    let link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/png';
    link.href = './logo.png';
    document.head.appendChild(link);

    // Google Fonts
    let fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap';
    document.head.appendChild(fontLink);

    // Schema.org SEO (URL updated to Vercel)
    let schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.text = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "ParthNew",
        "url": window.location.origin
    });
    document.head.appendChild(schemaScript);

    // ==========================================
    // 5. PROPELLERADS MULTITAG INTEGRATION
    // ==========================================
    // JS ke bajaye seedha HTML append kar rahe hain verification ke liye
    var adScript = document.createElement('script');
    adScript.src = 'https://quge5.com/88/tag.min.js';
    adScript.setAttribute('data-zone', '215384');
    adScript.async = true;
    adScript.setAttribute('data-cfasync', 'false');
    document.head.appendChild(adScript);
    console.log('PropellerAds Initiated');
    // ==========================================
}

// 2. Copy Protection
function enableProtection() {
    document.addEventListener('contextmenu', e => e.preventDefault());
    document.addEventListener('selectstart', e => e.preventDefault());
    document.onkeydown = e => {
        if (e.keyCode == 123 || (e.ctrlKey && e.shiftKey && (e.keyCode == 'I'.charCodeAt(0) || e.keyCode == 'J'.charCodeAt(0) || e.keyCode == 'C'.charCodeAt(0))) || (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0))) {
            return false;
        }
    };
}

// 3. Analytics & Speed Insights (Vercel & Google)
function loadAllAnalytics() {
    // Google Analytics
    var ga = document.createElement('script');
    ga.async = true;
    ga.src = 'https://www.googletagmanager.com/gtag/js?id=G-S146W8G7MB';
    document.head.appendChild(ga);
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-S146W8G7MB');

    // Vercel Web Analytics
    var va = document.createElement('script');
    va.src = '/_vercel/insights/script.js';
    va.defer = true;
    document.head.appendChild(va);

    // Vercel Speed Insights (Specifically for performance tracking)
    var vsi = document.createElement('script');
    vsi.src = '/_vercel/speed-insights/script.js';
    vsi.defer = true;
    document.head.appendChild(vsi);
}

// 4. PWA Service Worker
function registerPWA() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(reg => console.log('PWA Registered'))
                .catch(err => console.log('PWA Error', err));
        });
    }
}

// --- All Executions ---
// Ad integration ko SEO element ke sath hi inject kar rahe hain
injectHeadElements();
loadComponent('navbar-placeholder', 'navbar.html');
loadComponent('footer-placeholder', 'footer.html');
enableProtection();
loadAllAnalytics();
registerPWA();
