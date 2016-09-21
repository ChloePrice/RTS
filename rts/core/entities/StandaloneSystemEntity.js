'use strict'
const eventSystem = require('../systems/ms_emitter.js');

class StandaloneSystemEntity {
    constructor(id, name){
        this.specialId = id
        this.name = name;
        this.type = "undefined";
        this.eventsHandler = eventSystem;     
    }
    updateStatus(){
        this.reference.status = 200;
    }

    //peridic method called by system;
    run(intenseMod, params){
    
    }
    //make the entity able to self-react when an event occurs.
    handleEvents(){

    }
}
module.exports = StandaloneSystemEntity