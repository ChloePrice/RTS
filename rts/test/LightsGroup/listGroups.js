'use strict'
const Hue = require('../../core/connector/hue.js');


let hueConnector = new Hue();
hueConnector.groups().get((data) => {
    console.log(data);
});