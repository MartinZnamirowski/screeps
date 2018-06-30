var logger = require('logger');

var suitableLocations = {
    findExtendable2By2: function(room) {
        var occupyingObjects = []
        occupyingObjects = occupyingObjects.concat(room.find(FIND_MY_STRUCTURES))
        occupyingObjects = occupyingObjects.concat(room.find(FIND_MY_CONSTRUCTION_SITES))
        logger.log(occupyingObjects)
        for (var occupyingObjectIter in occupyingObjects) {
            const occupyingObject = occupyingObjects[occupyingObjectIter]
            logger.log(occupyingObject)
            logger.log(occupyingObject)
            logger.log(occupyingObject)
            const contructionSitesInRange = occupyingObject.pos.findInRange(FIND_MY_CONSTRUCTION_SITES, 1)
            const structuresInRange = occupyingObject.pos.findInRange(FIND_MY_STRUCTURES, 1)
            const objectsInRange = contructionSitesInRange + structuresInRange
            logger.log("OBJECTS IN RANGE: " + objectsInRange)
        }
    },
};
module.exports = suitableLocations;