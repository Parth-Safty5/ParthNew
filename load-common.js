async function loadComponent(id, file) {
    // Hum current location ke hisab se path set kar rahe hain
    const path = window.location.pathname.includes('ParthNew') ? `/ParthNew/${file}` : `/${file}`;
    
    try {
        const res = await fetch(path);
        if (!res.ok) throw new Error("File not found: " + path);
        const html = await res.text();
        document.getElementById(id).innerHTML = html;
        console.log(file + " loaded!");
    } catch (err) {
        console.error("Error loading " + file + ":", err);
    }
}

// Dono ko call karein
loadComponent('navbar-placeholder', 'navbar.html');
loadComponent('footer-placeholder', 'footer.html');
