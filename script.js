const startStopBtn = document.querySelector("#start-pause");

const resetBtn = document.querySelector("#reset");

const displayTimer = document.querySelector("#time");

const statusMessage = document.querySelector("#status-message");

// variables for time values
let minutes = 25;
let seconds = 0;
let timerInterval = null;
let timeStatus = "stopped";
let leadingSeconds = 0;
let leadingMinutes = 0;

const countDown = () => {
  if (minutes === 0 && seconds === 0) {
    window.clearInterval(timerInterval);
    startStopBtn.innerHTML = `▶ Start focus`;
    startStopBtn.removeAttribute("id", "pause-btn");
    startStopBtn.setAttribute("id", "start-pause");
    timeStatus = "stopped";
    statusMessage.innerText = "Session complete. Great work!";
    return;
  }

  // if seconds reached zero, take one minute away and restart seconds at 59
  if (seconds === 0) {
    minutes--;
    seconds = 59;
  } else {
    // otherwise just take one second away
    seconds--;
  }

  if (seconds < 10) {
    leadingSeconds = "0" + seconds.toString();
  } else {
    leadingSeconds = seconds;
  }

  if (minutes < 10) {
    leadingMinutes = "0" + minutes.toString();
  } else {
    leadingMinutes = minutes;
  }
  displayTimer.innerText = leadingMinutes + ":" + leadingSeconds;
};

// Event Listeners

// 1. Start / Pause button
const startStop = () => {
  // start condition
  if (timeStatus === "stopped") {
    timerInterval = window.setInterval(countDown, 1);
    startStopBtn.innerHTML = `Pause`;
    startStopBtn.removeAttribute("id", "start-pause");
    startStopBtn.setAttribute("id", "pause-btn");
    statusMessage.innerText = "Stay focused. You've got this.";
    timeStatus = "started";
  } else {
    //  pause condition
    window.clearInterval(timerInterval);
    startStopBtn.innerHTML = ` Start focus`;
    startStopBtn.removeAttribute("id", "pause-btn");
    startStopBtn.setAttribute("id", "start-pause");
    statusMessage.innerText = "Paused. Press start to continue.";
    timeStatus = "stopped";
  }
};

// start/pause button
startStopBtn.addEventListener("click", startStop);

// 2. Reset button
const reset = () => {
  window.clearInterval(timerInterval);
  minutes = 25;
  seconds = 0;
  displayTimer.innerHTML = "25:00";
  startStopBtn.innerHTML = `Start focus`;
  startStopBtn.removeAttribute("id", "pause-btn");
  startStopBtn.setAttribute("id", "start-pause");
  timeStatus = "stopped";
  statusMessage.innerText = "Choose a task, then start your session.";
};

resetBtn.addEventListener("click", reset);
