const Discord = require("discord.js");
const Enmap = require("enmap");

exports.run = (client, message, args) => {
    const key = `${message.guild.id}-${message.author.id}`;
    let user = message.mentions.users.first();
    let member = message.guild.member(user);
    let reason = message.content.split(' ').splice(2).join(' ');
    let helperRole = message.guild.roles.find("name", "Helper");

    if (!message.member.hasPermission('ADMINISTRATOR')) 
        return message.channel.send(`${message.author.username}, you must have **Helper** or above to use this!`)
    if (!user)
        return message.channel.send(`${message.author.username}, please mention a user or put a valid ID!`)
    if (!reason)
        return message.channel.send(`${message.author.username}, please give a reason!`)

    user.send(`You have been warned for **${reason}**!`);
    message.channel.send(`${user} has been warned for **${reason}**!`);

    let warnEmbed = new Discord.RichEmbed()
    .setTitle(`WARN`)
    .setColor("#CCCC00")
    .addField("User Punished", `${user}`, true)
    .addField("Moderator", `${message.author}`, true)
    .addField("Reason", `${reason}`, true)
    .addField("Channel Punished", message.channel, true)
    .setTimestamp(new Date());

    let logs = message.guild.channels.find("name", "mod-log");
    if (!logs) 
        return message.reply("Invalid channel!");

    logs.send(warnEmbed);

    const every = client.warns.get(key, "warns1");
    message.channel.send(every);
    
}

exports.help = {
    name: "warn"
}