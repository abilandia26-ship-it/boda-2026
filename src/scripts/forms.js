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

            const asistenciaRadio = this.querySelector('input[name="asistencia"]:checked').value;
            let finalAsistencia = asistenciaRadio;
            
            // Si el invitado tiene más de 1 pase y asiste, debe escoger cuántos usará
            const guest = window.currentGuest;
            let pasesInfo = '';
            if (guest && guest.p > 1 && asistenciaRadio === 'Sí, estaré allí') {
                const passesSelect = document.getElementById('pases-utilizados');

                // Limpiar error previo
                if (passesSelect) passesSelect.style.borderColor = '';
                const prevErr = document.getElementById('passes-error-msg');
                if (prevErr) prevErr.remove();

                if (!passesSelect || !passesSelect.value) {
                    // Error visual: borde rojo + mensaje debajo del select
                    passesSelect.style.borderColor = '#d9534f';
                    const errMsg = document.createElement('p');
                    errMsg.id = 'passes-error-msg';
                    errMsg.textContent = '⚠ Por favor indica cuántos pases vas a ocupar.';
                    errMsg.style.cssText = 'color:#d9534f; font-size:0.75rem; margin-top:4px; text-align:left;';
                    passesSelect.parentNode.appendChild(errMsg);
                    passesSelect.focus();
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    return;
                }

                // Guardamos los pases para incluirlos en alergias (campo texto libre)
                pasesInfo = ` | Pases: ${passesSelect.value} de ${guest.p}`;
            }

            const alergias = (this.alergias.value || 'Ninguna') + pasesInfo;

            const params = new URLSearchParams();
            params.append('entry.1959707855', this.nombre.value);
            params.append('entry.269848605', finalAsistencia); // Valor exacto del radio button
            params.append('entry.1916552038', alergias);       // Alergias + pases usados
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
