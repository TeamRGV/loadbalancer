const port = 8081;
const pid = process.pid;
const express = require('express');





// for using http server instead of express server


var app = express();

app.get('/', (req, res) => {
    for (let i = 0; i < 1e8; i++) {

    }
    setTimeout(function () {
        res.json('Response from server 1');
    }, 3000);

})

let server = require('http').createServer(app);
server.listen(port, () => {
    console.log(`Child Started process ${process.pm_id}`);
});

// process.on('message', msg => {
//     console.log(`Message from master: ${msg}`);
// });
// //attach express view engine
// // app.set('view engine', 'ejs');



