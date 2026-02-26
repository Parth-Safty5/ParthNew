async function loadComponent(id, file) {
    const isGitHub = window.location.pathname.includes('ParthNew');
    const basePath = isGitHub ? '/ParthNew/' : './';
    const path = isGitHub ? `/ParthNew/${file}` : `./${file}`;

    try {
        const response = await fetch(path);
        const data = await response.text();
        document.getElementById(id).innerHTML = data;

        // Links correction
        const container = document.getElementById(id);
        container.querySelectorAll('a').forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('http') && !href.startsWith('#')) {
                link.href = basePath + href.replace(/^\//, '');
            }
        });
    } catch (e) { console.error(e); }
}

// Mobile Menu Toggle Logic
document.addEventListener('click', function (e) {
    const hamburger = e.target.closest('.hamburger');
    if (hamburger) {
        const navMenu = document.getElementById('navMenu');
        // Toggle Active Classes
        hamburger.classList.toggle('active');
        if (navMenu.style.right === "0px") {
            navMenu.style.right = "-100%";
        } else {
            navMenu.style.right = "0px";
        }
    }
});

loadComponent('navbar-placeholder', 'navbar.html');
loadComponent('footer-placeholder', 'footer.html');
