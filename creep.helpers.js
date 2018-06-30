var logger = require('logger');

var creepHelpers = {
    assignOrderDistribution: function(role, distribution, matrix, room=undefined) {
        var creepSource = undefined
        if(room==undefined) {
            creepSource = Game.creeps
        } else {
            creepSource = room.creeps
        }
        logger.log(creepSource, 5)
        logger.log(creepSource, 5)
        logger.log(creepSource, 5)
        logger.log(creepSource, 5)
        logger.log(creepSource, 5)
        logger.log(creepSource, 5)
        logger.log(creepSource, 5)
        logger.log(creepSource, 5)
        logger.log(creepSource, 5)
        logger.log(creepSource, 5)
        logger.log(creepSource, 5)
        logger.log(creepSource, 5)

        var givenOrderMatrix = []
        var reverseOrderMapping = {}
        for(var iter in matrix) {
            reverseOrderMapping[matrix[iter]] = iter
            givenOrderMatrix[iter] = 0
        }
        
        for(var name in creepSource) {
            logger.log("TREATING ORDERS OF: " + name, 5)
            var creep = creepSource[name];
            if(creep.memory.role == role) {
                const orders = creep.memory.orders
                const orderIter = reverseOrderMapping[orders]
                if(givenOrderMatrix[orderIter] < distribution[orderIter]) {
                    givenOrderMatrix[orderIter] = givenOrderMatrix[orderIter] + 1
                } else {
                    for(var newOrderIter in distribution){
                        if(givenOrderMatrix[newOrderIter] < distribution[newOrderIter]) {
                            givenOrderMatrix[newOrderIter] = givenOrderMatrix[newOrderIter] + 1
                            creep.memory.orders = matrix[newOrderIter]
                        }
                    }
                }
            }
        }
        logger.log(givenOrderMatrix, 5)
        logger.log(givenOrderMatrix, 5)
        logger.log(givenOrderMatrix, 5)
        logger.log(givenOrderMatrix, 5)
    },

    getRoleMatrix: function(room=undefined) {
        var roleMatrix = {}
        var creepSource = undefined
        if(room==undefined) {
            creepSource = Game.creeps
        } else {
            creepSource = room.creeps
        }

        for(var name in creepSource) {
            var creep = creepSource[name];
            if(creep.memory.role in roleMatrix) {
                //logger.log("INITIALIZED HARVERSTER COUNT FOR " + myHarvester.memory.target)
                roleMatrix[creep.memory.role] = roleMatrix[creep.memory.role] + 1
            } else {
                //logger.log("INCREMENTED HARVESTER COUNT FOR " + myHarvester.memory.target)
                roleMatrix[creep.memory.role] = 1
            }
        }
        return roleMatrix
    },

    getHarvestingPower: function(creep) {
        if(creep.memory.role=='harvester') {
            //logger.log("LALA", 5)
            var workModules = 0
            for (var i = 0, len = creep.body.length; i < len; i++) {
                const creepModule = creep.body[i]
                //logger.log("MODULE: " +  creepModule, 5)
                if(creepModule.type == WORK){
                    workModules++
                }
            }
            return workModules
        } else {
            return 0
        }
    },

    constructCreep: function(role, energyLimit) {
        var body = []
        var expendedEnergy = 0
        if(role=='harvester') {
            const pattern = [WORK, CARRY, MOVE]
            const cost = 200
            for(;expendedEnergy + cost <= energyLimit; expendedEnergy+=cost){
                body = body.concat(pattern)
            }
            for(;expendedEnergy + 50 <= energyLimit; expendedEnergy+=50){
                body = [CARRY].concat(body)
            }
        
        }
        return body
    }
};

module.exports = creepHelpers;