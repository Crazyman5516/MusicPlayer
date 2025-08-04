const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const audio = document.querySelector("#audio");
const title = document.querySelector("#music-details .title");
const artist = document.querySelector("#music-details .singer");
const prev = document.querySelector("#controls #prev");
const next = document.querySelector("#controls #next");
const play = document.querySelector("#controls #play");
const controls = document.querySelector("#controls");
const duration = document.querySelector("#duration");
const currentTime = document.querySelector("#current-time");
const progressBar = document.querySelector("#progress-bar");
const volume = document.querySelector("#volume");
const volumeBar = document.querySelector("#volume-bar");
const ul = document.querySelector("ul");

const player = new MusicPlayer(musicList);

let music = player.getmusic();

window.addEventListener("load", () => {
  let music = player.getmusic();
  displayMusic(music);
  displayMusicList(player.musicList);
  isPlayingNow(li);
});

function displayMusic(music) {
  title.innerText = music.getName();
  artist.innerText = music.artist;
  image.src = "img/" + music.img;
  audio.src = "mp3/" + music.file;
}

play.addEventListener("click", () => {
  const isMusicPlay = container.classList.contains("playing");
  isMusicPlay ? pauseMusic() : playMusic();
});

prev.addEventListener("click", () => {
  prevMusic();
});

next.addEventListener("click", () => {
  nextMusic();
});

function prevMusic() {
  player.previous();
  let music = player.getmusic();
  displayMusic(music);
  playMusic();
  isPlayingNow(li);
}

function nextMusic() {
  player.next();
  let music = player.getmusic();
  displayMusic(music);
  playMusic();
  isPlayingNow(li);
}

function pauseMusic() {
  container.classList.remove("playing");
  play.classList = "fa-solid fa-play";
  audio.pause();
}

function playMusic() {
  container.classList.add("playing");
  play.classList = "fa-solid fa-pause";
  audio.play();
}

const calculateTime = (second) => {
  const dakika = Math.floor(second / 60);
  const saniye = Math.floor(second % 60);
  const updatedSaniye = saniye < 10 ? `0${saniye}` : `${saniye}`;
  const sonuç = `${dakika}:${updatedSaniye}`;
  return sonuç;
};

audio.addEventListener("loadedmetadata", () => {
  duration.textContent = calculateTime(audio.duration);
  progressBar.max = Math.floor(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  progressBar.value = Math.floor(audio.currentTime);
  currentTime.textContent = calculateTime(progressBar.value);
});

progressBar.addEventListener("input", () => {
  currentTime.textContent = calculateTime(progressBar.value);
  audio.currentTime = progressBar.value;
});

let muteState = "sesli";

volumeBar.addEventListener("input", (e) => {
  const value = e.target.value;
  audio.volume = value / 100;
  if (value == 0) {
    audio.muted = true;
    muteState = "sessiz";
    volume.classList = "fa-solid fa-volume-xmark";
  } else {
    audio.muted = false;
    muteState = "sesli";
    volume.classList = "fa-solid fa-volume-high";
  }
});
volume.addEventListener("click", () => {
  if (muteState === "sesli") {
    audio.muted = true;
    muteState = "sessiz";
    volume.classList = "fa-solid fa-volume-xmark";
    volumeBar.value = 0;
  } else {
    audio.muted = false;
    muteState = "sesli";
    volume.classList = "fa-solid fa-volume-high";
    volumeBar.value = 100;
  }
});

const displayMusicList = (list) => {
  for (let i = 0; i < list.length; i++) {
    let liTag = `<li li-index="${i}" onclick="selectedmusic(this)"
              class="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>${list[i].getName()}</span>
              <span id="music-${i}" class="badge rounded-pill" style="background: linear-gradient(135deg, #1e3c72, #2a5298)"></span>
              <audio class="music-${i}" src="mp3/${list[i].file}"></audio>
            </li>`;

    ul.insertAdjacentHTML("beforeend", liTag);

    let liAudioDuration = ul.querySelector(`#music-${i}`);
    let liAudioTag = ul.querySelector(`.music-${i}`);

    liAudioTag.addEventListener("loadeddata", () => {
      liAudioDuration.innerText = calculateTime(liAudioTag.duration);
    });
  }
};

const selectedmusic = (li) => {
  player.currentIndex = li.getAttribute("li-index");
  displayMusic(player.getmusic());
  playMusic();
  isPlayingNow(li);
};

const isPlayingNow = (currentLi) => {
  for (let li of ul.querySelectorAll("li")) {
    li.classList.remove("playing");
  }
  if (currentLi.getAttribute("li-index") == player.currentIndex) {
    currentLi.classList.add("playing");
  }
};

audio.addEventListener("ended", () => {
  nextMusic();
});
