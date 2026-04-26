export function initForms() {
    // RSVP Form
    const rsvpForm = document.getElementById('rsvp-form');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const nombre = this.nombre.value;
            const asistenciaEl = this.querySelector('input[name="asistencia"]:checked');
            const asistencia = asistenciaEl ? asistenciaEl.value : "";
            const alergias = this.alergias.value || "Ninguna";
            const telefono = this.telefono.value;

            const mensaje = `¡Hola! Soy ${nombre}. Confirmo que ${asistencia === 'si' ? 'SÍ asistiré' : 'NO podré asistir'} a la boda. Alergias: ${alergias}. Mi tel: ${telefono}`;

            window.open(`https://wa.me/593990044362?text=${encodeURIComponent(mensaje)}`, '_blank');
        });
    }

    // Music Suggestion Form
    const musicForm = document.getElementById('musicForm');
    if (musicForm) {
        musicForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const guest = document.getElementById('mGuest').value;
            const song = document.getElementById('mSong').value;
            const artist = document.getElementById('mArtist').value;
            const link = document.getElementById('mLink').value || "No incluido";

            const mensaje = `¡Hola! Soy ${guest}. Me encantaría sugerir esta canción para la boda: 
            🎵 Canción: ${song}
            👤 Artista: ${artist}
            🔗 Link: ${link}`;

            window.open(`https://wa.me/593990044362?text=${encodeURIComponent(mensaje)}`, '_blank');
            closeMusicModal();
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
