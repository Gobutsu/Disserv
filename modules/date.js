let { discordIdToTimestamp } = require('./../utils');

module.exports = {
    name: 'date',
    run: async (id) => {
        let timestamp = discordIdToTimestamp(id);
        console.log(`[/] If this server exists, it was created on ${new Date(timestamp).toUTCString()} (${timestamp})`);
    }
};