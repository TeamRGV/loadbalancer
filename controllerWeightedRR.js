const express = require('express');
const request = require('request')

const router = express.Router();



class Queue {

    constructor() {
        this.items = [];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    dequeue() {
        if (this.isEmpty()) {
            return null
        }
        return this.items.shift();
    }

    enqueue(element) {
        this.items.push(element);
    }

    size() {
        return this.items.length;
    }

    front() {
        if (this.isEmpty())
            return null;
        return this.items[0];
    }
}



let weightedQueue = new Queue();
weightedQueue.enqueue({ server: 8081, weight: 2 })
weightedQueue.enqueue({ server: 8082, weight: 4 })
weightedQueue.enqueue({ server: 8084, weight: 6 })
weightedQueue.enqueue({ server: 8085, weight: 10 })

let curr = weightedQueue.front();
let counter = curr.weight;




router.get('/', (req, res) => {


    // weighted round robin
    if (counter <= 0) {
        weightedQueue.enqueue(weightedQueue.dequeue())
        curr = weightedQueue.front();
        counter = curr.weight;
        request('http://localhost:' + curr.server, function (error, response, body) {
            if (error) {
                counter = 0
                request('http://localhost:8080', function (error, response, body) {
                    res.json(body)
                });
            } else {
                res.json(response)
            }
        });
    } else {
        request('http://localhost:' + curr.server, function (error, response, body) {
            if (error) {
                counter = 0;
                request('http://localhost:8080', function (error, response, body) {
                    res.json(body)
                });
            } else {
                res.json(response)
            }
        });
        counter--;
    }





})







module.exports = router;