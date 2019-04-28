const express = require('express');
const request = require('request')

const router = express.Router();





let mapOfRequests = new Map();
mapOfRequests[8081] = 0
mapOfRequests[8082] = 0
mapOfRequests[8084] = 0
mapOfRequests[8085] = 0
let servers = Object.keys(mapOfRequests);
let minReqServer = Object.keys(mapOfRequests)[0];
let minReq = mapOfRequests[minReqServer];

router.get('/', (req, res) => {


    for (let i = 0; i < servers.length; i++) {
        if (mapOfRequests[servers[i]] <= minReq) {
            minReq = mapOfRequests[servers[i]];
            minReqServer = servers[i];
        }
    }
    minReq = minReq + 1
    mapOfRequests[minReqServer] = minReq;
    console.log(mapOfRequests)
    request('http://localhost:' + minReqServer, function (error, response, body) {

        res.json(response)
    });


})







module.exports = router;