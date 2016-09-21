'use strict'

const EventEmitter = require('events');

class MsEmitter extends EventEmitter{
    emit(){
        super.emit(...arguments);
    }
    on(){
        super.on(...arguments);
    }
}

module.exports = new MsEmitter();