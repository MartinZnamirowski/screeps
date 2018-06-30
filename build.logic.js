var logger = require('logger');
var helpers = require('helpers');

const OUTLYERS = ['controller', 'link']
var buildingHelpers = {
    

    constructableSpaces: function(pos, radius) {
        const room = Game.rooms[pos.roomName]
        const minX = pos.x - radius
        const minY = pos.y - radius
        const maxX = pos.x + radius
        const maxY = pos.y + radius
        var buildableArray = []

        const xArray = helpers.range(minX, maxX)
        const yArray = helpers.range(minY, maxY)
        for (var xIndex in xArray) {
            const x = xArray[xIndex]
            buildableArray[x] = []
            for (var yIndex in yArray) {
                const y = yArray[yIndex]
                logger.log("SETTING X + Y to True: " + x + " + " + y)
                buildableArray[x][y] = true
            }
        }
        logger.log(buildableArray)
        return 0
        const areaArray = room.lookAtArea(minY, minX, maxY, maxX, true)
        var emptySpaces = 0
        for (var i = 0, len = areaArray.length; i < len; i++) {
            const currentDict = areaArray[i]
            if(currentDict['type'] == 'terrain') {
                if(currentDict['terrain'] != 'wall') {
                    emptySpaces +=1
                }
            }
        }
        return emptySpaces
    },

}

var suitableLocations = {
    findExtendable2By2: function(room) {
        var occupyingObjects = []
        occupyingObjects = occupyingObjects.concat(room.find(FIND_MY_STRUCTURES))
        occupyingObjects = occupyingObjects.concat(room.find(FIND_MY_CONSTRUCTION_SITES))
        for (var occupyingObjectIter in occupyingObjects) {
            const occupyingObject = occupyingObjects[occupyingObjectIter]
            if(OUTLYERS.includes(occupyingObject.structureType)) {
                continue
            }
            const contructionSitesInRange = occupyingObject.pos.findInRange(FIND_MY_CONSTRUCTION_SITES, 1)
            const structuresInRange = occupyingObject.pos.findInRange(FIND_MY_STRUCTURES, 1)
            const objectsInRange = contructionSitesInRange.length + structuresInRange.length
            logger.log("OBJECTS IN RANGE: " + objectsInRange)
            if (objectsInRange < 4) {
                logger.log("OBJECTS IN RANGE <4")
                var constructableSpaces = buildingHelpers.constructableSpaces(occupyingObject.pos, 1)
            }
        }
    },
};
module.exports = suitableLocations;