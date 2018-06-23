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
        logger.log(Game.cpu.bucket, 5)
        logger.log(Game.cpu.shardLimits, 5)
        return {
            10: Game.cpu.bucket >= 10000 || Game.cpu.bucket < 1000,
            20: Game.cpu.bucket >= 9000,
            30: Game.cpu.bucket >= 8000,
            40: Game.cpu.bucket >= 7000,
            100: Game.cpu.bucket >= 1000,
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

};

module.exports = tickManager;