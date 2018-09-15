const Discord = require("discord.js");

exports.run = (client, message, args) => {
    let user = message.mentions.users.first();
    let member = message.guild.member(user);
    let reason = message.content.split(' ').splice(2).join(' ');

    if (!message.member.hasPermission('MANAGE_MESSAGES'))
    return message.channel.send(`${message.author.username}, you must have **Mod** or above to use this!`)
    if (!user)
        return message.channel.send(`${message.author.username}, please mention a user or put a valid ID!`)
    if (!reason)
        return message.channel.send(`${message.author.username}, please give a reason!`)

    member.ban(reason);
    message.channel.send(`${user} has been permanently banned for **${reason}**!`);

    let banEmbed = new Discord.RichEmbed()
    .setTitle(`BAN`)
    .setColor("#ff4c4c")
    .addField("User Punished", `${user}`, true)
    .addField("Moderator", `${message.author}`, true)
    .addField("Reason", `${reason}`, true)
    .addField("Channel Punished", message.channel, true)

    let logs = message.guild.channels.find("name", "mod-log");
    if (!logs)
        return message.reply("Invalid channel!");

    logs.send(banEmbed);
}

exports.help = {
    name: "ban"
}