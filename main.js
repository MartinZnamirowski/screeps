var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var tickManager = require('tick.manager')
var logger = require('logger');

Memory.globals = {
    "logLevel": 5,
    "strategy": 0,
    "tickMode": 0
}

Memory.cooldowns = {
    10: 0,
    20: 0,
    30: 0,
    40: 0,
    100: 0,
}



module.exports.loop = function () {

    const distribution = tickManager.getDistribution()
    logger.log(distribution, 5)

    logger.log(distribution[10], 5)
    logger.log(distribution["10"], 5)

    // Execution Tree
    if(distribution["10"]) {
        tickManager.reEvaluateTickStrategy()
    }

    var tower = Game.getObjectById('TOWER_ID');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader1') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}