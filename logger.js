var logger = {

    /** @param {string} message **/
    log: function(message, level) {
        if (Game.memory.globals.logLevel <= level) {
            console.log(message)
        }
    }
};

module.exports = logger;