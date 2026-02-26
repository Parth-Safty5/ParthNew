// 1. COPY PROTECTION (Sabse pehle chalu hoga taaki koi copy na kar sake)
function enableProtection() {
    const disableEvt = e => e.preventDefault();
    document.addEventListener('contextmenu', disableEvt);
    document.addEventListener('selectstart', disableEvt);
    document.addEventListener('copy', disableEvt);

    document.onkeydown = e => {
        if (
            e.keyCode == 123 || // F12
            (e.ctrlKey && e.shiftKey && (e.keyCode == 73 || e.keyCode == 74 || e.keyCode == 67)) || 
            (e.ctrlKey && e.keyCode == 85) // Ctrl+U
        ) {
            return false;
        }
    };
}
enableProtection(); // Ise turant call kiya hai

// 2. SEO, FAVICON & FONTS INJECTOR
function injectHeadElements() {
    // Favicon link
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

    // Schema.org Structured Data for SEO
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

// 3. COMPONENT LOADER (Navbar & Footer)
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

// 4. ANALYTICS & SPEED INSIGHTS (Vercel & Google)
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

    // Vercel Speed Insights
    var vsi = document.createElement('script');
    vsi.src = '/_vercel/speed-insights/script.js';
    vsi.defer = true;
    document.head.appendChild(vsi);
}

// 5. PWA REGISTRATION
function registerPWA() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(reg => console.log('PWA Registered'))
                .catch(err => console.log('PWA Error', err));
        });
    }
}

// --- SABHI EXECUTIONS ---
injectHeadElements();
loadComponent('navbar-placeholder', 'navbar.html');
loadComponent('footer-placeholder', 'footer.html');
loadAllAnalytics();
registerPWA();
