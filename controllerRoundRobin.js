const express = require('express');
const request = require('request')
const router = express.Router();



//CIRCULAR QUEUE WITH PORT NUMBERS 
let ports = [8081, 8082, 8084, 8085]
let i = 0;


router.get('/', (req, res) => {


    // ROUND ROBIN
    if (i == 4) i = 0;
    request('http://localhost:' + ports[i++], function (error, response, body) {

        if (error) {
            request('http://localhost:8080', function (error, response, body) {
                res.json(body)
            });
        } else {
            res.json(response)
        }
    });



})







module.exports = router;