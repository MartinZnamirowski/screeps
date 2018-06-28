var logger = require('logger');
var helpers = require('helpers');
var creepHelpers = require('creep.helpers');
// 40 - Execute Room Strategy

// Room Strategies:
// 0 - Default

var roomHelpers = {
    harvesterSatiation: function(room) {
        var maxEnergyRate
        var harvestSlots

        // Determine maxEnergyRate
        if(room.memory.maxEnergyRate == undefined) {
            var sources = room.find(FIND_SOURCES)
            maxEnergyRate = 0
            logger.log(sources, 5)
            var sourceId
            for(sourceId in sources) {
                const source = sources[sourceId]
                maxEnergyRate += source.energyCapacity / 300
            }
            room.memory.maxEnergyRate = maxEnergyRate
            logger.log("Room " + room.name + " was found to have a max energy Rate of: " + maxEnergyRate, 20)
        } else {
            maxEnergyRate = room.memory.maxEnergyRate
        }

        // Determine harvestSlots
        if(room.memory.harvestSlots == undefined) {
            var sources = room.find(FIND_SOURCES)
            harvestSlots = 0
            var sourceId
            for(sourceId in sources) {
                const source = sources[sourceId]
                const freeSpaces = helpers.freeSpaces(source.pos, 1)
                harvestSlots += freeSpaces
            }
            room.memory.harvestSlots = harvestSlots
            logger.log("Room " + room.name + " was found to have " + harvestSlots + " harvest slots.", 20)
        } else {
            harvestSlots = room.memory.harvestSlots
        }
        
        const myCreeps = room.find(FIND_MY_CREEPS)
        //logger.log("MY CREEPs: " + myCreeps, 5)
        var harvesterNumber = 0
        var harvestingPower = 0
        for (var i = 0, len = myCreeps.length; i < len; i++) {
            const myCreep = myCreeps[i]
            const currentHP = creepHelpers.getHarvestingPower(myCreep)
            //logger.log("CHECKING CREEP: " + myCreep, 5)
            if(currentHP > 0) {
                harvesterNumber++
                harvestingPower += currentHP
            }
        }
        //logger.log("HARVESTER NUMBER: " + harvesterNumber, 5)
        //logger.log("HARVESTING POWER: " + harvestingPower, 5)
        return harvestingPower >= maxEnergyRate && harvesterNumber >= harvestSlots    
    }
}

const strategies = {
    executeDefault: function(roomName) {
        logger.log("Executing Default Room strategy for room " + roomName + ".", 20)

        const room = Game.rooms[roomName]
        
        // SPAWN MAX CREEPS
        const anySpawn = room.find(FIND_MY_SPAWNS)[0]
        logger.log(anySpawn)
        if(room.energyAvailable == room.energyCapacityAvailable) {
            if(!roomHelpers.harvesterSatiation(room)){
                logger.log("Room " + roomName + " has no harvester Satisfaction. Spawning Harvester.", 20)
                const body = creepHelpers.constructCreep('harvester', room.energyAvailable)
                logger.log(body)
                anySpawn.spawnCreep(body, 'harvester-' + Game.time, {memory: {role: 'harvester'}});
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