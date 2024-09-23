const express = require('express');
const {CONFIG} = require ('./config');
const app = express();
const PORT = CONFIG.PROD_PORT;
app.use(express.static(__dirname + '/build'));
const path = require('path');
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});
app.listen(PORT);
console.log('production build is available at ', PORT);
