const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const speed = document.querySelector('.player-speed');
const player = document.querySelector('.player');
const fullscreenBtn = document.querySelector('.fullscreen');

// Play & Pause ----------------------------------- //
const showPlayIcon = () => {
   playBtn.classList.replace('fa-pause', 'fa-play');
   playBtn.setAttribute('title', 'Play');
}

const showPauseIcon = () => {
   playBtn.classList.replace('fa-play', 'fa-pause');
   playBtn.setAttribute('title', 'Pause');
}

const togglePlay = () => {
   if (video.paused){
      video.play();
      showPauseIcon();

   } else {
      video.pause();
      showPlayIcon();
   }
}

const displayTime = (time) => {
   const minutes = Math.floor(time / 60);
   let seconds = Math.floor(time % 60);
   seconds = seconds > 9 ? seconds : `0${seconds}`;
   return `${minutes}:${seconds}`;
}

// Update progress bar as video plays
const updateProgress = () => {
   progressBar.style.width = `${(video.currentTime / video.duration)*100}%`;
   currentTime.textContent = `${displayTime(video.currentTime)} /`; 
   duration.textContent = `${displayTime(video.duration)}`;
}

// Click the progress bar to set the play progress
const setProgress = (e) => {
   const updatedProgress = e.offsetX / progressRange.offsetWidth;
   progressBar.style.width = `${updateProgress*100}%`;
   video.currentTime = updatedProgress * video.duration;
}
// Volume Controls --------------------------- //
let lastVolume = 1;

const changeVolume = (e) => {
   let updatedVolume = e.offsetX / volumeRange.offsetWidth;
   if (updatedVolume < 0.1) {
        updatedVolume = 0; 
   }
   if (updatedVolume > 0.9) {
        updatedVolume = 1;
   }
   volumeBar.style.width = `${updatedVolume*100}%`
   video.volume = updatedVolume;
   volumeIcon.classList = '';
   if (updatedVolume > 0.7) {
        volumeIcon.classList.add('fa-solid', 'fa-volume-up');
   } else if (updatedVolume < 0.7 && updatedVolume > 0){
        volumeIcon.classList.add('fa-solid', 'fa-volume-down');
   } else if (updatedVolume === 0) {
        volumeIcon.classList.add('fa-solid', 'fa-volume-off');
   }
   lastVolume = updatedVolume;
}

const toggleMute = () => {
   volumeIcon.className = '';
   if (video.volume) {
      lastVolume = video.volume;
      video.volume = 0;
      volumeBar.style.width = 0;
      volumeIcon.classList.add('fa-solid', 'fa-volume-mute');
      volumeIcon.setAttribute('title', 'Unmute');
   } else {
      video.volume = lastVolume;
      volumeBar.style.width = `${lastVolume * 100}%`;
      volumeIcon.classList.add('fa-solid', 'fa-volume-up');
      volumeIcon.setAttribute('title', 'Mute');
   }
}
// Change Playback Speed -------------------- //
const changeSpeed = () => {
   video.playbackRate = speed.value
}

// View in fullscreen 
const openFullscreen = (elem) => {
   if (elem.requestFullscreen) {
     elem.requestFullscreen();
   } else if (elem.webkitRequestFullscreen) { /* Safari */
     elem.webkitRequestFullscreen();
   } else if (elem.msRequestFullscreen) { /* IE11 */
     elem.msRequestFullscreen();
   }
   video.classList.add('video-fullscreen')
 }
 
// Close fullscreen 
const closeFullscreen = () => {
   if (document.exitFullscreen) {
     document.exitFullscreen();
   } else if (document.webkitExitFullscreen) { /* Safari */
     document.webkitExitFullscreen();
   } else if (document.msExitFullscreen) { /* IE11 */
     document.msExitFullscreen();
   }
   video.classList.remove('video-fullscreen')
 }

let fullscreen = false;
const toggleFullscreen = () => {
   !fullscreen ? openFullscreen(player) : closeFullscreen();
   fullscreen = !fullscreen;
}

// EventListener
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('ended', showPlayIcon);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);
speed.addEventListener('change', changeSpeed);
fullscreenBtn.addEventListener('click', toggleFullscreen);
