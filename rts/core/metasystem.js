'use strict'

const EventSystem = require('./systems/ms_events.js');
const StandaloneSystems = require('./systems/ms_entity_systems.js');


module.exports = {
    events: EventSystem,
    components: StandaloneSystems
}
