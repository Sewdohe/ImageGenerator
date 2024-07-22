exports.getHtml = function (user, img) {

  var css = `
    html: {
      background: transparent !important;
    }
    body {
      background: transparent !important;
    }
    .card {
      width: 330px;
      height: 80px;
      border-radius: 8px;
      box-sizing: border-box;
      padding: 10px 15px 10px 10px;
      background-color: #181825;
      box-shadow: rgba(0, 0, 0, 0.2) 0px 6px 10px;
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: space-around;
      gap: 15px;
    }
    .wave {
      position: absolute;
      width: 6px;
      height: 130%;
      clip: auto;
      left: 0px;
      background: #f38ba8;
    }
    .icon-container {
      width: 35px;
      height: 35px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      margin-left: 8px;
    }
    .icon {
      width: 32px;
      height: 32px;
      color: #269b24;
    }
    .message-text-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      flex-grow: 1;
    }
    .message-text,
    .sub-text {
      margin: 0;
      cursor: default;
    }
    .message-text {
      color: #f2cdcd;
      font-size: 17px;
      font-weight: 700;
    }
    .sub-text {
      font-size: 14px;
      color: #cdd6f4;
    }
    .welcome-text {
      font-size: 16px;
      font-weight: bold;
      margin: 0px;
      padding: 0px;
      color: #cdd6f4;
    }
    .cross-icon {
      width: 18px;
      height: 18px;
      color: #555;
      cursor: pointer;
    }
  `

  return `
  <!doctype html>
  <html lang="en">
    <body>
      <div class="card" id="card">
        <div class="wave"></div>
        <div class="icon-container">
          <img class="icon" src=${img} />
        </div>
        <div class="message-text-container">
          <p class="message-text">${user} left the server</p>
          <p class="welcome-text">Goodbye!</p>
        </div>
    </body>
    <style>${css}</style>
  </html>`
};

