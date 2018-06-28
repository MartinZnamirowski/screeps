var logger = require('logger');

var harvesterHelper = {
    determineHarvestingSlot: function(creep) {
        var sources = creep.room.find(FIND_SOURCES);

        var harvestMapping = {}

        const myHarvesters = creep.room.find(FIND_MY_CREEPS, {
            filter: (creep) => {
                return creep.memory.role=='harvester'
            }
        })
        for (var i = 0, len = myHarvesters.length; i < len; i++) {
            const myHarvester = myHarvesters[i]
            if(myHarvester.memory.target == undefined) {
                continue
            } 
            if(!myHarvester.memory.target in harvestMapping) {
                harvestMapping[myHarvester.memory.target] = 1
            } else {
                harvestMapping[myHarvester.memory.target] += 1
            }
        }

        logger.log('HARVESTMAPPING: ' + harvestMapping)
        // TODO ORDER SOURCES BY DISTANCE
        for (const sourceID in creep.room.memory.harvestSlots) {
            logger.log('sourceID: ' + sourceID)
            if(harvestMapping[sourceID] < creep.room.memory.harvestSlots[sourceID]) {
                return sourceID
            }
        }            
    },
}

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        logger.log("HUH")
        if(creep.carry.energy < creep.carryCapacity && creep.memory.target == undefined) {
            logger.log("OHhfdsfd")
            var target = harvesterHelper.determineHarvestingSlot(creep)
            logger.log("TARGET!" + target)
            creep.memory.target = target
        } else if (creep.carry.energy == creep.carryCapacity){
            logger.log("AHHHHHHHHHHHHHHHHHHHHHHHHHHH")
            creep.memory.target = undefined
        }

        if(!creep.memory.target == undefined) {
            if(creep.harvest(Game.getObjectById(creep.memory.target)) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.memory.target), {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        } else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    }
};

module.exports = roleHarvester;