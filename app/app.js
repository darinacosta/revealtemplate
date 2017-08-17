("use strict");

var videoCtrl = require("./videoCtrl.js");
var pipelineGallery = require("./pipelineGallery.js");
var configSvc = require("./configSvc.js");
var Modernizr = require("modernizr");

function init() {
  configSvc.setRevealConfig();
  videoCtrl.handleVimeoSlide();
  pipelineGallery.switchVideo("etppath");

  Reveal.addEventListener("slidechanged", function(e) {
    videoCtrl.checkSlidesForVideo(e);
    videoCtrl.handleVimeoSlide();
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
