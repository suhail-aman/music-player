let songs=[
   {
      title:"Dildariyan",
      artist:"Amrinder Gill",
      src:"../Dildarian - Amrinder Gill.mp3",
      img:"../amrinder.jpg"
   },
   {
      title:"Wo Humsafar Tha",
      artist:"Qurat-ul-Ain Balouch",
      src:"../Wo Humsafar Tha(KoshalWorld.Com).mp3",
      img:"../Screenshot 2024-12-03 193029.png"
   },
   {
      title:"Itna Na Mujhse Tu Pyar Badha",
      artist:"Talat Mahmood",
      src:"../Itna Na Mujhse Tu Pyar Badha.....mp3",
      img:"../itna na mujhse tu pyaar bhada.png"
   },
   {
      title:"Chithi Na Koi Sandesh",
      artist:"Jagjeet Singh",
      src:"../Chithi Na Koi Sandesh Male Dushman 320 Kbps.mp3",
      img:"../128Chithi Na Koi Sandesh Male - Dushman 128 Kbps.jpg"
   }
];

let currentSongIndex=0;

let progress=document.getElementById("progress")
let song=document.getElementById("song")
let ctricon=document.getElementById("ctricon")
let songTitle=document.querySelector('h1')
let songArtist=document.querySelector('p')
let songImage=document.querySelector('.song-img')

function loadSong(index) {
   let currentSong = songs[index];
   song.src = currentSong.src;
   songTitle.textContent = currentSong.title;
   songArtist.textContent = currentSong.artist;
   songImage.src = currentSong.img;
   progress.value = 0;
}

loadSong(currentSongIndex);

song.onloadedmetadata = function(){
   progress.max=song.duration
   progress.value=song.currentTime
}
function playPause(){
   if(ctricon.classList.contains('fa-pause')){
      song.pause()
      ctricon.classList.remove('fa-pause')
      ctricon.classList.add('fa-play')
   }
   else{
      song.play()
      ctricon.classList.add('fa-pause')
      ctricon.classList.remove('fa-play')
   }
}
if(song.play()){
   setInterval(() => {
      progress.value=song.currentTime
   }, 400);
}
progress.onchange=function(){
   song.currentTime=progress.value
   song.play()
   ctricon.classList.add('fa-pause')
   ctricon.classList.remove('fa-play')
}
// Next song function
function nextSong() {
   currentSongIndex = (currentSongIndex + 1) % songs.length;
   loadSong(currentSongIndex);
   song.play();
   ctricon.classList.add('fa-pause');
   ctricon.classList.remove('fa-play');
}

// Previous song function
function previousSong() {
   currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
   loadSong(currentSongIndex);
   song.play();
   ctricon.classList.add('fa-pause');
   ctricon.classList.remove('fa-play');
}
document.addEventListener('keydown', function(event) {
   if (event.code === 'Space') {
      event.preventDefault(); // Prevents the page from scrolling down when space is pressed
      playPause();
   }
});
let isRepeatOn = false;

function toggleRepeat() {
   const repeatIcon = document.getElementById('repeat-icon');
   isRepeatOn = !isRepeatOn;

   if (isRepeatOn) {
      repeatIcon.classList.add('active');
      song.loop = true; 
   } else {
      repeatIcon.classList.remove('active');
      song.loop = false; 
   }
}
// time duration js
const currentTimeDisplay = document.getElementById("current-time");
const totalDurationDisplay = document.getElementById("total-duration");

song.onloadedmetadata = function () {
   progress.max = song.duration;
   progress.value = song.currentTime;
   totalDurationDisplay.textContent = formatTime(song.duration);
};

function updateProgress() {
   progress.value = song.currentTime;
   currentTimeDisplay.textContent = formatTime(song.currentTime);
}

// Convert time 
function formatTime(time) {
   const minutes = Math.floor(time / 60);
   const seconds = Math.floor(time % 60).toString().padStart(2, "0");
   return `${minutes}:${seconds}`;
}
if (song.play()) {
   setInterval(updateProgress, 500);
}
progress.oninput = function () {
   song.currentTime = progress.value;
   updateProgress();
};

const dropdownTrigger = document.querySelector('.dropdown-trigger');
const dropdownMenu = dropdownTrigger.querySelector('.dropdown');
   
dropdownTrigger.addEventListener('click', function (e) {
e.stopPropagation(); 
dropdownMenu.classList.toggle('show'); 
});
   
document.addEventListener('click', function () {
dropdownMenu.classList.remove('show'); 
});
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.getElementById('volume-range');

// Update volume based on range input
volumeRange.addEventListener('input', function () {
   song.volume = volumeRange.value;
   updateVolumeIcon(volumeRange.value);
});

// Update volume icon based on the volume level
function updateVolumeIcon(volume) {
   if (volume === '0') {
      volumeIcon.className = 'fa-solid fa-volume-xmark';
   } else if (volume <= 0.5) {
      volumeIcon.className = 'fa-solid fa-volume-low';
   } else {
      volumeIcon.className = 'fa-solid fa-volume-high';
   }
}

// Mute/Unmute functionality
volumeIcon.addEventListener('click', function () {
   if (song.volume > 0) {
      song.volume = 0;
      volumeRange.value = 0;
      updateVolumeIcon('0');
   } else {
      song.volume = 1;
      volumeRange.value = 1;
      updateVolumeIcon('1');
   }
});

