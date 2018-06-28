var logger = require('logger');

var helpers = {
    freeSpaces: function(pos, radius) {
        const room = Game.rooms[pos.roomName]
        const minX = pos.x - radius
        const minY = pos.y - radius
        const maxX = pos.x + radius
        const maxY = pos.y + radius
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
};
module.exports = helpers;