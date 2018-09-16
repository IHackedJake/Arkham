const Discord = require("discord.js");
const Enmap = require("enmap");

exports.run = (client, message, args) => {
    let user = message.mentions.users.first();
    let member = message.guild.member(user);
    let key = `${message.guild.id}-${message.author.id}`;

    if (!message.member.hasPermission('MANAGE_MESSAGES'))
    return message.channel.send(`${message.author.username}, you must have **Mod** or above to use this!`)

    if (!user) return message.channel.send("Please mention a valid user!");

    client.hist.set(key, {
        ads: 0,
        racism: 0
    });

    client.warns.set(key, {
        warns: 0
    });

    message.channel.send(`${user} has been reset!`);
}

exports.help = {
    name: "clear"
}