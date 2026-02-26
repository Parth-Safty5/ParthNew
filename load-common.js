async function loadComponent(id, file) {
    const isGitHub = window.location.pathname.includes('ParthNew');
    const basePath = isGitHub ? '/ParthNew/' : './';
    const path = isGitHub ? `/ParthNew/${file}` : `./${file}`;

    try {
        const response = await fetch(path);
        const data = await response.text();
        document.getElementById(id).innerHTML = data;

        // Fix links
        const container = document.getElementById(id);
        container.querySelectorAll('a').forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('http') && !href.startsWith('#')) {
                link.href = basePath + href.replace(/^\//, '');
            }
        });

        // NAVBAR LOAD HONE KE BAAD CLICK KAM KAREGA
        if (file === 'navbar.html') {
            activateMobileMenu();
        }
    } catch (e) { console.error("Error:", e); }
}

function activateMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.onclick = function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Debugging ke liye (Aap console mein dekh sakte hain)
            console.log("Menu toggled!"); 
        };
    }
}

loadComponent('navbar-placeholder', 'navbar.html');
loadComponent('footer-placeholder', 'footer.html');