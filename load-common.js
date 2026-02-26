async function loadComponent(id, file) {
    // Ye line check karti hai ki hum GitHub subfolder mein hain ya Netlify root mein
    const isGitHub = window.location.pathname.includes('ParthNew');
    const path = isGitHub ? `/ParthNew/${file}` : `./${file}`;

    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error("File not found");
        const data = await response.text();
        document.getElementById(id).innerHTML = data;
        console.log(file + " loaded successfully!");
    } catch (error) {
        console.error("Error loading " + file + ":", error);
    }
}

// Dono ko load karein
loadComponent('navbar-placeholder', 'navbar.html');
loadComponent('footer-placeholder', 'footer.html');
