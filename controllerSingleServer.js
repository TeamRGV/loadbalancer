const express = require('express');
const request = require('request')

const router = express.Router();


router.get('/', (req, res) => {

    request('http://localhost:8081', function (error, response, body) {
        res.json(response)
    });


})


module.exports = router;