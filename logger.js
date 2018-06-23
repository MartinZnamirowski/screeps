var logger = {

    /** @param {string} message **/
    log: function(message, level) {
        if (Memory.globals.logLevel <= level) {
            console.log(message)
        }
    }
};

module.exports = logger;