const Discord = require("discord.js");

exports.run = (client, message, args) => {

    if (!message.member.hasPermission('MANAGE_MESSAGES'))
    return message.channel.send(`${message.author.username}, you must have **Mod** or above to use this!`)
    let name = message.author.username;
    let chanName = name + "'s ticket";
    let guild = message.guild;
    guild.createChannel(chanName, "text");
    message.channel.send(`Channel created! **${chanName}**!`);

} 

exports.help = {
    name: "support"
}