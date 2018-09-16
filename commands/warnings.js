const Discord = require("discord.js");
const Enmap = require("enmap");

exports.run = (client, message, args) => {
    const key = `${message.guild.id}-${message.author.id}`;
    let curWarn = client.warns.get(key, "warns");
    let user = message.mentions.users.first();

    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply("You must be **Helper** or higher to use this!")

    if (!user) return message.reply("Please enter a valid user/ID!")

    let warnEmbed = new Discord.RichEmbed()
    .setTitle(`Current Active Warnings For ${user.tag}`)
    .setColor("#FF0000")
    .setAuthor(client.user.username, client.user.avatarURL)
    .addField("Current Warnings", `${curWarn}`, true)
    .addField("User's ID", `${user.id}`, true);

    message.channel.send(warnEmbed);
}

exports.help = {
    name: "warnings"
}