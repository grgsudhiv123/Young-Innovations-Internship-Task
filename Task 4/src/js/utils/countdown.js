export function Countdown(container) {
    if (!container) {
        console.error('Countdown container not found');
        return;
    }

    const textElGroup = container.querySelectorAll(
        'span.flex.flex-col > span:first-child',
    );

    const days = textElGroup[0];
    const hours = textElGroup[1];
    const minutes = textElGroup[2];
    const seconds = textElGroup[3];

    const countDownDate = new Date('Jan 1, 2026 12:00:00').getTime();

    const intervalId = setInterval(function () {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        if (distance < 0) {
            clearInterval(intervalId);
            container.innerHTML =
                '<p class="text-red-500 font-semibold text-center">Deal Expired!</p>';
            return;
        }

        const daysValue = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hoursValue = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutesValue = Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60),
        );
        const secondsValue = Math.floor((distance % (1000 * 60)) / 1000);

        days.textContent = String(daysValue).padStart(2, '0');
        hours.textContent = String(hoursValue).padStart(2, '0');
        minutes.textContent = String(minutesValue).padStart(2, '0');
        seconds.textContent = String(secondsValue).padStart(2, '0');
    }, 1000);

    return () => clearInterval(intervalId);
}

export const CountdownFeat = () => {
    const bannerCountdownContainer =
        document.getElementById('banner-countdown');
    Countdown(bannerCountdownContainer);
};
