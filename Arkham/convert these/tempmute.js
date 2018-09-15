const Discord = require("discord.js");
const ms = require("ms");

exports.run = (client, message, args) => {
    let user = message.mentions.users.first();
    let member = message.guild.member(user);
    let duration = args[1];
    let reason = args[2];
    let mutedRole = message.guild.roles.find(`name`, "Muted");

    if (!message.member.hasPermission('MANAGE_MESSAGES'))
        return message.channel.send(`${message.author.username}, you must have **Helper** or above to use this!`)
    if (!user)
        return message.channel.send(`${message.author.username}, please mention a user or put a valid ID!`)
    if (!reason)
        return message.channel.send(`${message.author.username}, please give a reason!`)
    if (!duration)
        return message.channel.send(`${message.author.username}, please specify a duration!`)

    member.addRole(mutedRole);
    message.channel.send(`${user} has been muted for ${ms(ms(duration))} for **${reason}**!`);
    user.send(`You have been muted for ${ms(ms(duration))} for ${reason}!`);
  
    let tempmuteEmbed = new Discord.RichEmbed()
    .setTitle(`TEMPMUTE`)
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

    logs.send(tempmuteEmbed);

    setTimeout(function () {
        member.removeRole(mutedRole);
        let unmuteEmbed = new Discord.RichEmbed()
        .setTitle(`UNMUTE`)
        .setColor("#90ee90")
        .addField("User Unmuted", `${user}`, true)
        .addField("Moderator", `<@483740177819238401>`, true)
        .addField("Reason", "Mute Time Expired", true)
        .setTimestamp(new Date());

        logs.send(unmuteEmbed);
    }, ms(duration));
  
}

exports.help = {
    name: "tempmute"
}