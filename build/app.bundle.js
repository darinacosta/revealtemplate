webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(3);

("use strict");


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var $ = __webpack_require__(0);
var Parallax = __webpack_require__(1);

/*
  Description: On each slide change, _checkSlidesForVideo iterates through the videoSlideIndex array
    to determine if the current slide contains a video. If so, the video number associated with the slide
    number is passed to the _enableVideo function, which adds custom video controls to the slide and
    moves the presentation to the next slide on video end.
*/

var videos;
var videoSlideIndex = [{ slide: 1, video: 0 }];

function videoControlInit() {
  videos = $("video");

  function _enableVideo(videoNumber) {
    var isLoop = $(Reveal.getCurrentSlide()).attr("data-background-video-loop");
    console.log("is loop", isLoop);
    if (isLoop) {
      return;
    }
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
    console.log(slideNumber);
    for (var i = 0; i < videoSlideIndex.length; i++) {
      if (videoSlideIndex[i]["slide"] === slideNumber) {
        _enableVideo(videoSlideIndex[i].video);
      }
    }
  }

  Reveal.addEventListener("slidechanged", _checkSlidesForVideo);
}

function init() {
  Reveal.initialize({
    controls: true,
    progress: true,
    history: true,
    center: true,

    transition: "slide", // none/fade/slide/convex/concave/zoom

    // Optional reveal.js plugins
    dependencies: [
      {
        src: "lib/js/classList.js",
        condition: function() {
          return !document.body.classList;
        }
      },
      {
        src: "plugin/markdown/marked.js",
        condition: function() {
          return !!document.querySelector("[data-markdown]");
        }
      },
      {
        src: "plugin/markdown/markdown.js",
        condition: function() {
          return !!document.querySelector("[data-markdown]");
        }
      },
      {
        src: "plugin/highlight/highlight.js",
        async: true,
        callback: function() {
          hljs.initHighlightingOnLoad();
        }
      },
      { src: "plugin/zoom-js/zoom.js", async: true },
      { src: "plugin/notes/notes.js", async: true }
    ]
  });
  console.log("hi");
}

$(document).ready(function() {
  init();
  videoControlInit();
});

module.export = {};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)(module)))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ })
],[2]);