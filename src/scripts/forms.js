export function initForms() {
    // RSVP Form
    const rsvpForm = document.getElementById('rsvp-form');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = "Enviando...";
            btn.disabled = true;

            const params = new URLSearchParams();
            params.append('entry.1959707855', this.nombre.value);
            params.append('entry.269848605', this.querySelector('input[name="asistencia"]:checked').value);
            params.append('entry.1916552038', this.alergias.value || "Ninguna");
            params.append('entry.1096616265', this.telefono.value);

            const googleFormsUrl = 'https://docs.google.com/forms/d/e/1FAIpQLScf124vIfgsIMNVae7LV9rnn5GLlWPNgmS8CyWUIHKPvINxIQ/formResponse';

            fetch(googleFormsUrl, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: params.toString()
            }).then(() => {
                // En modo no-cors, el 'then' se ejecuta si la petición se envió, 
                // independientemente de lo que diga el servidor.
                btn.innerHTML = "¡Confirmado!";
                btn.style.backgroundColor = "#7f8868";
                btn.style.color = "white";
                this.reset();
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    btn.style.backgroundColor = "";
                    btn.style.color = "";
                }, 5000);
            }).catch(error => {
                console.error('Error de red:', error);
                btn.innerHTML = "❌ Error de conexión";
                btn.style.backgroundColor = "#d9534f"; // Rojo para error
                btn.style.color = "white";
                btn.disabled = false;
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = "";
                    btn.style.color = "";
                }, 5000);
            });
        });
    }

    // Music Suggestion Form
    const musicForm = document.getElementById('musicForm');
    if (musicForm) {
        musicForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = "Enviando...";
            btn.disabled = true;

            const params = new URLSearchParams();
            params.append('entry.1121410571', document.getElementById('mGuest').value);
            params.append('entry.928136637', document.getElementById('mSong').value);
            params.append('entry.1918756479', document.getElementById('mArtist').value);
            // El link no está mapeado en tu nuevo Form, así que no lo enviamos por ahora

            const musicGoogleUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSet6wi0z6CjZyP6eAoVs_PoHY1q4HQGw0tpKuFUQPDZq2J_gA/formResponse';

            fetch(musicGoogleUrl, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: params.toString()
            }).then(() => {
                btn.innerHTML = "¡Sugerencia enviada!";
                btn.style.backgroundColor = "#7f8868";
                btn.style.color = "white";
                this.reset();
                setTimeout(() => {
                    closeMusicModal();
                    // Reset botón para la próxima vez
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    btn.style.backgroundColor = "";
                    btn.style.color = "";
                }, 2000);
            }).catch(error => {
                console.error('Error:', error);
                btn.innerHTML = "❌ Error al enviar";
                btn.disabled = false;
            });
        });
    }

    // Keyboard visibility fix
    const formInputs = document.querySelectorAll('input[type="text"], input[type="tel"]');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            setTimeout(() => {
                input.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        });
    });
}

export function openMusicModal() {
    const modal = document.getElementById('musicModal');
    if (modal) modal.style.display = 'flex';
}

export function closeMusicModal() {
    const modal = document.getElementById('musicModal');
    if (modal) modal.style.display = 'none';
}
