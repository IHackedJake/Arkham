const Discord = require("discord.js");
const Enmap = require("enmap");

exports.run = (client, message, args) => {
    let user = message.mentions.users.first();
    let member = message.guild.member(user);
    let key = `${message.guild.id}-${message.author.id}`;
    let reason = "Advertising";

    if (!message.member.hasPermission('MANAGE_MESSAGES'))
    return message.channel.send(`${message.author.username}, you must have **Mod** or above to use this!`)

    if (!user) return message.channel.send("Please enter a valid user/ID!")

    client.hist.inc(key, "ads");
    message.channel.send(`**[BAN]** ${user.tag} has been banned for **Advertising!**`);
    let banEmbed = new Discord.RichEmbed()
    .setTitle(`BAN - ${user.tag}`)
    .setAuthor(client.user.username, client.user.avatarURL)
    .setColor("#006400")
    .addField("User Punished", `${user}`, true)
    .addField("Moderator", `${message.author}`, true)
    .addField("Reason", "Advertising", true)
    .addField("Channel Punished", message.channel, true)
    .addField("Current Offense", "1st", true)
    .addField("User's ID", `${user.id}`, true)
    .addField("Duration", "Permanent", true)
    .setTimestamp(new Date());

    let logs = message.guild.channels.find("name", "mod-log");
    if (!logs) return message.reply("Invalid Channel!");
    logs.send(banEmbed);

    member.ban(reason);
}

exports.help = {
    name: "ads"
}