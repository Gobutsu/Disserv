const axios = require('axios');
const fs = require('fs');
const path = require('path');
const util = require('util');

module.exports = {
    name: 'dynchan',
    run: async (id) => {
        let response = await axios.post(`https://api.dynchan.net/guilds/`, {
            "guildid": id
        });
        if (response.status !== 200) return;
        if (response.data.guild.name === null) return;

        result = {
            "name": response.data.guild.name
        }

        let channels = await axios.post(`https://api.dynchan.net/meta/channels/`, {
            "guildid": id
        });

        result.channels = channels.data.items;

        console.log(`[+] This server is displayed on DynChan`);
        console.log(result);
    }
};