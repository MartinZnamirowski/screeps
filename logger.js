var logger = {

    /** @param {string} message **/
    log: function(message, level) {
        if (Memory.globals.logLevel <= level || level==undefined) {
            console.log(JSON.stringify(message))
        }
    }
};

module.exports = logger;