async function loadComponent(id, file) {
    const isGitHub = window.location.pathname.includes('ParthNew');
    const basePath = isGitHub ? '/ParthNew/' : './';
    const path = isGitHub ? `/ParthNew/${file}` : `./${file}`;

    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error("File not found");
        const data = await response.text();
        const container = document.getElementById(id);
        container.innerHTML = data;

        // Links ko theek karna
        const links = container.querySelectorAll('a');
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('http') && !href.startsWith('#')) {
                link.href = basePath + href.replace(/^\//, '');
            }
        });

        // --- MOBILE MENU LOGIC (Add this) ---
        const hamburger = container.querySelector('.hamburger');
        const navMenu = container.querySelector('.nav-links');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

    } catch (error) {
        console.error("Error loading " + file + ":", error);
    }
}

loadComponent('navbar-placeholder', 'navbar.html');
loadComponent('footer-placeholder', 'footer.html');
