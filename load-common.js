async function loadComponent(id, file) {
    // GitHub Pages ke sub-folder (ParthNew) ko handle karne ke liye path logic
    const repoName = 'ParthNew';
    const path = window.location.pathname.includes(repoName) ? `/${repoName}/${file}` : `/${file}`;

    console.log("Fetching: " + path); // Debugging ke liye

    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error("File not found");
        const data = await response.text();
        document.getElementById(id).innerHTML = data;
        console.log(file + " loaded successfully!");
    } catch (error) {
        console.error("Error loading " + file, error);
    }
}

// Dono components load karein
loadComponent('navbar-placeholder', 'navbar.html');
loadComponent('footer-placeholder', 'footer.html');
