/* =========================================================
   Super Bug recurring pop-up advert
   ---------------------------------------------------------
   HOW TO USE:
   1. Upload this file into your /superbug/ folder
      (next to LIMITED_EDITION_.mp4)
   2. Add ONE line before </body> on your JetVerse page:
      <script src="/superbug/superbug-ad.js"></script>
   ---------------------------------------------------------
   CHANGE THE TIMING: edit the two numbers just below.
   ========================================================= */

(function () {
  // ===== settings you can change =====
  var FIRST_DELAY  = 60;   // seconds before the FIRST pop-up
  var REPEAT_EVERY = 180;  // seconds between pop-ups (180 = every 3 min)
  var VIDEO_SRC    = "/superbug/LIMITED_EDITION_.mp4";
  var CLICK_URL    = "https://coolgames6x.com/superbug/"; // where clicking the ad goes
  // ===================================

  // build the pop-up markup
  var overlay = document.createElement("div");
  overlay.id = "sb-overlay";
  overlay.style.cssText =
    "display:none;position:fixed;inset:0;z-index:99999;" +
    "background:rgba(0,0,0,.78);align-items:center;justify-content:center;" +
    "font-family:sans-serif;";

  overlay.innerHTML =
    '<div style="position:relative;width:90%;max-width:420px;background:#000;' +
      'border:6px solid #ffd000;border-radius:16px;overflow:hidden;' +
      'box-shadow:0 12px 40px rgba(0,0,0,.6);">' +
      '<div style="background:#d10000;color:#fff;font-weight:bold;text-align:center;' +
        'padding:6px;font-size:13px;letter-spacing:1px;">' +
        '\u2605 LIMITED EDITION SUPER BUG\u2122 \u2605</div>' +
      '<a href="' + CLICK_URL + '" style="display:block;">' +
        '<video id="sb-video" src="' + VIDEO_SRC + '" muted loop playsinline ' +
          'style="width:100%;display:block;cursor:pointer;"></video>' +
      '</a>' +
      '<button id="sb-close" style="position:absolute;top:8px;right:8px;border:none;' +
        'background:rgba(0,0,0,.65);color:#fff;width:30px;height:30px;border-radius:50%;' +
        'cursor:pointer;font-size:16px;line-height:1;">\u00d7</button>' +
      '<div style="text-align:center;font-size:10px;color:#888;padding:4px;">Advertisement</div>' +
    '</div>';

  function start() {
    document.body.appendChild(overlay);
    var video = document.getElementById("sb-video");

    function show() {
      overlay.style.display = "flex";
      try { video.currentTime = 0; video.play(); } catch (e) {}
    }
    function hide() {
      overlay.style.display = "none";
      try { video.pause(); } catch (e) {}
    }

    document.getElementById("sb-close").addEventListener("click", hide);
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) hide();
    });

    setTimeout(function () {
      show();
      setInterval(show, REPEAT_EVERY * 1000);
    }, FIRST_DELAY * 1000);
  }

  // wait until the page is ready before inserting
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
