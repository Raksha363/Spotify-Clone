console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Euphoria - By Jungkook", filePath: "songs/1.mp3", coverPath: "images/1.jpg", timeStamp:"02:39"},
    {songName: "Fake Love", filePath: "songs/2.mp3", coverPath: "images/2.jpg", timeStamp:"04:02"},
    {songName: "I Need U", filePath: "songs/3.mp3", coverPath: "images/3.jpg", timeStamp:"03:31"},
    {songName: "Airplane Pt.2", filePath: "songs/4.mp3", coverPath: "images/4.jpg", timeStamp:"03:38"},
    {songName: "Make It Right", filePath: "songs/5.mp3", coverPath: "images/5.jpg", timeStamp:"03:46"},
    {songName: "Pied Piper", filePath: "songs/6.mp3", coverPath: "images/6.jpg", timeStamp:"04:05"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
    element.getElementsByClassName("timestamp")[0].innerHTML = songs[i].timeStamp; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

// State variables to keep track of the current song and its playing state
let currentSongIndex = null; // This will hold the index of the currently playing song
let isPlaying = false; // This will track the playing state of the audio

// Function to reset all play buttons to 'play' state
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

// Attach event listeners to each song item
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        const newSongIndex = parseInt(e.target.id);
        
        // If the same song is clicked
        if (newSongIndex === currentSongIndex) {
            if (isPlaying) {
                audioElement.pause();
                e.target.classList.remove('fa-pause-circle');
                e.target.classList.add('fa-play-circle');
                masterPlay.classList.remove('fa-pause-circle');
                masterPlay.classList.add('fa-play-circle');
                gif.style.opacity = 0;
            } else {
                audioElement.play();
                e.target.classList.remove('fa-play-circle');
                e.target.classList.add('fa-pause-circle');
                masterPlay.classList.remove('fa-play-circle');
                masterPlay.classList.add('fa-pause-circle');
                gif.style.opacity = 1;
            }
            isPlaying = !isPlaying;
        } else {
            // If a different song is clicked
            makeAllPlays();
            currentSongIndex = newSongIndex;
            isPlaying = true;
            audioElement.src = `songs/${currentSongIndex + 1}.mp3`;
            masterSongName.innerText = songs[currentSongIndex].songName;
            audioElement.currentTime = 0; // Reset to start of the new song
            audioElement.play();
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            gif.style.opacity = 1;
        }
    })
})


document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=5){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})