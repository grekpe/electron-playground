const { app, components, BrowserWindow } = require('electron');

function createWindow() {
  const mainWindow = new BrowserWindow();

  // mainWindow.webContents.session.webRequest.onBeforeSendHeaders((details, callback) => {
  //   callback({ requestHeaders: { Origin: '*', ...details.requestHeaders } });
  // });

  // mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
  //   callback({
  //     responseHeaders: {
  //       'Access-Control-Allow-Origin': ['*'],
  //       // We use this to bypass headers
  //       'Access-Control-Allow-Headers': ['*'],
  //       ...details.responseHeaders,
  //     },
  //   });
  // });

  //   {
  //   webPreferences: {
  //     webSecurity: false,
  //   },
  // }
  // mainWindow.loadURL('https://bitmovin.com/demos/drm');
  // mainWindow.loadURL('https://reference.dashif.org/dash.js/latest/samples/drm/widevine.html');
  mainWindow.loadURL('http://localhost:3000');
}

// // 'http://localhost:56520',
// // 'https://bitmovin.com/demos/drm',
// // 'https://reference.dashif.org/dash.js/latest/samples/drm/widevine.html',
// 'https://shaka-player-demo.appspot.com/demo/#audiolang=pl-PL;textlang=pl-PL;uilang=pl-PL;panel=HOME;build=uncompiled',

app.whenReady().then(async () => {
  await components.whenReady();
  console.log('components ready:', components.status());
  createWindow();
});
