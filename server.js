const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist/marvel-catalog'));
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/marvel-catalog/index.html'));
});

app.listen(process.env.PORT || 8080);

console.log('Application started on ' + (process.env.PORT || 8080) + ' port');