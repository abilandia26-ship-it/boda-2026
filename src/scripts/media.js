export function initMedia() {
    const video = document.getElementById('envelope-video');
    const music = document.getElementById('wedding-music');
    const mainContainer = document.getElementById('main-container');
    const slide1 = document.getElementById('slide1');
    const slide2 = document.getElementById('slide2');
    const tapIndicator = document.getElementById('intro-tap-indicator');

    window.playEnvelopeVideo = () => {
        if (tapIndicator) tapIndicator.style.opacity = "0";
        if (music) music.play().catch(e => console.log("Audio play blocked"));
        if (video) video.play();

        if (video) {
            video.onended = function () {
                if (mainContainer) {
                    mainContainer.style.scrollSnapType = "none";
                    if (slide2) slide2.scrollIntoView({ behavior: 'smooth' });

                    setTimeout(() => {
                        if (slide1) slide1.style.display = 'none';
                        mainContainer.style.scrollSnapType = "y mandatory";
                        mainContainer.scrollTop = 0;
                        document.body.style.overflow = "auto";
                    }, 1000);
                }
            };
        }
    };

    window.toggleMusic = () => {
        const btn = document.getElementById('music-btn');
        if (music) {
            if (music.paused) {
                music.play();
                if (btn) btn.innerHTML = "🔊";
            } else {
                music.pause();
                if (btn) btn.innerHTML = "🔇";
            }
        }
    };
}
