



/*
function loadHTML(filePath, elementId, callback) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) throw new Error(`Failed to load ${filePath}`);
            return response.text();
        })
        .then(data => {
            const el = document.getElementById(elementId);
            if (el) {
                el.innerHTML = data;
                if (callback) callback(); 
            } else {
                console.error(`Element with ID '${elementId}' not found`);
            }
        })
        .catch(error => console.error(error));
}

// Load navigation
loadHTML('../html/Nav.html', 'nav');

// Load home page
loadHTML('../html/Home.html', 'main');

// Load game page with an initialization callback
function PlayGame() {
    loadHTML('../html/Game.html', 'main', initGame);
}

*/