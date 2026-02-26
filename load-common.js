async function loadComponent(id, file) {
    try {
        const response = await fetch(file);
        const data = await response.text();
        document.getElementById(id).innerHTML = data;
    } catch (error) {
        console.error("Error loading " + file, error);
    }
}

// Dono ko load karo
window.onload = () => {
    loadComponent('navbar-placeholder', 'navbar.html');
    loadComponent('footer-placeholder', 'footer.html');
};