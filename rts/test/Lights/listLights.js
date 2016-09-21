'use strict'
const Hue = require('../../core/connector/hue.js');


let hueConnector = new Hue();
hueConnector.lights().get((data) => {
    console.log(data);
});