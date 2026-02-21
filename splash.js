document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.getElementById('splash-screen');
    const mainApp = document.getElementById('app');

    // Optional: Add a subtle whoosh sound
    // const audio = new Audio('assets/splash-sound.mp3');
    // audio.play().catch(e => console.log('Audio autoplay blocked'));

    setTimeout(() => {
        // Fade out transition
        splashScreen.style.opacity = '0';
        splashScreen.style.visibility = 'hidden';
        
        // Show main app
        setTimeout(() => {
            splashScreen.style.display = 'none';
            mainApp.classList.remove('hidden');
            // Yahan se aapka router.js main content load karna shuru karega
        }, 500); // Wait for fade out CSS transition

    }, 3000); // 3 seconds total splash duration
});
