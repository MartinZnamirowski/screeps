var logger = require('logger');

var creepHelpers = {
    getHarvestingPower: function(creep) {
        if(creep.memory.role=='harvester') {
            var workModules = 0
            for (var i = 0, len = creep.body.length; i < len; i++) {
                creepModule = creep.body[i]
                if(creepModule == WORK){
                    workModules++
                }
            }
            return workModules
        } else {
            return 0
        }
    },
};

module.exports = creepHelpers;