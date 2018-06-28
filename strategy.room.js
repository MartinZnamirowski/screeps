var logger = require('logger');
// 40 - Execute Room Strategy

// Room Strategies:
// 0 - Default

const strategies = {
    executeDefault: function(room) {
        logger.log("Executing Default Room strategy for room " + room + ".", 20)

        // CREEP SPAWN

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
                    return strategies.executeDefault(room)
                default:
                    return strategies.executeDefault(room)
                }
            }
        }
    },
};

module.exports = strategyRoom;