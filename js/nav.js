function ResetIndex(){
   fetch("../html/Home.html")
         .then(response => response.text())
            .then(data => {
                const mainWindow = document.getElementById('main');
                if (mainWindow) {
                    mainWindow.innerHTML = data;
                     }
                else {
                    console.error('Main element not found');
                }
            })
            .catch(error => console.error('Error loading index:', error));
}

window.ResetIndex = ResetIndex;