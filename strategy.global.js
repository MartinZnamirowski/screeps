var logger = require('logger');
// 20 - ReEvaluate Global Strategy
// 30 - Execute Global Strategy

// Global Strategies:
// 0 - Default

const strategies = {
    executeDefault: function() {
        logger.log("Executing Default strategy.", 20)
        for(room in Game.rooms) {
            logger.log("Setting Room Strategy of room " + str(room) + " to 0.", 20)
            if (Memory.roomStrategies == undefined) {
                Memory.roomStrategies = {}
            }
            Memory.roomStrategies(room) = 0
        }
    }
}

var tickManager = {
    executeStrategies: function() {
        if(Game.time > Memory.cooldowns[30] + 500) {
            Memory.cooldowns[30] = Game.time
            switch(Memory.globals.tickMode) {
            case 0: 
                return strategies.executeDefault()
            default:
                return strategies.executeDefault()
            }
        }
    },

    reEvaluateGlobalStrategy: function() {
        if(Game.time > Memory.cooldowns[20] + 1000) {
 
            logger.log("Tick Strategy set to default mode: 0", 20)
            Memory.globals.tickMode = 0
        }
    }
};

module.exports = tickManager;