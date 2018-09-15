const Discord = require("discord.js");
const Enmap = require("enmap");
const ms = require("ms");

exports.run = (client, message, args) => {
    const key = `${message.guild.id}-${message.author.id}`;
    let user = message.mentions.users.first();
    let member = message.guild.member(user);
    let reason = "Supporting Child Pornography";

    // 1st Offense - 7 Day Ban
    // 2nd Offense - Perm Ban

    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`${message.author.username}, you must be **Mod** or higher to use this!`)
    if (!user) return message.channel.send("Please enter a valid user/ID!")

    
}

exports.help = {
    name: "child"
}