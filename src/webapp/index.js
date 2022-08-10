function init() {
  var protData = {
    'com.widevine.alpha': {
      serverURL: 'https://drm-widevine-licensing.axtest.net/AcquireLicense',
      httpRequestHeaders: {
        'X-AxDRM-Message':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjoxLCJjb21fa2V5X2lkIjoiYjMzNjRlYjUtNTFmNi00YWUzLThjOTgtMzNjZWQ1ZTMxYzc4IiwibWVzc2FnZSI6eyJ0eXBlIjoiZW50aXRsZW1lbnRfbWVzc2FnZSIsImZpcnN0X3BsYXlfZXhwaXJhdGlvbiI6NjAsInBsYXlyZWFkeSI6eyJyZWFsX3RpbWVfZXhwaXJhdGlvbiI6dHJ1ZX0sImtleXMiOlt7ImlkIjoiOWViNDA1MGQtZTQ0Yi00ODAyLTkzMmUtMjdkNzUwODNlMjY2IiwiZW5jcnlwdGVkX2tleSI6ImxLM09qSExZVzI0Y3Iya3RSNzRmbnc9PSJ9XX19.FAbIiPxX8BHi9RwfzD7Yn-wugU19ghrkBFKsaCPrZmU',
      },
      priority: 0,
    },
  };
  var video,
    player,
    url = 'https://media.axprod.net/TestVectors/v7-MultiDRM-SingleKey/Manifest_1080p.mpd';

  video = document.querySelector('video');
  player = dashjs.MediaPlayer().create();
  player.initialize(video, url, true);
  player.setProtectionData(protData);
}

function check() {
  if (location.protocol === 'http:' && location.hostname !== 'localhost') {
    var out =
      'This page has been loaded under http. This might result in the EME APIs not being available to the player and any DRM-protected content will fail to play. ' +
      "If you wish to test manifest URLs that require EME support, then <a href='https:" +
      window.location.href.substring(window.location.protocol.length) +
      "'>reload this page under https</a>.";
    var div = document.getElementById('http-warning');
    div.innerHTML = out;
    div.style.display = '';
  }
}

document.addEventListener('DOMContentLoaded', function () {
  check();
  init();
});
