var logger = require('logger');
// 40 - Execute Room Strategy

// Room Strategies:
// 0 - Default

var roomHelpers = {
    harvesterSatiation: function(room) {
        var maxEnergyRate
        if(room.memory.maxEnergyRate == undefined) {
            var sources = room.find(FIND_SOURCES)
            maxEnergyRate = 0
            var source
            for(source in sources) {
                maxEnergyRate += source.energyCapacity / 300
            }
            room.memory.maxEnergyRate = maxEnergyRate
            logger.log("Room " + room.name + " was found to have a max energy Rate of: " + maxEnergyRate)
        } else {
            maxEnergyRate = room.memory.maxEnergyRate
        }
    }
}

const strategies = {
    executeDefault: function(roomName) {
        logger.log("Executing Default Room strategy for room " + roomName + ".", 20)

        const room = Game.rooms[roomName]
        // SPAWN MAX CREEPS
        if(room.energyAvailable == room.energyCapacityAvailable) {
            if(!roomHelpers.harvesterSatiation(room)){

            }
        }
    }
}

var strategyRoom = {
    executeStrategies: function() {
        if(Game.time > Memory.cooldowns[40] + 20) {
            Memory.cooldowns[40] = Game.time
            var roomName
            for(roomName in Game.rooms) {    
                switch(Memory.roomStrategies[roomName]) {
                case 0: 
                    return strategies.executeDefault(roomName)
                default:
                    return strategies.executeDefault(roomName)
                }
            }
        }
    },
};

module.exports = strategyRoom;