'use strict'
const Events = require('../core/systems/ms_emitter.js');
const StandaloneEntitySystem = require('../core/systems/ms_entity_systems.js');
const HueGroup = require('../core/entities/objects/hueGroup');

let bedroom = new HueGroup('bedroom', 1);
StandaloneEntitySystem.push(bedroom);

StandaloneEntitySystem.initSystem();