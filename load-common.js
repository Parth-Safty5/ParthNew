console.log("Script loaded successfully!"); // Check karne ke liye

async function loadComponent(id, file) {
    console.log("Attempting to load: " + file);
    try {
        const res = await fetch(file);
        if (!res.ok) throw new Error("Could not find " + file);
        const html = await res.text();
        document.getElementById(id).innerHTML = html;
        console.log(file + " injected successfully!");
    } catch (err) {
        console.error("Error: ", err);
    }
}

// Bina kisi wait ke seedha call karein
loadComponent('navbar-placeholder', 'navbar.html');
loadComponent('footer-placeholder', 'footer.html');
