async function loadComponent(id, file) {
    const isGitHub = window.location.pathname.includes('ParthNew');
    const basePath = isGitHub ? '/ParthNew/' : './';
    const path = isGitHub ? `/ParthNew/${file}` : `./${file}`;

    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error("File not found");
        const data = await response.text();
        document.getElementById(id).innerHTML = data;

        // Links correct karne ka logic
        const container = document.getElementById(id);
        const links = container.querySelectorAll('a');
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('http') && !href.startsWith('#')) {
                link.href = basePath + href.replace(/^\//, '');
            }
        });
    } catch (error) {
        console.error("Error loading " + file + ":", error);
    }
}

// --- YE SABSE ZARURI HAI: CLICK DETECT KARNE KE LIYE ---
document.addEventListener('click', function (e) {
    // Check karein ki kya user ne hamburger ya uske kisi bar par click kiya hai
    const hamburger = e.target.closest('.hamburger');
    if (hamburger) {
        const navMenu = document.getElementById('navMenu');
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    }
});

loadComponent('navbar-placeholder', 'navbar.html');
loadComponent('footer-placeholder', 'footer.html');
