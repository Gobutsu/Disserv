const fs = require('fs');
const path = require('path');
const { validateDiscordId } = require('./utils');

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

if (!argv.id) {
    console.log("Usage: node disserv.js --id <id>");
    process.exit(1);
}

let debug = false;
let id = argv.id;

if (!validateDiscordId(id)) return console.log("[X] Invalid Discord ID");

(async () => {
    for (const file of fs.readdirSync(__dirname + "/modules")) {
        try {
            let module = require(path.join(__dirname, "modules", file));
            await module.run(id);
        } catch (e) {
            if (debug) console.log(e);
        }
    };

    console.log("[/] Finished");
})();