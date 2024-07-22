exports.getHtml = function (title, description, img) {

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
      padding: 10px 15px;
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
      transform: rotate(90deg);
      left: -31px;
      top: 32px;
      width: 80px;
      fill: #04e4003a;
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
      color: #cba6f7;
      font-size: 17px;
      font-weight: 700;
    }
    .sub-text {
      font-size: 14px;
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
        <div class="icon-container">
          <img class="icon" src=${img} />
        </div>
        <div class="message-text-container">
          <p class="message-text">${title}</p>
          <p class="sub-text">${description}</p>
        </div>
    </body>
    <style>${css}</style>
  </html>`
};

