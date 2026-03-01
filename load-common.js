// ===============================
// Component Loader (Navbar / Footer)
// ===============================
async function loadComponent(id, file) {
    const basePath = window.location.pathname.includes('ParthNew') ? '/ParthNew/' : './';
    const path = basePath + file;
    try {
        const response = await fetch(path);
        const container = document.getElementById(id);
        container.innerHTML = await response.text();

        container.querySelectorAll('a').forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('http') && !href.startsWith('#')) {
                link.href = basePath + href.replace(/^\//, '');
            }
        });

        if (file === 'navbar.html') activateMobileMenu();
    } catch (e) { console.error("Error loading component:", e); }
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
// SEO, Favicon, Fonts
// ===============================
function injectHeadElements() {
    const link = document.createElement('link');
    link.rel = 'icon'; link.type = 'image/png'; link.href = './logo.png';
    document.head.appendChild(link);

    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap';
    document.head.appendChild(fontLink);

    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.text = JSON.stringify({
        "@context":"https://schema.org",
        "@type":"WebSite",
        "name":"ParthNew",
        "url":window.location.origin
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
        if(e.keyCode===123||(e.ctrlKey&&e.shiftKey&&['I','J','C'].includes(String.fromCharCode(e.keyCode)))||(e.ctrlKey&&e.keyCode==='U'.charCodeAt(0))) return false;
    };
}

// ===============================
// Analytics (deferred 4s)
// ===============================
function loadAllAnalytics() {
    setTimeout(() => {
        const ga = document.createElement('script');
        ga.async = true;
        ga.src = 'https://www.googletagmanager.com/gtag/js?id=G-S146W8G7MB';
        document.head.appendChild(ga);

        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-S146W8G7MB');

        const va = document.createElement('script');
        va.src = '/_vercel/insights/script.js';
        va.defer = true;
        document.head.appendChild(va);

        const vsi = document.createElement('script');
        vsi.src = '/_vercel/speed-insights/script.js';
        vsi.defer = true;
        document.head.appendChild(vsi);
    }, 4000);
}

// ===============================
// PWA Registration
// ===============================
function registerPWA() {
    if('serviceWorker' in navigator){
        window.addEventListener('load',()=>{navigator.serviceWorker.register('/sw.js')
            .then(()=>console.log('PWA Registered'))
            .catch(err=>console.log('PWA Error',err));
        });
    }
}

// ===============================
// PropellerAds Runtime Loader (deferred 5s for desktop)
// ===============================
function loadPropellerAdsRuntime() {
    // Nap5k In-Page
    if(!document.getElementById('propellerInPage')){
        const s1=document.createElement('script');
        s1.id='propellerInPage';
        s1.dataset.zone='10668651';
        s1.src='https://nap5k.com/tag.min.js';
        s1.async=true;
        document.body.appendChild(s1);
    }

    // Gizokraijaw Vignette
    if(!document.getElementById('propellerVignette')){
        const s2=document.createElement('script');
        s2.id='propellerVignette';
        s2.dataset.zone='10668920';
        s2.src='https://gizokraijaw.net/vignette.min.js';
        s2.async=true;
        document.body.appendChild(s2);
    }

    // 5gvci Push fallback
    if(!document.getElementById('propellerPush')){
        const s3=document.createElement('script');
        s3.id='propellerPush';
        s3.src='https://5gvci.com/act/files/tag.min.js?z=10668929';
        s3.async=true;
        s3.setAttribute('data-cfasync','false');
        document.body.appendChild(s3);
    }
}

// ===============================
// Execute All
// ===============================
injectHeadElements();
loadComponent('navbar-placeholder','navbar.html');
loadComponent('footer-placeholder','footer.html');
enableProtection();
loadAllAnalytics();
registerPWA();
window.addEventListener('load',()=>{setTimeout(()=>loadPropellerAdsRuntime(),5000)});