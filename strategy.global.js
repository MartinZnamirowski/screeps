var logger = require('logger');
// 20 - ReEvaluate Global Strategy
// 30 - Execute Global Strategy

// Global Strategies:
// 0 - Default

const strategies = {
    executeDefault: function() {
        logger.log("Executing Default strategy.", 20)
        var room
        for(room in Game.rooms) {
            logger.log("Room Strategy of room " + room + " set from " + Memroy.roomStrategies[room] + "to default mode: 0.", 20)
            if (Memory.roomStrategies == undefined) {
                Memory.roomStrategies = {}
            }
            Memory.roomStrategies(room) = 0
        }
    }
}

var tickManager = {
    executeStrategies: function() {
        if(Game.time > Memory.cooldowns[30] + 20) {
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
        if(Game.time > Memory.cooldowns[20] + 20) {
            Memory.cooldowns[20] = Game.time 
            logger.log("Global Strategy set to default mode: 0", 20)
            Memory.globals.tickMode = 0
        }
    }
};

module.exports = tickManager;