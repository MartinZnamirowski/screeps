var logger = require('logger');

var creepHelpers = {
    getHarvestingPower: function(creep) {
        if(creep.memory.role=='harvester') {
            logger.log("LALA", 5)
            var workModules = 0
            for (var i = 0, len = creep.body.length; i < len; i++) {
                const creepModule = creep.body[i]
                logger.log("MODULE: " +  creepModule, 5)
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