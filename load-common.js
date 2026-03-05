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
// Vercel Analytics
// ===============================
function loadVercelInsights() {

    if (!document.getElementById('vercelAnalytics')) {
        const va = document.createElement('script');
        va.id = 'vercelAnalytics';
        va.src = '/_vercel/insights/script.js';
        va.defer = true;
        document.head.appendChild(va);
    }

    if (!document.getElementById('vercelSpeed')) {
        const vsi = document.createElement('script');
        vsi.id = 'vercelSpeed';
        vsi.src = '/_vercel/speed-insights/script.js';
        vsi.defer = true;
        document.head.appendChild(vsi);
    }
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
// EXECUTION
// ===============================
loadGoogleFonts();
enableProtection();
loadVercelInsights();
registerPWA();