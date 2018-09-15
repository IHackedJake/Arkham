const Discord = require("discord.js");

exports.run = (client, message, args) => {
    let user = message.mentions.users.first();
    let member = message.guild.member(user);
    let reason = message.content.split(' ').splice(2).join(' ');
    let mutedRole = message.guild.roles.find("name", "Muted");

    if (!message.member.hasPermission('MANAGE_ROLES'))
        return message.channel.send(`${message.author.username}, you must have **Admin** or above to use this!`)
    if (!user)
        return message.channel.send(`${message.author.username}, please mention a user or put a valid ID!`)
    if (!reason)
        return message.channel.send(`${message.author.username}, please give a reason!`)
    
    user.send(`You have been **permanently** muted for ${reason}! If you wish to appeal this, please submit an appeal on the forums!`);
    member.addRole(mutedRole);
    message.channel.send(`${user} has been permanently muted for **${reason}**!`);

    let muteEmbed = new Discord.RichEmbed()
    .setTitle(`MUTE`)
    .setColor("#ADD8E6")
    .addField("User Punished", `${user}`, true)
    .addField("Moderator", `${message.author}`, true)
    .addField("Reason", `${reason}`, true)
    .addField("Channel Punished", message.channel, true)

    let logs = message.guild.channels.find("name", "mod-log");
    if (!logs)
        return message.reply("Invalid channel!");
    
    logs.send(muteEmbed);
    
}

exports.help = {
    name: "mute"
}