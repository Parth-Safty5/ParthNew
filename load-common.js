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

        // --- Ye hai Magic Part: Saare links ko theek karna ---
        const links = container.querySelectorAll('a');
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('http') && !href.startsWith('#')) {
                // Link ke aage sahi folder path joda ja raha hai
                link.href = basePath + href.replace(/^\//, '');
            }
        });

    } catch (error) {
        console.error("Error loading " + file + ":", error);
    }
}

loadComponent('navbar-placeholder', 'navbar.html');
loadComponent('footer-placeholder', 'footer.html');
