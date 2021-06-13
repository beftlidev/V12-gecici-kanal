const TempChannels = require("discord-temp-channels");
const tempChannels = new TempChannels(client);

client.on("ready", () => {
    if (!db.get("temp-channels")) db.set("temp-channels", []);
    db.get("temp-channels").forEach((channelData) => {
        tempChannels.registerChannel(channelData.channelID, channelData.options);
    });
});

client.on("message", (message) => {

    if(message.content.startsWith("g.geçici-kanal")){
   if(!message.member.permissions.has('MANAGE_MESSAGES')) {
    const embed = new Discord.MessageEmbed()
      .setDescription(`**Ne yazık ki bu komutu kullanmaya yetkin yok. <:bakimda:798582408642560110>**`)
    message.channel.send(embed);
    return;
  }

const voiceChannel = message.member.voice.channel;
  if (!message.member.voice.channel) { return message.inlineReply("Bi ses kanalına katılman lazım"); }

if(tempChannels.channels.some((channel) => channel.channelID === message.member.voice.channel.id)){
            return message.inlineReply("Ses kanalınız zaten bir Geçici Kanal Oluşturma kanaldır!");
        }
        const options = {
            childAutoDeleteIfEmpty: true,
            childAutoDeleteIfOwnerLeaves: true,
            childMaxUsers: 3,
            childBitrate: 64000,
            childFormat: (member, count) => `#${count} | ${member.user.username}`
        };
        tempChannels.registerChannel(message.member.voice.channel.id, options);
        db.push("temp-channels", {
            channelID: message.member.voice.channel.id,
            options: options
        });
        message.inlineReply("Bulunduğunuz kanal artık Geçici Kanal Oluşturma kanalı!");
    }

});
