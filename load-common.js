document.addEventListener("DOMContentLoaded", function() {
    async function loadComponent(id, file) {
        try {
            // Humne yahan './' lagaya hai taaki browser usi folder mein dhoondhe
            const res = await fetch('./' + file); 
            if (!res.ok) throw new Error("File not found: " + file);
            const html = await res.text();
            document.getElementById(id).innerHTML = html;
        } catch (err) {
            console.error("Error loading component:", err);
        }
    }

    loadComponent('navbar-placeholder', 'navbar.html');
    loadComponent('footer-placeholder', 'footer.html');
});