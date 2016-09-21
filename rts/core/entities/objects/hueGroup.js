'use strict'

const HUEOrder = require('../../connector/hue.js');
const hueGroupEntity = require('../templates/hueGroup.json');
const StandaloneSystemEntity = require('../StandaloneSystemEntity.js');
const _ = require('lodash');

class HueGroup extends StandaloneSystemEntity{
    constructor(name, id){
        super(name, id);
        if(id) this.instanciate(id);
        this.type = "HueGroup";
        this.componentInfo = hueGroupEntity;
        this.handleEvents();
    }

    instanciate(hueId){
        hueId = (hueId) ? hueId : this.specialId; 
        let currentObject = this;
        this.specialId = hueId;
        return new Promise(function(resolve, reject) {
            currentObject.update(()=> resolve(currentObject));
        });
    }
    update(cb){
        new HUEOrder().group(this.specialId).get((data) => {
            this.componentInfo = _.assign(hueGroupEntity, data);
            if(cb) cb(data);
        });
        return this;
    }
    set(settings){
        let currentObject = this;
        return new Promise(function(resolve, reject){
            new HUEOrder().group(currentObject.specialId).action('action').put({data: settings}, function (result){
                console.log(result);
                currentObject.update(() => resolve(currentObject, result));
            });
        });
    }
    turn(on){
        let currentObject = this;     
        this.componentInfo.state.on = on;   
        return new Promise(function(resolve, reject){
            new HUEOrder().group(currentObject.specialId).action('action').put({data: {on: on}}, function(result){
                console.log(result);
                currentObject.update(() => resolve(currentObject, result));
            });
        });
    }
    //override;
    run(intenseMod, params){
        update();
    }
    //override
    handleEvents(){
        this.eventsHandler.on('group-turn', ({id, on, callback}) => {
            console.log('ok');
            if(this.specialId != id) return;
            this.turn(on);
            if(callback) callback();
        });
        this.eventsHandler.on('group-set', ({id, settings, callback}) => {
            if(this.specialId != id) return;
            this.set(settings);
            if(callback) callback();
        });
    }
   
}

module.exports = HueGroup;