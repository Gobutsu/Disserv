const axios = require('axios');
const fs = require('fs');
const path = require('path');
const util = require('util');
const parser = require('node-html-parser');

module.exports = {
    name: 'sources',
    run: async (id) => {
        let lists = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "sources.json"), "utf8"));
        await Promise.all(lists.map(async (website) => {
            let options = {
                validateStatus: () => true,
                timeout: 5000,
                method: website.method || "get",
                redirect: "follow",
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"
                }
            }

            if (website.data) {
                options.data = Object.entries(website.data).reduce((acc, [key, value]) => {
                    acc[key] = util.format(value, id);
                    return acc;
                }, {});
            }
        

            let result = await axios.request(util.format(website.endpoint, id), options);
            if (result.status !== 200) return;

            let object = {
                page_url: util.format(website.page_url || website.endpoint, id),
            }

            if (website.type == "html") {
                let root = parser.parse(result.data);

                Object.keys(website.selectors).forEach((key) => {
                    if (key == "icon") {
                        object[key] = root.querySelector(website.selectors[key]).getAttribute("src");
                        return;
                    }
    
                    object[key] = root.querySelector(website.selectors[key]).text;
                });
            } else if (website.type == "json") {
                let data = result.data;
                Object.keys(website.fields).forEach((key) => {
                    object[key] = eval("data."+website.fields[key]);
                });
            }

            console.log(`[+] This server is displayed on ${website.name}`);
            console.log(object);
        }));
    }
};