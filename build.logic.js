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
        var buildableArray = {}

        const xArray = helpers.range(minX, maxX)
        const yArray = helpers.range(minY, maxY)
        for (var xIndex in xArray) {
            const x = xArray[xIndex]
            buildableArray[x] = {}
            for (var yIndex in yArray) {
                const y = yArray[yIndex]
                // logger.log("SETTING X + Y to True: " + x + " + " + y)
                buildableArray[x][y] = true
            }
        }
        const areaArray = room.lookAtArea(minY, minX, maxY, maxX, true)
        for (var i = 0, len = areaArray.length; i < len; i++) {
            const currentDict = areaArray[i]
            if(currentDict['type'] == 'terrain') {
                if(currentDict['terrain'] == 'wall') {
                    buildableArray[currentDict['x']][currentDict['y']] = false
                }
            }

            if(currentDict['type'] == 'structure'  || currentDict['type'] == 'construction_site') {
                    buildableArray[currentDict['x']][currentDict['y']] = false
            }
        }
        var returnList = []
        for (var xIndex in xArray) {
            const x = xArray[xIndex]
            for (var yIndex in yArray) {
                const y = yArray[yIndex]
                if (buildableArray[x][y])
                    returnList.push([x,y])
            }
        }
        return returnList
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
                logger.log("CONSTRUCTABLE SPACES")
                logger.log(constructableSpaces)
                var bestX
                var bestY
                var bestNeighbours = 0
                for(var conSpaceIndex in constructableSpaces) {
                    const coordinates = constructableSpaces[conSpaceIndex]
                    const newPos = new RoomPosition(coordinates[0], coordinates[1], room.name);
                    const newContructionSitesInRange = newPos.findInRange(FIND_MY_CONSTRUCTION_SITES, 1)
                    const newStructuresInRange = newPos.findInRange(FIND_MY_STRUCTURES, 1)        
                    const newObjectsInRange = newContructionSitesInRange.length + newStructuresInRange.length
                    if (newObjectsInRange == 3) {
                        return 
                    } else if (newObjectsInRange>bestNeighbours) {
                        bestX = coordinates[0]
                        bestY = coordinates[1]
                        bestNeighbours = newObjectsInRange
                    }
                }
                if(bestNeighbours > 0) {
                    return [bestX, bestY]
                }
            }
        }
    },

    findNew2By2: function(room) {
        var occupyingObjects = []
        occupyingObjects = occupyingObjects.concat(room.find(FIND_MY_STRUCTURES))
        occupyingObjects = occupyingObjects.concat(room.find(FIND_MY_CONSTRUCTION_SITES))
        var checkedSquares = []
        for (var occupyingObjectIter in occupyingObjects) {
            const occupyingObject = occupyingObjects[occupyingObjectIter]

            // SKIP BECAUSE WRONG STRUCTURE TYPE
            if(OUTLYERS.includes(occupyingObject.structureType)) {
                continue
            }

            // SKIP BECAUSE WITHIN CHECKED SQUARES
            var skipCovered = false
            for(checkedSquareIter in checkedSquares) {
                checkedSquare = checkedSquares[checkedSquareIter]
                if (occupyingObject.pos.y >= checkedSquare[0] && occupyingObject.pos.y <= checkedSquare[2] && 
                    occupyingObject.pos.x >= checkedSquare[1] && occupyingObject.pos.x >= checkedSquare[3]) {
                    skipCovered = true
                }
            }
            if (skipCovered) {
                continue
            }

            const contructionSitesInRange = occupyingObject.pos.findInRange(FIND_MY_CONSTRUCTION_SITES, 1)
            const structuresInRange = occupyingObject.pos.findInRange(FIND_MY_STRUCTURES, 1)
            const blockingThings = contructionSitesInRange.concat(structuresInRange)
            
            // FIND RADIUS FOR THIS STRUCTURE
            var minY = occupyingObject.pos.y
            var minX = occupyingObject.pos.x
            var maxY = occupyingObject.pos.y
            var maxX = occupyingObject.pos.x
            for (var blockingThingIter in blockingThings) {
                const blockingThing = blockingThings[blockingThingIter]
                if(blockingThing.pos.y < minY) {
                    minY = blockingThing.pos.y
                }
                if(blockingThing.pos.x < minX) {
                    minX = blockingThing.pos.x
                }
                if(blockingThing.pos.y > maxY) {
                    maxY = blockingThing.pos.y
                }
                if(blockingThing.pos.x > maxX) {
                    maxX = blockingThing.pos.x
                }
            }
            checkSquare = [minY, minX, maxY, maxX]
            checkedSquares.push(checkedSquare)
            logger.log(checkedSquare)
        }
    },

};
module.exports = suitableLocations;