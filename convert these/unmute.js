const Discord = require("discord.js");

exports.run = (client, message, args) => {
    let user = message.mentions.members.first();
    let member = message.guild.member(user);
    let reason = message.content.split(' ').splice(2).join(' ');

    if (!message.member.hasPermission('MANAGE_MESSAGES'))
        return message.channel.send(`${message.author.username}, you must have **Mod** or above to use this!`)
    if (!user)
        return message.channel.send(`${message.author.username}, please mention a user or put a valid ID!`)
    if (!reason)
        return message.channel.send(`${message.author.username}, please give a reason!`)

    let mutedRole = message.guild.roles.find("name", "Muted");
    member.removeRole(mutedRole);
    message.channel.send(`${user} has been unmuted for **${reason}**!`);
    
    let unmuteEmbed = new Discord.RichEmbed()
    .setTitle(`UNMUTE`)
    .setColor("#90ee90")
    .addField("User Unmuted", `${user}`, true)
    .addField("Moderator", `${message.author}`, true)
    .addField("Reason", `${reason}`, true);

    let logs = message.guild.channels.find("name", "mod-log");
    if (!logs)
        return message.reply("Invalid channel!");
    logs.send(unmuteEmbed);
}

exports.help = {
    name: "unmute"
}