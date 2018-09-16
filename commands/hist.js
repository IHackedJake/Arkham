const Discord = require("discord.js");
const Enmap = require("enmap");

exports.run = (client, message, args) => {
    let user = message.mentions.users.first();
    let member = message.guild.member(user);
    let key = `${message.guild.id}-${message.author.id}`;
    let getPunishment = args[1];

    if (!message.member.hasPermission('MANAGE_MESSAGES'))
    return message.channel.send(`${message.author.username}, you must have **Mod** or above to use this!`)

    if (!user) return message.channel.send("Please submit a valid user/ID!");

    const ads = client.hist.get(key, "ads");
    const racism = client.hist.get(key, "racism");

    let histEmbed = new Discord.RichEmbed()
    .setTitle(`${user.tag}'s History!`)
    .setColor()
    .setAuthor(client.user.username, client.user.avatarURL)
    .addField("Racism Offense", `${racism}`, true)
    .addField("Ads", `${ads}`, true)
    .setTimestamp(new Date());

    message.channel.send(histEmbed);
}

exports.help = {
    name: "hist"
}