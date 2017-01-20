window.addEventListener('load',function() {

    pbarContainer =document.getElementById('pbar-container')
    pbar = document.getElementById('pbar')

	video = document.getElementById('video');

	playButton = document.getElementById('play-button');
	timeField = document.getElementById('time-field');
	soundButton = document.getElementById('sound-button');
	sbarContainer = document.getElementById('sbar-container')
	sbar = document.getElementById('sbar');
	fullscreenButton = document.getElementById('full-button')
    
    video.load();
    video.addEventListener('canplay',function(){

    	playButton.addEventListener('click',PlayOrPause,false);
    	pbarContainer.addEventListener('click',skip,false);
    	updatePlayer();
    	soundButton.addEventListener('click',muteOrUnmute,false);
    	sbarContainer.addEventListener('click', changeVolume,false);
    	fullscreenButton.addEventListener('click',fullscreen,false);

    }, false);
	
}, false);

function PlayOrPause(){
	if (video.paused) {
		video.play();
		playButton.src = "Assets/pause.png";
		update = setInterval(updatePlayer,30)
	
	} else {
		video.pause();
		playButton.src = "Assets/play.png";
		window.clearInterval(update);
	}
}

function updatePlayer(){
	var percentage = (video.currentTime/video.duration)*100;
    pbar.style.width = percentage + '%';
    timeField.innerHTML = getFormattedTime();
    if (video.ended) {
    	window.clearInterval(update);
    	playButton.src= 'Assets/replay.png'
    }
}

function skip(ev){
	var mouseX = ev.pageX - pbarContainer.offsetLeft;
	var width = window.getComputedStyle(pbarContainer).getPropertyValue('width');
	width = parseFloat(width.substr(0, width.length - 2));

    video.currentTime = (mouseX/width)*video.duration;
    updatePlayer();




}

function getFormattedTime(){

var seconds = Math.round(video.currentTime);
var minutes = Math.floor(seconds/60);
if (minutes > 0) {
	seconds -= minutes*60;
}
if (minutes.toString().length === 1)  {

	minutes = '0' + minutes;
}
if (seconds.toString().length === 1)  {

	seconds = '0' + seconds;
}

var totalseconds = Math.round(video.duration);
var totalminutes = Math.floor(totalseconds/60);
if (totalminutes > 0) {
	totalseconds -= totalminutes*60;
}
if (totalminutes.toString().length === 1)  {

	totalminutes = '0' + totalminutes;
}
if (totalseconds.toString().length === 1)  {

	totalseconds = '0' + totalseconds;
}


return (minutes + ":" + seconds + "/" + totalminutes + ":" + totalseconds );

}


function muteOrUnmute(){
	if (!video.muted) {
		video.muted = true;
		soundButton.src = 'Assets/muted.png';
		sbar.style.display = 'none';
		
	} else{
		video.muted = false;
		soundButton.src = 'Assets/volume.png';
		sbar.style.display = 'block';

	}
}

function changeVolume(ev){
    var mouseX = ev.pageX - sbarContainer.offsetLeft;
    var width = window.getComputedStyle(sbarContainer).getPropertyValue('width');
	width = parseFloat(width.substr(0, width.length - 2));

	video.volume = (mouseX/width);
	sbar.style.width = (mouseX/width)*100 + '%';
	video.muted = false;
    soundButton.src = 'Assets/volume.png';
	sbar.style.display = 'block';
}

function fullscreen(){
	if (video.requestFullscreen) {
		video.requestFullscreen();
	} else if (video.webkitRequestFullscreen){
		video.webkitRequestFullscreen();
	}
	  else if (video.mozRequestFullscreen){
		video.mozRequestFullscreen();
	}
	  else if (video.msRequestFullscreen){
		video.msRequestFullscreen();
	}
};