var logger = require('logger');

var suitableLocations = {
    findExtendable2By2: function(room) {
        var occupiyingObjects = []
        occupiyingObjects = occupiyingObjects.concat(room.find(FIND_MY_STRUCTURES))
        occupiyingObjects = occupiyingObjects.concat(room.find(FIND_MY_CONSTRUCTION_SITES))
        for (var occupyingObjectIter in occupiyingObjects) {
            const occupyingObject = occupiyingObjects[occupyingObjectIter]
            const contructionSitesInRange = occupyingObject.pos.findInRange(FIND_MY_CONSTRUCTION_SITES)
            const structuresInRange = occupyingObject.pos.findInRange(FIND_MY_STRUCTURES)
            const objectsInRange = contructionSitesInRange + structuresInRange
            logger.log("OBJECTS IN RANGE: " + objectsInRange)
        }
    },
};
module.exports = suitableLocations;