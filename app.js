const
    getContainer = document.querySelector(".container"),
    getVideoscreen = document.getElementById("videoScreen");

const 
    getPrev = document.getElementById("prev"),
    getNext = document.getElementById("next"),
    getPlay = document.getElementById("play"),
    getStop = document.getElementById("stop");

const
    getProgressCtn = document.getElementById("progressContainer"),
    getProgress = document.getElementById("progress");

const
    getOpenFullscreen = document.getElementById("openFullScreen"),
    getCloseFullscreen = document.getElementById("closeFullScreen");

const getDisplayTime = document.getElementById("displayTime");
const getControls = document.getElementById("control");
const getTitle = document.getElementById("title");

let index = 0;

let videos = ["samplevideo1", "samplevideo2"];

loadVideo(index);

function loadVideo(idx) {
    getVideoscreen.src = `./source/${videos[idx]}.mp4`;
    getTitle.innerText = videos[idx];
}

function playBtn() {
    getPlay.querySelector("i.fas").classList.remove("fa-play");
    getPlay.querySelector("i.fas").classList.add("fa-pause");
}

function pauseBtn() {
    getPlay.querySelector("i.fas").classList.remove("fa-pause");
    getPlay.querySelector("i.fas").classList.add("fa-play");
}

function playPauseBtn() {

    if (getVideoscreen.paused) {
        getVideoscreen.play();
    }else {
        getVideoscreen.pause();
    }

}

function nextBtn() {
    index++;

    if (index >= videos.length) {
        index = 0;
    }
    loadVideo(index);
    getVideoscreen.play();
}

function prevBtn() {
    index--;

    if (index < 0) {
        index = videos.length - 1;
    }
    loadVideo(index);
    getVideoscreen.play();
}

function stopBtn() {
    getVideoscreen.currentTime = 0;
    getVideoscreen.pause();
}

function updateProgress(e) {

    const {currentTime, duration} = e.target;
    getProgress.style.width = ((currentTime / duration) * 100) + "%";

    if (currentTime > 0) {
        const
            totalMins = Math.floor(duration / 60),
            totalSecs = Math.floor(duration % 60);

        const 
            mins = Math.floor(currentTime / 60),
            secs = Math.floor(currentTime % 60);
        
        const
            totalMinsText = totalMins.toString().padStart(2, "0"),
            totalSecsText = totalSecs.toString().padStart(2, "0"),
            minsText = mins.toString().padStart(2, "0"),
            secsText = secs.toString().padStart(2, "0");

        getDisplayTime.textContent = `${minsText}:${secsText}/${totalMinsText}:${totalSecsText}`;
    } else {
        getDisplayTime.innerHTML = "00:00/00:00";
    }

}

function setProgress(e) {

    const 
        eleWidth = this.clientWidth,
        eleClickX = e.offsetX,
        duration = getVideoscreen.duration,
        getCalcVal = (eleClickX / eleWidth) * duration;

    getVideoscreen.currentTime = getCalcVal;
}

function openfullScreen() {

    if (getContainer.requestFullscreen) {
		getContainer.requestFullscreen();
	} else if (getContainer.mozRequestFullscreen) {
		getContainer.mozRequestFullscreen();
	} else if (getContainer.webkitRequestFullscreen) {
		getContainer.webkitRequestFullscreen();
	} else if (getContainer.msRequestFullscreen) {
		getContainer.msRequestFullscreen();
	}

    getOpenFullscreen.style.display = 'none';
    getCloseFullscreen.style.display = 'inline-block';

}

function closeFullScreen() {

    if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if(document.mozCancelFullscreen) {
		document.mozCancelFullscreen();
	} else if(document.webkitExitFullscreen) {
		document.webkitExitFullscreen();
	} else if(document.msExitFullscreen) {
		document.msExitFullscreen();
	}

    getOpenFullscreen.style.display = 'inline-block';
    getCloseFullscreen.style.display = 'none';

}

getPlay.addEventListener("click", playPauseBtn);
getNext.addEventListener("click", nextBtn);
getPrev.addEventListener("click", prevBtn);
getStop.addEventListener("click", stopBtn);

getVideoscreen.addEventListener("click", playPauseBtn);
getVideoscreen.addEventListener("play", playBtn);
getVideoscreen.addEventListener("pause", pauseBtn);
getVideoscreen.addEventListener("ended", nextBtn);
getVideoscreen.addEventListener("timeupdate", updateProgress)

getProgressCtn.addEventListener("click", setProgress);

getOpenFullscreen.addEventListener("click", openfullScreen);
getCloseFullscreen.addEventListener("click", closeFullScreen);