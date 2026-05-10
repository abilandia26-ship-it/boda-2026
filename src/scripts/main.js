import '../styles/main.css';

import { initCountdown } from './countdown.js';
import { initAnimations } from './animations.js';
import { initForms, openMusicModal, closeMusicModal } from './forms.js';
import { initMedia } from './media.js';
import { initParticles } from './particles.js';
import guestsData from '../data/guests.json';

// Validación de Invitado
const urlParams = new URLSearchParams(window.location.search);
const guestId = urlParams.get('id');

if (!guestId || !guestsData[guestId]) {
    document.body.innerHTML = `
        <div style="height:100vh; display:flex; flex-direction:column; justify-content:center; align-items:center; background:#fffcf9; color:#c5a880; font-family:'Montserrat', sans-serif; text-align:center; padding:20px;">
            <h1 style="font-family:'Cormorant Garamond', serif; font-size: 2.5rem; margin-bottom:10px;">Acceso Denegado</h1>
            <p style="color:#4a4a4a;">Este enlace de invitación no es válido o ha caducado. Por favor solicita el enlace correcto a los novios.</p>
        </div>
    `;
    throw new Error("Invalid or missing guest ID");
}

window.currentGuest = guestsData[guestId];

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
            ${slide10}
            ${slide11}
            ${utils}
        </main>
        
        <!-- Loading Screen -->
        <div id="loading-screen">
            <div class="loader-monogram">♥</div>
            <div class="loader-bar-track">
                <div class="loader-bar-fill"></div>
            </div>
            <div class="loader-text">NUESTRA HISTORIA COMIENZA</div>
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
    initParticles();

    // Personalizar DOM con los datos del invitado
    const guest = window.currentGuest;
    const greetingEl = document.getElementById('guest-greeting');
    if (greetingEl) {
        greetingEl.textContent = `${guest.n} ${guest.a}`;
    }

    const passesInfo = document.getElementById('guest-passes-info');
    if (passesInfo) {
        passesInfo.textContent = `Tienes pases reservados para: ${guest.p} persona(s)`;
    }

    const passesContainer = document.getElementById('passes-selection-container');
    const passesSelect = document.getElementById('pases-utilizados');
    if (passesContainer && passesSelect && guest.p > 1) {
        // Inicialmente se mantiene oculto por el CSS hasta que elijan "Sí, estaré allí"
        for (let i = 1; i <= guest.p; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i === 1 ? '1 pase' : `${i} pases`;
            passesSelect.appendChild(option);
        }

        // Ocultar o mostrar si eligen no asistir
        const attendanceRadios = document.querySelectorAll('input[name="asistencia"]');
        attendanceRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                if (this.value === 'Sí, estaré allí') {
                    passesContainer.style.display = 'block';
                } else {
                    passesContainer.style.display = 'none';
                }
            });
        });
    }

    const rsvpName = document.getElementById('rsvp-nombre');
    if (rsvpName) {
        rsvpName.value = `${guest.n} ${guest.a}`;
    }

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
