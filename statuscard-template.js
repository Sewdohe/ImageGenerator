exports.getHtml = function(serverData, host, icon) {

  var css = `
    html: {
      background: transparent !important;
      font-family: 'DM Serif Display', serif;
    }
    body {
      background: transparent !important;
      color: #cdd6f4;
    }
    img {
      image-rendering: pixelated;
    }
    .card {
      border-radius: 8px;
      box-sizing: border-box;
      background-color: #181825;
      box-shadow: rgba(0, 0, 0, 0.2) 0px 6px 10px;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      gap: 15px;
    }
    .header-container {
      display: flex;
      align-items: center;
      margin-top: 16px;
    }
    .host {
      font-size: 32px;
    }
    .icon {
      width: 50px;
      height: 50px;
      margin-left: 8px;
    }
    .avatar {
      width: 24px;
      height: 24px;
      margin: 0px 8px 0px 32px;
    }
    ul {
      width: 100%;
      list-style: none;
      margin: 0px 0px 0px 0px;
      padding: 0px;
    }
    .player-container {
      display: flex;
      padding: 16px;
      align-items: center;
      justify-content: flex-start;
      font-size: 24px;
      font-family: "Press Start 2P", system-ui !important;
    }
    .player-container:nth-child(even) {
      background: #313244;
    }
  `
  var playersWComma = serverData.map(player => {
    return `
        <li class="player-container"><img class="avatar" src=${player.avatar} />${player.name_raw}</li>
      `
  })
  // using the join command on the array avoids any extra commas!!! :D
  var players = playersWComma.join("");

  return `
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Bootstrap demo</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    </head>
    <body>
      <div class="card" id="card">
        <div class="header-container">
          <h1 class="host">${host}</h1>
          <img class="icon" src=${icon} />
        </div>
        <ul>
          ${players}
        </ul>
      </div>
    </body>
    <style>${css}</style>
  </html>`
};

