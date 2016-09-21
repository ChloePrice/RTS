'use strict'
const Events = require('../../core/systems/ms_emitter.js');
const StandaloneEntitySystem = require('../../core/systems/ms_entity_systems.js');
const HueLight = require('../../core/entities/objects/hueLight');


//this is built out of a Factory which read a JSON files base
let nomad = new HueLight('nomad');
StandaloneEntitySystem.push(nomad);

nomad.instanciate(7).then(() => {
    Events.emit('light-turn', {id: nomad.specialId, on: false});
});
