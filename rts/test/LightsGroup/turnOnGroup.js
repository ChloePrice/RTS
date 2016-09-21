'use strict'
const Events = require('../../core/systems/ms_emitter.js');
const StandaloneEntitySystem = require('../../core/systems/ms_entity_systems.js');
const HueGroup = require('../../core/entities/objects/hueGroup');


//this is built out of a Factory which read a JSON files base
let bedroom = new HueGroup('Bedroom');
StandaloneEntitySystem.push(bedroom);

bedroom.instanciate(1).then(() => {
    Events.emit('group-turn', {id: bedroom.specialId, on: true});
});
