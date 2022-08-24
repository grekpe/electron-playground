const drmConfig = {
  licenceAcquisitionUrl:
    'https://ovp.stable-int.skyshowtime.com/drm/widevine/acquirelicense?bt=73571-kywoaU86K012mQDW_anvvHPMfBGT2ADNdFSG4MgN5JbIcTJettsSlQslcNUYOPnMbRm7cSHc58N8K0rY_jC3DEcJeDrsFigSfFN2tSaCLbQLrqaiAV_HNFTdIuZFdavJsbMJOq7-CXgKDsfP-j_uzNtEvmPbyrq3zCzJ5GhTI9dPg0cVG8l1ZwO7mnIserdXQLUOpMAyabSh2_Qp1-PsRsMK-7AZYGOaaMS1jGlYHPoXs2sbPeLm1aWzdBufyQ0C6hafnOCGsd0kkXQhT_-EJVS7Sz-OWMJXHlFmSB15A6h-2GK6zQ==',
};

function init() {
  const videoElement = document.querySelector('video');
  const player = new RxPlayer({ videoElement });

  player.loadVideo({
    url: 'https://g001-vod-eu-cmaf-stg-lu.scdn01.cssott.com/SST/2j/GMO_00000000001874_01/SST_1643059028584-EjZkW_01/mpeg_cenc/master_manifest_r0.mpd',
    transport: 'dash',
    autoPlay: true,
    keySystems: [
      {
        type: 'com.widevine.alpha',
        getLicense: challenge => {
          console.log(challenge);
          return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', drmConfig.licenceAcquisitionUrl, true);
            xhr.onerror = err => {
              reject(err);
            };
            xhr.onload = evt => {
              if (xhr.status >= 200 && xhr.status < 300) {
                const license = evt.target.response;
                resolve(license);
              } else {
                const error = new Error("getLicense's request finished with a " + `${xhr.status} HTTP error`);
                reject(error);
              }
            };
            xhr.responseType = 'arraybuffer';
            xhr.send(challenge);
          });
        },
      },
    ],
  });
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
