const video = document.getElementById("videoPlayer");
const playPauseBtn = document.getElementById("playPause");
const progressBar = document.querySelector(".progress-bar");
const progress = document.querySelector(".progress");
const timeDisplay = document.getElementById("timeDisplay");
const volumeControl = document.getElementById("volume");
const fullscreenBtn = document.getElementById("fullscreen");

// Play/Pause functionality
playPauseBtn.addEventListener("click", () => {
  if (video.paused) {
    video.play();
    playPauseBtn.textContent = "Pause";
  } else {
    video.pause();
    playPauseBtn.textContent = "Play";
  }
});

// Update progress bar and time
video.addEventListener("timeupdate", () => {
  const progressPercent = (video.currentTime / video.duration) * 100;
  progress.style.width = `${progressPercent}%`;

  const currentMinutes = Math.floor(video.currentTime / 60);
  const currentSeconds = Math.floor(video.currentTime % 60);
  const durationMinutes = Math.floor(video.duration / 60);
  const durationSeconds = Math.floor(video.duration % 60);

  timeDisplay.textContent = `${currentMinutes}:${currentSeconds
    .toString()
    .padStart(2, "0")} / ${durationMinutes}:${durationSeconds
    .toString()
    .padStart(2, "0")}`;
});

// Seek functionality
progressBar.addEventListener("click", (e) => {
  const rect = progressBar.getBoundingClientRect();
  const pos = (e.clientX - rect.left) / rect.width;
  video.currentTime = pos * video.duration;
});

// Volume control
volumeControl.addEventListener("input", () => {
  video.volume = volumeControl.value;
});

// Fullscreen functionality
fullscreenBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    video.requestFullscreen().catch((err) => {
      console.error(
        `Error attempting to enable full-screen mode: ${err.message}`
      );
    });
  } else {
    document.exitFullscreen();
  }
});

// Update button text when video ends
video.addEventListener("ended", () => {
  playPauseBtn.textContent = "Play";
});

// Error handling
video.addEventListener("error", () => {
  console.error("Error loading video.");
});

// Fullscreen change event
document.addEventListener("fullscreenchange", () => {
  if (document.fullscreenElement) {
    fullscreenBtn.textContent = "Exit Fullscreen";
  } else {
    fullscreenBtn.textContent = "Fullscreen";
  }
});
