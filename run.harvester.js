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
            if(!(myHarvester.memory.target in harvestMapping)) {
                //logger.log("INITIALIZED HARVERSTER COUNT FOR " + myHarvester.memory.target)
                harvestMapping[myHarvester.memory.target] = 1
            } else {
                //logger.log("INCREMENTED HARVESTER COUNT FOR " + myHarvester.memory.target)
                harvestMapping[myHarvester.memory.target] = harvestMapping[myHarvester.memory.target] + 1
            }
            //logger.log("AFTER TREATING HARVESTER!")
            //logger.log(harvestMapping)
        }

        //logger.log(harvestMapping)
        // TODO ORDER SOURCES BY DISTANCE
        for (const sourceID in creep.room.memory.harvestSlots) {
            //logger.log(sourceID)
            //logger.log(creep.room.memory.harvestSlots[sourceID])
            //logger.log(creep.room.memory.harvestSlots)
            if(harvestMapping[sourceID] == undefined || harvestMapping[sourceID] == null || harvestMapping[sourceID] < creep.room.memory.harvestSlots[sourceID]) {
                //logger.log("SOURCE ACCEPTED!")
                //logger.log("SOURCE ID: " +  sourceID)
                //logger.log("harvestMapping[sourceID]: " + harvestMapping[sourceID])
                //logger.log("creep.room.memory.harvestSlots[sourceID]: " + creep.room.memory.harvestSlots[sourceID])
                // Check if contaminated by enemy
                const source = Game.getObjectById(sourceID)
                const hostiles = creep.room.find(FIND_HOSTILE_CREEPS)
                var tooDangerous = false
                for (var i = 0, len = hostiles.length; i < len; i++) {
                    const hostile = hostiles[i]
                    if(source.pos.inRangeTo(hostile.pos, 5)) {
                        tooDangerous = true
                    }
                }
                if(tooDangerous) {
                    logger.log("TOOO DANGEROUSSS!!")
                    continue
                } else {
                return sourceID
                }
            }
        }            
    },
}

var ordersHarvester = {

    /** @param {Creep} creep **/
    runBaseFeeder: function(creep) {
        if(creep.carry.energy < creep.carryCapacity && creep.memory.target == undefined) {
            var target = harvesterHelper.determineHarvestingSlot(creep)
            creep.memory.target = target
        } else if (creep.carry.energy == creep.carryCapacity){
            creep.memory.target = undefined
        }

        if(creep.memory.target != undefined) {
            const source = Game.getObjectById(creep.memory.target)
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
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
    },

        /** @param {Creep} creep **/
    runUpgrader: function(creep) {
        if(creep.carry.energy == 0 && creep.memory.target == undefined) {
            var target = harvesterHelper.determineHarvestingSlot(creep)
            creep.memory.target = target
        } else if (creep.carry.energy == creep.carryCapacity){
            creep.memory.target = undefined
        }

        if(creep.memory.target != undefined) {
            const source = Game.getObjectById(creep.memory.target)
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        } else {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    },

};

var runHarvester = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.orders == "baseFeeder") {
            ordersHarvester.runBaseFeeder(creep)
        if(creep.memory.orders == "upgrader") {
            ordersHarvester.runUpgrader(creep)
        } else {
            ordersHarvester.runBaseFeeder(creep)
        }
    }

};


module.exports = runHarvester;