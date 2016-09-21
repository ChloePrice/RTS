'use strict'

const HUEOrder = require('../../connector/hue.js');
const hueLightEntity = require('../templates/hueLight.json');
const StandaloneSystemEntity = require('../StandaloneSystemEntity.js');
const _ = require('lodash');

class HueLight extends StandaloneSystemEntity{
    constructor(name, id){
        super(name, id);
        if(id) this.instanciate(id);
        this.type = "HueLight";
        this.componentInfo = hueLightEntity;
        this.handleEvents();
    }

    instanciate(hueId){
        let currentObject = this;
        this.specialId = hueId;
        return new Promise(function(resolve, reject) {
            currentObject.update(()=> resolve(currentObject));
        });
    }
    update(cb){
        new HUEOrder().light(this.specialId).get((data) => {
            this.componentInfo = _.assign(hueLightEntity, data);
            if(cb) cb(data);
        });
        return this;
    }
    set(settings){
        let currentObject = this;
        return new Promise(function(resolve, reject){
            new HUEOrder().light(currentObject.specialId).action('state').put({data: settings}, function (result){
                console.log(result);
                currentObject.update(() => resolve(currentObject, result));
            });
        });
    }
    turn(on){
        let currentObject = this;     
        this.componentInfo.state.on = on;   
        return new Promise(function(resolve, reject){
            new HUEOrder().light(currentObject.specialId).action('state').put({data: {on: on}}, function(result){
                console.log(result);
                currentObject.update(() => resolve(currentObject, result));
            });
        });
    }
    isReachable(){
        let currentObject = this;       
        return new Promise(function(resolve, reject){
            new HUEOrder().light(currentObject.specialId).get({}, function(result){
                let reachable = JSON.parse(result).state.reachable;
                currentObject.update(() => resolve(currentObject, reachable));
            });
        });
    }
    //override;
    run(intenseMod, params){
        update();
    }
    //override
    handleEvents(){
        this.eventsHandler.on('light-turn', ({id, on, callback}) => {
            if(this.specialId != id) return;
            this.turn(on);
            if(callback) callback();
        });
        this.eventsHandler.on('light-set', ({id, settings, callback}) => {
            if(this.specialId != id) return;
            this.set(settings);
            if(callback) callback();
        });
    }
   
}

module.exports = HueLight;