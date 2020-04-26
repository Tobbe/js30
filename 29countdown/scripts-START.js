let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

buttons.forEach(button => button.addEventListener('click', startTimer));

document.customForm.onsubmit = event => {
    event.preventDefault();

    timer(+document.customForm.minutes.value * 60);

    event.target.reset();
}

function startTimer() {
    timer(this.dataset.time);
}

function timer(seconds) {
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.max(0, Math.round((then - Date.now()) / 1000));
        displayTimeLeft(secondsLeft);

        if (secondsLeft <= 0) {
            clearInterval(countdown);
        }
    }, 1000);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsStr = ('0' + (seconds % 60)).slice(-2);
    const display = `${minutes}:${secondsStr}`;
    timerDisplay.textContent = display;
    document.title = display;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const h = end.getHours();
    const m = ('0' + end.getMinutes()).slice(-2);
    endTime.textContent = `Be Back At ${h}:${m}`;
}