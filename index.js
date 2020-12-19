// https://webdeasy.de/das-ultimative-node-js-einsteiger-tutorial/#create-project

const express = require('express');
const app = express();
var fileSystem = require('fs');
const http = require("http");
const cors = require('cors');
const path = require('path');

app.use(cors());
app.use(express.static(__dirname + '/'));

app.get('/data', (request, response) => {
  response.send('Our first Node.js webserver');
});


app.get('/ta', (request, response) => {
  http.get("http://admin:admin@192.168.0.240/INCLUDE/api.cgi?jsonnode=1&jsonparam=I,O", res => {
    let data = "";
    res.on("data", d => {

      data += d
    })
    res.on("end", () => {
      response.send(JSON.parse(data));
    })
  })


});

app.get('/demo', (request, response) => {
  fileSystem.readFile('data/cmi.json', (err, data) => {
    if (err) throw err;
    let item = JSON.parse(data);
    response.send(item);
  });


});


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

// app.get('/', (request, response) => {
//   fileSystem.readFile('./index.html', function (error, fileContent) {
//     if (error) {
//       response.writeHead(500, { 'Content-Type': 'text/plain' });
//       response.end('Error');
//     }
//     else {
//       response.writeHead(200, { 'Content-Type': 'text/html' });
//       response.write(fileContent);
//       response.end();
//     }
//   });
// });

app.get('/data', (request, response) => {
  response.send('Our first Node.js webserver');
});

app.get('/:yourName', (req, res) => {
  res.send('Your name: ' + req.params.yourName);
});

app.listen(8080, () => console.log('Server running on port localhost:8080'));
