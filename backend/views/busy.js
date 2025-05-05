

const busyHTML = `
<!DOCTYPE html>
<html>
  <head>
    <title>Server Busy</title>
    <style>
      body {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
        font-family: sans-serif;
      }
      h1 {
        color: red;
      }
    </style>
  </head>
  <body>
    <h1>Sorry, the server is busy initializing daily reports.</h1>
  </body>
</html>
`;

module.exports = busyHTML;
