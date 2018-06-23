// require('console.commands).init()
// Game.spawn['Spawn1'].spawnCreep([WORK, MOVE, CARRY], 'Testi', {'memory': {'role':'uprader1}})

var consoleCommands = {

    init: function() {
        Memory.globals = {
            "logLevel": 20,
            "strategy": 0,
            "tickMode": 0
        }
    }
};

module.exports = consoleCommands;