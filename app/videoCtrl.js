var $ = require("jquery");
var Parallax = require("parallax-js");

/*
  Description: On each slide change, _checkSlidesForVideo iterates through the videoSlideIndex array
    to determine if the current slide contains a video. If so, the video number associated with the slide
    number is passed to the _enableVideo function, which adds custom video controls to the slide and
    moves the presentation to the next slide on video end.
*/

var videos;
var videoSlideIndex = [{ slide: 1, video: 0 }, { slide: 2, video: 1 }];
var svc = {};

svc.videoControlInit = function() {
  videos = $("video");

  function _enableVideo(videoNumber) {
    var isLoop = $(Reveal.getCurrentSlide()).attr("data-background-video-loop");
    console.log("is loop", isLoop);
    if (isLoop) {
      return;
    }

    console.log("init video", videoNumber);
    Reveal.getCurrentSlide().innerHTML =
      '<div class="video-control-panel"><div id="video-controls"><button type="button" id="play-pause">Pause</button><input type="range" id="volume-bar" min="0" max="1" step="0.1" value="1"></div></div>';

    videos.on("ended", function() {
      console.log("End video " + videoNumber);
      Reveal.next();
    });

    var targetVideo = videos[videoNumber];
    var playButton = document.getElementById("play-pause");
    var volumeBar = document.getElementById("volume-bar");

    volumeBar.addEventListener("change", function() {
      targetVideo.volume = volumeBar.value;
    });

    // Event listener for play/pause button
    playButton.addEventListener("click", function() {
      if (targetVideo.paused == true) {
        targetVideo.play();
        playButton.innerHTML = "Pause";
      } else {
        targetVideo.pause();
        playButton.innerHTML = "Play";
      }
    });
  }

  function _checkSlidesForVideo(e) {
    var slideNumber = e.indexh;
    for (var i = 0; i < videoSlideIndex.length; i++) {
      if (videoSlideIndex[i]["slide"] === slideNumber) {
        console.log("SLIDE ", videoSlideIndex[i]["slide"]);
        _enableVideo(videoSlideIndex[i].video);
      }
    }
  }

  Reveal.addEventListener("slidechanged", _checkSlidesForVideo);
};

module.exports = svc;
