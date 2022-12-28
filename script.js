const btnPlay = document.querySelector("#btn-play");
const btnPlayIcon = document.querySelector("#btn-play-icon");
const btnRepeat = document.querySelector("#btn-repeat");
const btnPrev = document.querySelector("#btn-prev");
const btnNext = document.querySelector("#btn-next");
const btnVolume = document.querySelector("#btn-volume");
const btnVolumeIcon = document.querySelector("#btn-volume i");
const playerVolume = document.querySelector("#player-volume");
const songName = document.querySelector("#song-name");
const songAuthor = document.querySelector("#song-author");
const songImage = document.querySelector("#song-image")
const playerCurrentTime = document.querySelector("#player-current-time");
const playerDuration = document.querySelector("#player-duration");
const playerProgress = document.querySelector("#player-progress");
const audioPlayer = document.querySelector("#audio-player");

let currentSong = 0;
let repeatSong = false;

const songs = [
  {
    image: "https://i.musicaimg.com/letras/500/1858463.jpg",
    name: "Just The Way You Are",
    author: "Bruno Mars",
    path: "./music/Bruno Mars - Just the way you are.mp3",
  },
  {
    image: "https://i.scdn.co/image/ab67616d0000b27374d08c131ee8f1633f7807d9",
    name: "Único",
    author: "Joey Montana",
    path: "./music/Joey Montana - Único.mp3",
  },
  {
    image: "https://i.scdn.co/image/ab67616d0000b2732ed5e363003b015fdbffd8a8",
    name: "Las Locuras Mías",
    author: "Silvestre Dangond",
    path: "./music/Silvestre Dangond - Las Locuras Mías.mp3",
  },
  {
    image: "https://cdns-images.dzcdn.net/images/cover/33a40c1cf41b58a708b827e3c98bf2e9/500x500.jpg",
    name: "San Lucas",
    author: "Kevin Kaarl",
    path: "./music/Kevin Kaarl - San Lucas.mp3",
  },
  {
    image: "https://i1.sndcdn.com/artworks-000288620498-wse55p-t500x500.jpg",
    name: "Bajo El Agua",
    author: "Manuel Medrano",
    path: "./music/Manuel Medrano - Bajo El Agua.mp3",
  },
  {
    image: "https://images.genius.com/1627d2826e2bdac0498beaaf85ef43cf.953x953x1.jpg",
    name: "Solamente Tú",
    author: "Pablo Alborán",
    path: "./music/Pablo Alborán - Solamente Tú.mp3",
  },
];

btnPlay.addEventListener("click", () => togglePlaySong());
btnPrev.addEventListener("click", () => changeSong(false));
btnNext.addEventListener("click", () => changeSong());
btnRepeat.addEventListener("click", () => toggleRepeatSong());
playerVolume.addEventListener("input", () => changeVolume());
playerProgress.addEventListener("input", () => changeTime());
audioPlayer.addEventListener("timeupdate", () => timeUpdate());
audioPlayer.addEventListener("ended", () => ended());

const togglePlaySong = () => {
  if (audioPlayer.paused) {
    audioPlayer.play();
    btnPlayIcon.classList.replace("bi-play-fill", "bi-pause-fill");
  } else {
    audioPlayer.pause();
    btnPlayIcon.classList.replace("bi-pause-fill", "bi-play-fill");
  }
};

const changeSong = (next = true) => {
  if (next && currentSong < songs.length - 1) {
    currentSong++;
  } else if (!next && currentSong > 0) {
    currentSong--;
  } else {
    return;
  }

  updatePlayer();
  togglePlaySong();
};

const updatePlayer = () => {
  const song = songs[currentSong];

  songImage.src = song.image;
  songName.innerHTML = song.name;
  songAuthor.innerHTML = song.author;
  audioPlayer.src = song.path;
  playerProgress.value = audioPlayer.currentTime;
};

const toggleRepeatSong = () => {
  repeatSong = !repeatSong;
  btnRepeat.classList.toggle("btn-activated");
};

const timeUpdate = () => {
  const { currentTime, duration } = audioPlayer;

  if (isNaN(duration)) return;

  playerDuration.innerHTML = formatSecondsToMinutes(duration);
  playerCurrentTime.innerHTML = formatSecondsToMinutes(currentTime);
  playerProgress.max = duration;
  playerProgress.value = currentTime;
};

const changeVolume = () => {
  const { value } = playerVolume;

  audioPlayer.volume = value;

  if (value == 0) {
    btnVolumeIcon.classList.replace("bi-volume-up-fill", "bi-volume-mute-fill");
  } else {
    btnVolumeIcon.classList.replace("bi-volume-mute-fill", "bi-volume-up-fill");
  }
};

const changeTime = () => {
  audioPlayer.currentTime = playerProgress.value;
};

const formatSecondsToMinutes = (seconds) => {
  return new Date(seconds * 1000).toISOString().slice(14, 19);
};

const ended = () => {
  repeatSong ? togglePlaySong() : changeSong(true);
};

window.onload = () => {
  updatePlayer();
};