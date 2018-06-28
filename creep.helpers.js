var logger = require('logger');

var creepHelpers = {
    getHarvestingPower: function(creep) {
        if(creep.memory.role=='harvester') {
            //logger.log("LALA", 5)
            var workModules = 0
            for (var i = 0, len = creep.body.length; i < len; i++) {
                const creepModule = creep.body[i]
                //logger.log("MODULE: " +  creepModule, 5)
                if(creepModule.type == WORK){
                    workModules++
                }
            }
            return workModules
        } else {
            return 0
        }
    },

    constructCreep: function(role, energyLimit) {
        var body = []
        var expendedEnergy = 0
        if(role=='harvester') {
            const pattern = [WORK, CARRY, CARRY, CARRY, MOVE]
            const cost = 300
            for(;expendedEnergy + cost <= energyLimit; expendedEnergy+=cost){
                body.concat(pattern)
            }
        }
        return body
    }
};

module.exports = creepHelpers;