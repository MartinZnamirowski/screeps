var logger = require('logger');
// ExecutionArray
// 10 - ReEvaluate Tick Strategy
// 20 - ReEvaluate Global Strategy
// 30 - Execute Global Strategy
// 40 - Execute Room Strategy
// 100 - Control Creeps


// Tick modes:
// 0 - Default

const tickAlgorithms = {
    getDefaultTicks: function() {
        var bucket = 0
        if(Game.cpu.bucket == undefined) {
            bucket = 10000
        } else {
            bucket = 10000
        }
        return {
            10: bucket >= 10000 || bucket < 1000,
            20: bucket >= 9000,
            30: bucket >= 8000,
            40: bucket >= 7000,
            100: bucket >= 1000,
        }

    }
}



var tickManager = {
    getDistribution: function() {
        switch(Memory.globals.tickMode) {
            case 0: 
                return tickAlgorithms.getDefaultTicks()
            default:
                return tickAlgorithms.getDefaultTicks()
        }
    },

    reEvaluateTickStrategy: function() {
        if(Game.time > Memory.cooldowns[10] + 100) {
            logger.log(Memory.cooldowns[10], 20)
            logger.log(Memory.cooldowns[10]+100, 20)
            Memory.cooldowns[10] = Game.time
            logger.log("Re-evaluating Tick strategy!", 20)
 
            logger.log("Tick Strategy set to default mode: 0", 20)
            Memory.globals.tickMode = 0
        }
    }
};

module.exports = tickManager;