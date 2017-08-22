var svc = {};

svc.createHotspot = function(cfg) {
  $(".hotspot-container").append(
    '<div class="hotspot" id="hotspot_' +
      cfg.id +
      '" style="top:' +
      cfg.top +
      "%;right:" +
      cfg.right +
      '%"><img src="i/hotspot.gif"></div>'
  );

  $("#hotspot_" + cfg.id).on("click", function() {
    $(cfg.contentTarget).html(cfg.content);
  });
};

svc.createHotspots = function(arr) {
  for (var i = 0; i < arr.length; i++) {
    svc.createHotspot(arr[i]);
  }
};

svc.clearHotspots = function() {
  $(".hotspot-container").html("");
};

module.exports = svc;
