let axios = require('axios');

module.exports = {
    name: 'widget',
    run: async (id) => {
        let response = await axios.get(`https://discordapp.com/api/guilds/${id}/widget.json`, {
            validateStatus: () => true
        }); 
        if (response.status !== 200) return;

        let data = response.data;
        console.log("[+] This server has widget enabled:");
        console.log({
            widget_data: `https://discordapp.com/api/guilds/${id}/widget.json`,
            name: data.name,
        })
    }
};