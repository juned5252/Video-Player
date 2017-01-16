window.addEventListener('load',function() {

	video = document.getElementById('video');

	playButton = document.getElementById('play-button');
    
    video.load();
    video.addEventListener('canplay',function(){
    	playButton.addEventListener('click',PlayOrPause,false);
    }, false);
	
}, false);

function PlayOrPause(){
	if (video.paused) {
		video.play();
		playButton.src = "Assets/pause.png";
	} else {
		video.pause();
		playButton.src = "Assets/play.png";
	}
}