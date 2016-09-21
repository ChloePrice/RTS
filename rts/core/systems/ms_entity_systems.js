const EventSystem = require('./ms_emitter.js');
const async = require('async');
const defaultSystem = require('../entities/templates/standalone_system.json');
const UUID = require('node-uuid');
const fs = require('fs');
let savedEntities = require('../entities/saved/entities.json');

if(!savedEntities){
    savedEntities = []; 
}

(function(){
    'use strict'
    let _systems = [];

    let StandaloneSystems = {
        push: function(entityDefinition) {
            var entity = Object.assign({}, defaultSystem);
            entity.definition = entityDefinition;
            _systems.push(this.validate(entity));
            savedEntities.push({id: entity.id, type: entity.definition.type, definitionId: entity.definition.specialId});
            let jsonString = JSON.stringify(savedEntities);
            fs.writeFile(__dirname + '/../entities/saved/entities.json', jsonString, {encoding: 'utf8', flag: 'w'}, null);
            return this;
        },
        pop : function() {
            return _systems.pop();
        },
        validate : function validate(sys){
        	let msg = '';
            msg += (!sys.definition.updateStatus) ? 'The system is invalid : no update status method' : '' ;
            msg += (!sys.definition.specialId || sys.definition.specialId < 0) ? 'The system is invalid : no id in definition' : '' ;
            if(msg !== ''){
                throw new Error(msg);
            }                
            sys.id = this.generateId();
            sys.name = sys.definition.name || sys.name;
            sys.definition.reference = sys;
            sys.createdOn = new Date();
            sys.initOn = new Date();
            return sys;
        },
        list: function(){
            return _systems.map(function(s){return {
                id: s.id,
                name: s.name,
                status: s.status,
                definitionType: s.definition.type,
                initOn: s.initOn,
                createdOn: s.createdOn
            }});
        },
        generateId : function(){
            return UUID.v4();
        },
        initSystem : function(){
            savedEntities.forEach((e)=> console.log(e));
        }
    }

    EventSystem.on('alive', function () {
        async.forEach(_systems, function(item, cb){
            item.definition.updateStatus();
            cb();
        }, function(err){
            if(err) throw err;
        });
    });

    module.exports = StandaloneSystems;
})();


