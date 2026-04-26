export function initCountdown() {
    const weddingDate = new Date("Oct 10, 2026 16:00:00").getTime();

    const timer = setInterval(function () {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);

        const daysEl = document.getElementById("days");
        const hoursEl = document.getElementById("hours");
        const minsEl = document.getElementById("minutes");
        const secsEl = document.getElementById("seconds");

        if (daysEl) daysEl.innerHTML = d;
        if (hoursEl) hoursEl.innerHTML = h;
        if (minsEl) minsEl.innerHTML = m;
        if (secsEl) secsEl.innerHTML = s;

        if (distance < 0) {
            clearInterval(timer);
            const countdownEl = document.getElementById("countdown");
            if (countdownEl) countdownEl.innerHTML = "¡Llegó el gran día!";
        }
    }, 1000);
}
