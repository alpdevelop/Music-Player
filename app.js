const container = document.querySelector(".container")
const image = document.querySelector("#music-image")
const audio = document.querySelector("#audio")
const title = document.querySelector(".music-details .title")
const singer = document.querySelector(".music-details .singer")
const play = document.querySelector("#controls #play")
const prev = document.querySelector("#controls #prev")
const next = document.querySelector("#controls #next")
const durationTime = document.querySelector("#duration-time")
const currentTime = document.querySelector("#current-time")
const progressBar = document.querySelector("#progress-bar")
const volumeBar = document.querySelector("#volume-bar")
const volume = document.querySelector("#volume")
const ul = document.querySelector("ul")



const player = new MusicPlayer(musicList);


window.addEventListener("load", () => {
    let music = player.getMusic()
    displayMusic(music);
    displayMusicList(player.musicList);
    
})

const displayMusic = (music) => {
    title.innerText = music.getName();
    image.src = "img/" + music.img;
    audio.src = "assets/" + music.file;
}

// Prev and Next Funtions
prev.addEventListener("click", () => {prevMusic();})

const prevMusic = () => {
    player.prev();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
}

next.addEventListener("click", () => {nextMusic();})

const nextMusic = () => {
    player.next();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
}
// Check Play or Pause isMusicPlay?

play.addEventListener("click" , () => {
    const isMusicPlay = container.classList.contains("playing")
    isMusicPlay ? pauseMusic() : playMusic();
});

const pauseMusic = () => {
    container.classList.remove("playing");
    play.querySelector("#play-i").classList = "fa-solid fa-play" ;
    audio.pause();
}

const playMusic = () => {
    container.classList.add("playing")
    play.querySelector("#play-i").classList = "fa-solid fa-pause"
    audio.play();
}

// Time Sections //

const calculateTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    const updateSec = sec < 10 ? `0${sec}` : `${sec}`
    return  `${min}:${updateSec}`
}

audio.addEventListener("loadedmetadata", () =>{
    durationTime.textContent = calculateTime(audio.duration);
    progressBar.max = Math.floor(audio.duration);
})

audio.addEventListener("timeupdate", () => {
    progressBar.value = Math.floor(audio.currentTime);
    currentTime.textContent = calculateTime(progressBar.value)
})

progressBar.addEventListener("input", () => {
    currentTime.textContent = calculateTime(progressBar.value);
    audio.currentTime = progressBar.value;
})

volumeBar.addEventListener("input", (e) => {
    const value = e.target.value 
    audio.volume = value/100; //The audio volume is between 0 and 1.
    if(value == 0 ){
        audio.muted = true;
        muteState = "muted"
        volume.classList = "fa-solid fa-volume-xmark"
    }else{
        audio.muted = false;
        muteState = "volume"
        volume.classList = "fa-solid fa-volume-high"
    }
})

let muteState = "muted";
volume.addEventListener("click", () => {
    if(muteState === "muted"){
        audio.muted = false;
        muteState = "volume"
        volume.classList = "fa-solid fa-volume-high"
        volumeBar.value = 100;
    }else{
        audio.muted = true;
        muteState = "muted"
        volume.classList = "fa-solid fa-volume-xmark"
        volumeBar.value = 0;
    }
})

const displayMusicList = (list) => {
    for(let i = 0; i < list.length ; i++ ){
        let liTag = `<li li-index='${i}' onclick="selectedMusic(this)" class="list-group-item d-flex justify-content-between align-items-center">
                        <span>${list[i].getName()}</span>
                        <span id="music-${i}" class="badge bg-primary rounded-pill"></span>
                        <audio class="music-${i}" src="assets/${list[i].file}"></audio>
                    </li>`;
                    
        ul.insertAdjacentHTML("beforeend" , liTag);

        let liAudioDuration = ul.querySelector(`#music-${i}`)
        let liAudioTag = ul.querySelector(`.music-${i}`);

        liAudioTag.addEventListener("loadeddata", () => {
            liAudioDuration.innerText = calculateTime(liAudioTag.duration);
        });

    }
}

const selectedMusic = (li) => {
    player.index = li.getAttribute("li-index");
    displayMusic(player.getMusic());
    playMusic();
    isPlaying();
}

const isPlaying = () => {
    for(let li of ul.querySelectorAll("li")){
        if(li.classList.contains("playing")){
            li.classList.remove("playing")
        }

        if(li.getAttribute("li-index") == player.index){
            li.classList.add("playing")
        }
    }
}

audio.addEventListener("ended" , () => {
    nextMusic();
})