var runHarvester = require('run.harvester');

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