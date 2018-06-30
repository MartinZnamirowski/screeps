var logger = require('logger');

var helpers = {
    range: function(start, end) {
        var returnArray = []
        for (var counter = start; counter <= end; counter++) {
            returnArray[counter-start] = counter
        }
        return returnArray
    },

    getAbsoluteDistribution: function(total, distribution) {
        var gotOneExtra = []
        var totalPartials = 0
        var usedUp = 0
        var result = []
        for(var iter in distribution) {
            gotOneExtra[iter] = 0
            gotOneExtra[result] = 0
            totalPartials +=  distribution[iter]
        }

        for(var iter in distribution) {
            const multiplier = distribution[iter] / totalPartials
            const absolutePart = total * multiplier
            const absoluteFloored = Math.floor(absolutePart)
            if (usedUp + absoluteFloored <= total) {
                result[iter] = absoluteFloored
                usedUp += absoluteFloored
            }
            if(absolutePart - Math.floor(absolutePart) >= 0.5) {
                if (usedUp + 1 <= total) {
                    result[iter] = result[iter] + 1
                    gotOneExtra[iter] = 1
                    usedUp += 1
                }
            }
        }

        for (var iter in gotOneExtra) {
            if(usedUp == total) {
                break
            } else if (gotOneExtra[iter] == 0) {
                result[iter] = result[iter] + 1
                gotOneExtra[iter] = 1
                usedUp += 1
            }
        }
        return result
    },

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