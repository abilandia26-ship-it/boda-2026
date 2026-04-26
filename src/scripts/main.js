import '../styles/main.css';

// Import modules
import { initCountdown } from './countdown.js';
import { initAnimations } from './animations.js';
import { initForms, openMusicModal, closeMusicModal } from './forms.js';
import { initMedia } from './media.js';

// Import slides
import slide1 from '../sections/slide1.html?raw';
import slide2 from '../sections/slide2.html?raw';
import slide3 from '../sections/slide3.html?raw';
import slide4 from '../sections/slide4.html?raw';
import slide5 from '../sections/slide5.html?raw';
import slide6 from '../sections/slide6.html?raw';
import slide7 from '../sections/slide7.html?raw';
import slide8 from '../sections/slide8.html?raw';
import slide9 from '../sections/slide9.html?raw';
import slide10 from '../sections/slide10.html?raw';
import slide11 from '../sections/slide11.html?raw';
import utils from '../sections/utils.html?raw';

// Initialize the App
function init() {
    const app = document.getElementById('app');
    
    // Inject Sections
    app.innerHTML = `
        <main id="main-container">
            <div class="music-control" onclick="toggleMusic()" id="music-btn">🔊</div>
            ${slide1}
            ${slide2}
            ${slide3}
            ${slide4}
            ${slide5}
            ${slide6}
            ${slide7}
            ${slide8}
            ${slide9}
            ${slide10}
            ${slide11}
            ${utils}
        </main>
        
        <!-- Loading Screen -->
        <div id="loading-screen">
            <div class="loader-monogram">❤</div>
            <div class="loader-bar-track">
                <div class="loader-bar-fill"></div>
            </div>
            <div class="loader-text">SE ESTÁ PREPARANDO UN DÍA INOLVIDABLE</div>
        </div>

        <audio id="wedding-music" loop preload="none">
            <source src="musica_boda.mp3" type="audio/mpeg">
        </audio>
    `;

    // Global event bindings
    document.getElementById('envelope-tap-area').addEventListener('click', () => window.playEnvelopeVideo());
    document.getElementById('suggest-music-btn').addEventListener('click', openMusicModal);
    document.getElementById('close-music-modal').addEventListener('click', closeMusicModal);
    
    window.onclick = function(event) {
        const modal = document.getElementById('musicModal');
        if (event.target == modal) closeMusicModal();
    }

    // Initialize modules
    initCountdown();
    initAnimations();
    initForms();
    initMedia();

    // Hide loading screen
    window.addEventListener('load', () => {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) loadingScreen.classList.add('hidden');
        }, 2200);
    });
}

// Start
init();
