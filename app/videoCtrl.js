//var $ = require("jquery");
var Parallax = require("parallax-js");
var Modernizr = require("modernizr");
var configSvc = require("./configSvc.js");

/*
  Description: On each slide change, _checkSlidesForVideo iterates through the videoSlideIndex array
    to determine if the current slide contains a video. If so, the video number associated with the slide
    number is passed to the _enableVideo function, which adds custom video controls to the slide and
    moves the presentation to the next slide on video end.
*/

var videos;
var svc = {};

var videoSlideIndex = [
  {
    slide: 1,
    video: 1,
    type: "animation",
    id: "pipelines"
  }
  // {
  //   slide: 2,
  //   video: 1,
  //   type: "server",
  //   id: ""
  // }
];

svc.vimeoPlaceholders = {
  vimeo_1: {
    backgroundImage: "flaring_1.jpg",
    video: "//player.vimeo.com/video/122496816"
  }
};

function _enableVideo(videoNumber) {
  var isLoop = $(Reveal.getCurrentSlide()).attr("data-background-video-loop");
  if (isLoop) {
    return;
  }

  Reveal.getCurrentSlide().innerHTML =
    '<div class="video-control-panel"><div id="video-controls"><button type="button" id="play-pause">Pause</button><input type="range" id="volume-bar" min="0" max="1" step="0.1" value="1"></div></div>';

  videos.on("ended", function() {
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

svc.getVimeoIframeHtml = function(id) {
  return (
    '<iframe width="100%" height="100%" src="' +
    svc.vimeoPlaceholders[id].video +
    '" frameborder="0" allowfullscreen></iframe>'
  );
};

svc.playVimeoIframe = function(vimeoId) {
  var iframe = document.querySelector("#" + vimeoId + " iframe");
  var player = new Vimeo.Player(iframe);
  player.play();
  player.on("play", function() {
    console.log("played the video!");
  });
};

svc.currentSlideHasVimeoVideo = function() {
  var vimeoId = $("section.present").find("[id^=vimeo_]").attr("id");
  if (!vimeoId) {
    return false;
  }
  return true;
};

svc.handleVimeoSlide = function() {
  var vimeoId = $("section.present").find("[id^=vimeo_]").attr("id");
  if (!vimeoId) {
    return false;
  }
  $(".backgrounds").css("background-color", "black");
  var hasIframe = $("section.present:has('iframe')").length > 0;
  if (vimeoId && !hasIframe) {
    $("#" + vimeoId).html(svc.getVimeoIframeHtml(vimeoId));
  }
  svc.playVimeoIframe(vimeoId);
};

svc.checkSlidesForVideo = function(e) {
  videos = $("video");
  var slideNumber = e.indexh;
  for (var i = 0; i < videoSlideIndex.length; i++) {
    var videoIndex = videoSlideIndex[i].video;
    if (
      videoSlideIndex[i]["slide"] === slideNumber &&
      videoSlideIndex[i]["type"] === "server"
    ) {
      _enableVideo(videoIndex);
    }
  }
};

svc.handleEmbedPlayButtonClick = function(id) {
  var target = ".video-embed-" + id;
  $(".backgrounds").css(
    "background-color",
    configSvc.appConfig.style.backgroundColor.vimeo
  );
  $(".present .video-text-holder").css("display", "none");
  $(target).fadeOut(1000, function() {
    $(target).css("background-image", "none");
    $(target).fadeIn(1000, function() {
      svc.handleVimeoSlide();
    });
  });
};

$(".play").on("click", function(e) {
  var id = event.target.id.split("play-")[1];
  svc.handleEmbedPlayButtonClick(id);
});

module.exports = svc;
