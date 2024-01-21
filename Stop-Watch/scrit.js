const startBtn = document.querySelector('.play');
const stopBtn = document.querySelector('.stop');
const resetBtn = document.querySelector('.reset');

const showHour = document.querySelector('.hours');
const showMinutes = document.querySelector('.minutes');
const showSecconds = document.querySelector('.secconds');

let [secconds, minutes, hours] = [0, 0, 0];
let interval = null;

function setTime() {
    !interval &&
        (interval = setInterval(() => {
            secconds++;
            showTime();
        }, 500));
}
function showTime() {
    if (secconds === 60) {
        minutes++;
        secconds = 0;
    }
    if (minutes === 60) {
        hours++;
        minutes = 0;
    }

    showSecconds.innerText =
        secconds < 10 ? '0' + secconds : secconds;
    showMinutes.innerText = minutes < 10 ? '0' + minutes : minutes;
    showHour.innerText = hours < 10 ? '0' + hours : hours;
    startBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
}

function stopTime() {
    interval != null && clearInterval(interval);
    interval = null;
    startBtn.innerHTML = ` <i class="fa-solid fa-play startBtn"></i>`;
}
function resetTime() {
    secconds = 0;
    minutes = 0;
    hours = 0;
    stopTime();
    showTime();
    startBtn.innerHTML = ` <i class="fa-solid fa-play startBtn"></i>`;
}

startBtn.addEventListener('click', setTime);
stopBtn.addEventListener('click', stopTime);
resetBtn.addEventListener('click', resetTime);
