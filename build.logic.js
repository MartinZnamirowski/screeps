var logger = require('logger');

var suitableLocations = {
    findExtendable2By2: function(room) {
        var occupiyingObjects = []
        occupiyingObjects = occupiyingObjects.concat(room.find(FIND_MY_STRUCTURES))
        occupiyingObjects = occupiyingObjects.concat(room.find(FIND_MY_CONSTRUCTION_SITES))
        for (var occupyingObjectIter in occupiyingObjects) {
            occupyingObject = occupiyingObjects[occupyingObjectIter]
            const contructionSitesInRange = occupiyingObject.pos.findInRange(FIND_MY_CONSTRUCTION_SITES)
            const structuresInRange = occupiyingObject.pos.findInRange(FIND_MY_STRUCTURES)
            objectsInRange = contructionSitesInRange + structuresInRange
            logger.log("OBJECTS IN RANGE: " + objectsInRange)
        }
    },
};
module.exports = suitableLocations;