const Discord = require("discord.js");
const ms = require("ms");

exports.run = (client, message, args) => {
    let user = message.mentions.users.first();
    let member = message.guild.member(user);
    let duration = args[1];
    let reason = args[2];

    if (!message.member.hasPermission('MANAGE_MESSAGES'))
        return message.channel.send(`${message.author.username}, you must have **Mod** or above to use this!`)
    if (!user)
        return message.channel.send(`${message.author.username}, please mention a user or put a valid ID!`)
    if (!reason)
        return message.channel.send(`${message.author.username}, please give a reason!`)
    if (!duration)
        return message.channel.send(`${message.author.username}, please specify a duration!`)

    member.ban(reason);
    message.channel.send(`${user} has been banned for ${ms(ms(duration))} for **${reason}**!`);
  
    let tempbanEmbed = new Discord.RichEmbed()
    .setTitle(`TEMPBAN`)
    .setColor("#90ee90")
    .addField("User Punished", `${user}`, true)
    .addField("Moderator", `${message.author}`, true)
    .addField("Reason", `${reason}`, true)
    .addField("Duration", `${ms(ms(duration))}`, true)
    .addField("Channel Punished", message.channel, true)
    .addField("User's ID", `${user.id}`, true)
    .setTimestamp(new Date());

    let logs = message.guild.channels.find("name", "mod-log");
    if (!logs)
        return message.reply("Invalid channel!");

    logs.send(tempbanEmbed);

    setTimeout(function () {
        member.guild.unban(`${user.id}`)
        let tempunbanEmbed = new Discord.RichEmbed()
        .setTitle(`UNBAN`)
        .setColor("#90ee90")
        .addField("User Unbanned", `${user}`, true)
        .addField("Moderator", `<@483740177819238401>`, true)
        .addField("Reason", "Ban Time Expired", true)
        .setTimestamp(new Date());

        logs.send(tempunbanEmbed);
    }, ms(duration));
  
}

exports.help = {
    name: "tempban"
}