var logger = require('logger');
// ExecutionArray
// 10 - ReEvaluate Tick Strategy
// 20 - ReEvaluate Global Strategy
// 30 - Execute Global Strategy
// 40 - Execute Room Strategy
// 50 - 


// Tick modes:
// 0 - Default

const tickAlgorithms = {
    getDefaultTicks: function() {
        logger.log(Game.cpu.limit)
        logger.log(Game.cpu.tickLimit)
        logger.log(Game.cpu.bucket)
        logger.log(Game.cpu.shardLimits)
        
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