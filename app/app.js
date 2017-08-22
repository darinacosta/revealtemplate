("use strict");

var videoCtrl = require("./videoCtrl.js");
var pipelineGallery = require("./pipelineGallery.js");
var configSvc = require("./configSvc.js");
var Modernizr = require("modernizr");

function init() {
  configSvc.setRevealConfig();
  pipelineGallery.switchVideo("etppath");

  Reveal.addEventListener("slidechanged", function(e) {
    if (videoCtrl.currentSlideHasVimeoVideo()) {
      $(".backgrounds").css(
        "background-color",
        configSvc.appConfig.style.backgroundColor.vimeo
      );
    } else {
      $(".backgrounds").css(
        "background-color",
        configSvc.appConfig.style.backgroundColor.default
      );
    }
    videoCtrl.checkSlidesForVideo(e);
    pipelineGallery.switchVideo("etppath");
  });

  Reveal.addEventListener(
    "video-embed",
    function() {
      // Reveal.configure({ width: 3000, height: 2000 });
    },
    false
  );
}

$(document).ready(function() {
  init();
});

module.export = {};
