var logger = require('logger');
// 40 - Execute Room Strategy

// Room Strategies:
// 0 - Default

const strategies = {
    executeDefault: function() {
        logger.log("Executing Default Room strategy.", 20)
    }
}

var strategyRoom = {
    executeStrategies: function() {
        if(Game.time > Memory.cooldowns[40] + 20) {
            Memory.cooldowns[40] = Game.time
            var room
            for(room in Game.rooms) {    
                switch(Memory.roomStrategies[room]) {
                case 0: 
                    return strategies.executeDefault()
                default:
                    return strategies.executeDefault()
                }
            }
        }
    },
};

module.exports = strategyRoom;