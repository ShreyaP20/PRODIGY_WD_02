let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;
let lapStart;
let prevLapEnd = 0;
let lapEnd;
let totalLap;
let totalTime = 0;
let lapcounter = 0;

const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const lapsList = document.getElementById("laps");


// Format time into hh:mm:ss.cs
function formatTime(ms) {
    let centiseconds = Math.floor(ms / 10) % 100;
    let seconds = Math.floor(ms / 1000) % 60;
    let minutes = Math.floor(ms / (1000 * 60)) % 60;
    return (
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0") + "." +
        String(centiseconds).padStart(2, "0")
    );
}

// Update display
function updateTime() {
    const now = Date.now();
    elapsedTime = now - startTime;
    display.textContent = formatTime(elapsedTime);
    lapStart = display.textContent;

    const myList = document.getElementById('laps');
    if (myList && myList.firstElementChild) {
        myList.firstElementChild.innerHTML = `<div class="lapcontainer">
                <p>`+ lapcounter + `</p>
                <p>`+ formatTime(elapsedTime - prevLapEnd) + `</p>
                <p>`+ lapStart + `</p>
            </div > `;
    }
    // totalTime = startTime + elapsedTime;
    // lapEnd = formatTime(totalTime);
}

function startMyWatch() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 10);
    startBtn.textContent = 'Stop';
    resetBtn.textContent = 'Lap';
    running = true;
}

function stopMyWatch() {
    clearInterval(timerInterval);
    startBtn.textContent = 'Start';
    resetBtn.textContent = 'Reset';
    running = false;
}
// Start stopwatch
startBtn.addEventListener("click", () => {
    if (running) {
        stopMyWatch();

    }
    else {
        startMyWatch();

    }

});

function resetMyWatch() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    display.textContent = "00:00.00";
    lapsList.innerHTML = "";
    lapcounter = 0;
}

function trackMyWatch() {
    lapcounter++;
    if (lapcounter == 1) {
        const li = document.createElement("li");
        // li.textContent = display.textContent;
        li.innerHTML = `<div class="lapcontainer">
                    <p>`+ lapcounter + `</p>
                    <p>`+ formatTime(elapsedTime - prevLapEnd) + `</p>
                    <p>`+ lapStart + `</p>
                </div > `
        lapsList.prepend(li);
        lapcounter++;
        const li2 = document.createElement("li");
        // li.textContent = display.textContent;
        li2.innerHTML = `<div class="lapcontainer">
                    <p>`+ lapcounter + `</p>
                    <p>`+ formatTime(elapsedTime - prevLapEnd) + `</p>
                    <p>`+ lapStart + `</p>
                </div > `
        lapsList.prepend(li2);
    } else {
        const li = document.createElement("li");
        // li.textContent = display.textContent;
        li.innerHTML = `<div class="lapcontainer">
                    <p>`+ lapcounter + `</p>
                    <p>`+ formatTime(elapsedTime - prevLapEnd) + `</p>
                    <p>`+ lapStart + `</p>
                </div > `
        lapsList.prepend(li);
    }
    resetBtn.textContent = 'Lap';
    if (prevLapEnd < elapsedTime) {
        prevLapEnd = elapsedTime;
    }
}

resetBtn.addEventListener("click", () => {

    if (running) {
        trackMyWatch();

    }
    else {
        resetMyWatch();
    }

});
