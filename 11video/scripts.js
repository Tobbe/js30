const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.fullscreen')

function togglePlay() {
    video[video.paused ? 'play' : 'pause']();
}

function updateButton() {
    toggle.innerHTML = video.paused ? '►' : '❚ ❚';
}

function skip() {
    video.currentTime += +this.dataset.skip;
}

function handleRangeUpdate() {
    video[this.name] = parseFloat(this.value);
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

let mouseIsDown = false;

function scrub(event) {
    if (mouseIsDown) {
        video.currentTime =
            video.duration * event.offsetX / progress.offsetWidth;
    }
}

function toggleFullscreen() {
    video.requestFullscreen();
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', scrub);
progress.addEventListener('mousedown', () => mouseIsDown = true);
progress.addEventListener('mouseup', () => mouseIsDown = false);
fullscreen.addEventListener('click', toggleFullscreen);