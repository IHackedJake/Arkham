const Discord = require("discord.js");

exports.run = (client, message, args) => {
    let user = message.mentions.users.first();
    let member = message.guild.member(user);
    let reason = message.content.split(' ').splice(2).join(' ');

    if (!message.member.hasPermission('MANAGE_MESSAGES'))
        return message.channel.send(`${message.author.username}, you must have **Admin** or above to use this!`)
    if (!user)
        return message.channel.send(`${message.author.username}, please mention a user or put a valid ID!`)
    if (!reason)
        return message.channel.send(`${message.author.username}, please give a reason!`)

    member.kick(reason);
    message.channel.send(`${user} has been kicked for **${reason}**!`);

    let kickEmbed = new Discord.RichEmbed()
    .setTitle("KICK")
    .setColor("")
    .addField("User Punished", `${user}`, true)
    .addField("Moderator", `${message.author}`, true)
    .addField("Reason", `${reason}`, true)
    .addField("Channel Punished", message.channel, true)

    let logs = message.guild.channels.find("name", "mod-log");
    if (!logs) 
        return message.reply("Invalid channel!");
    
    logs.send(kickEmbed);
}

exports.help = {
    name: "kick"
}