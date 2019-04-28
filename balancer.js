
const port = 8080;
const pid = process.pid;
const express = require('express');
const argv = require('yargs').argv

const controllerRoundRobin = require('./controllerRoundRobin.js');
const controllerWeightedRR = require('./controllerWeightedRR.js');
const controllerLeastConnected = require('./controllerLeastConnected.js');
const controllerSingleServer = require('./controllerSingleServer.js');


var publicPath = __dirname + "/public";
// let queue = new Queue();
// for using http server instead of express server


var app = express();
app.use(express.static(publicPath));

if (argv.algo == 'RR') {
    app.use('', controllerRoundRobin);
} else if (argv.algo == 'WRR') {
    app.use('', controllerWeightedRR);
} else if (argv.algo == 'LC') {
    app.use('', controllerLeastConnected);
} else {
    app.use('', controllerSingleServer);
}


let server = require('http').createServer(app);
server.listen(port, () => {

    console.log(`Master Started process ${process.pid}`);
});

// process.on('message', msg => {
//     console.log(`Message from master: ${msg}`);
// });
// //attach express view engine
// // app.set('view engine', 'ejs');



