/**
 * LightgroupController
 *
 * @description :: Server-side logic for managing lightgroups
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

'use strict'
const Events = require('../../core/systems/ms_emitter.js');
const StandaloneEntitySystem = require('../../core/systems/ms_entity_systems.js');
const HueGroup = require('../../core/entities/objects/hueGroup');


//this is built out of a Factory which read a JSON files base
let bedroom = new HueGroup('Bedroom');
StandaloneEntitySystem.push(bedroom);


module.exports = {
	turn: function(req, res) {
        console.log(req);
        var groupId = parseInt(req.params['id']);
        var on = req.params['on'] === 'true';
        console.log(on);
        if((typeof groupId !== 'number') || (typeof on !== 'boolean') || groupId < 1) { throw new Error('Invalid path param in called url.')}; 
        bedroom.instanciate(groupId).then(() => {
            Events.emit('group-turn', {id: bedroom.specialId, on: on});
            return res.send('200. done');
        });
    }
};

