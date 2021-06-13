const TempChannels = require("discord-temp-channels");
const tempChannels = new TempChannels(client);

client.on("ready", () => {
    if (!db.get("temp-channels")) db.set("temp-channels", []);
    db.get("temp-channels").forEach((channelData) => {
        tempChannels.registerChannel(channelData.channelID, channelData.options);
    });
});
