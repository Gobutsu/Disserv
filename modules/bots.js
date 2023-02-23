const axios = require('axios');
const fs = require('fs');
const path = require('path');
const util = require('util');

module.exports = {
    name: 'bots',
    run: async (id) => {
        let found = false;
        let bots = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "bots.json"), "utf8"));
        await Promise.all(bots.map(async (bot) => {
            let result = await axios.get(util.format(bot.endpoint, id), {
                validateStatus: () => true
            });
            if (result.status !== 200) return;

            found = true;
            console.log(`[+] ${bot.name} is/was on this server`);
        }));

        if (found) console.log("[+] => Since at least one bot was found, this server exists");
    }
};