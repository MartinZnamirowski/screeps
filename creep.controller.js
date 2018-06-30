var logger = require('logger');
var helpers = require('helpers');
var runHarvester = require('run.harvester');
// 40 - Execute Room Strategy

// Room Strategies:
// 0 - Default

var creepController = {
    runCreeps: function() {
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(creep.memory.role == 'harvester') {
                runHarvester.run(creep)
            }
        }
    },
};

module.exports = creepController;