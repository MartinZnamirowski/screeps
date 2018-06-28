var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var strategyGlobal = require('strategy.global')
var strategyRoom = require('strategy.room')
var tickManager = require('tick.manager')
var logger = require('logger');

// INIT GLOBALS
if (Memory.globals == undefined) {
    Memory.globals = {
        "logLevel": 5,
        "strategy": 0,
        "tickMode": 0
    }
}

// INIT COOLDOWNS
if (Memory.cooldowns == undefined) {
    Memory.cooldowns = {
        10: -10000,
        20: -10000,
        30: -10000,
        40: -10000,
        100: -10000,
    }
}


module.exports.loop = function () {

    // MEMORY CLEANUP
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    const distribution = tickManager.getDistribution()
    // logger.log(distribution, 5)
    logger.log(Game.time, 5)

    // Execution Tree
    if(distribution[10]) {
        tickManager.reEvaluateTickStrategy()
    }

    // Execution Tree
    if(distribution[20]) {
        strategyGlobal.reEvaluateGlobalStrategy()
    }

    // Execution Tree
    if(distribution[30]) {
        strategyGlobal.executeStrategies()
    }

    // Execution Tree
    if(distribution[30]) {
        strategyRoom.executeStrategies()
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