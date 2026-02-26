/* Global helpers */
function $(id) { return document.getElementById(id); }
function val(id) { return parseFloat($(id).value) || 0; }
function eur(n) { return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }

/* Tab switching */
function initTabs() {
  var btns = document.querySelectorAll('.tab-btn');
  btns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      btns.forEach(function (b) { b.classList.remove('active'); });
      document.querySelectorAll('.tab-pane').forEach(function (p) { p.classList.remove('active'); });

      btn.classList.add('active');
      var pane = $(btn.dataset.tab);
      pane.classList.add('active');

      // Fix Leaflet tile rendering after display:none
      if (btn.dataset.tab === 'tab-placement' && window.placementMap) {
        setTimeout(function () { window.placementMap.invalidateSize(); }, 50);
      }
    });
  });
}

/* Bidirectional camera count sync between tabs */
function initCameraSync() {
  var costInput = $('activeCameras');
  var placementInput = $('placementCameras');

  var syncing = false;

  costInput.addEventListener('input', function () {
    if (syncing) return;
    syncing = true;
    placementInput.value = costInput.value;
    placementInput.dispatchEvent(new Event('input', { bubbles: true }));
    syncing = false;
  });

  placementInput.addEventListener('input', function () {
    if (syncing) return;
    syncing = true;
    costInput.value = placementInput.value;
    costInput.dispatchEvent(new Event('input', { bubbles: true }));
    syncing = false;
  });
}

document.addEventListener('DOMContentLoaded', function () {
  initTabs();
  initCameraSync();
});
