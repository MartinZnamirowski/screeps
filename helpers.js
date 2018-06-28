var logger = require('logger');

var helpers = {
    freeSpaces: function(pos, radius) {
        const room = Game.rooms[pos.roomName]
        minX = pos.x - radius
        minY = pos.y - radius
        maxX = pos.x + radius
        maxY = pos.y + radius
        areaArray = room.lookAtArea(minY, minX, maxY, maxX, true)
        var emptySpaces = 0
        for (var i = 0, len = areaArray.length; i < len; i++) {
            currentDict = areaArray[i]
            if(currentDict['type'] == 'terrain') {
                if(currentDict['terrain'] != 'wall') {
                    emptySpaces +=1
                }
            }
        }
        return emptySpaces
    },
};
module.exports = helpers;