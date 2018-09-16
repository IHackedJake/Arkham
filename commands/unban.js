// DUMBASS UNBAN COMMAND THAT STILLL WON'T WORK VYUSDIBUHFOJPSDUF9JM



const Discord = require("discord.js");
const ms = require("ms");

exports.run = (client, message, args) => {
    let user = message.mentions.users.first();
    let member = message.guild.member(user);

    if (!message.member.hasPermission('MANAGE_MESSAGES'))
        return message.channel.send(`${message.author.username}, you must have **Mod** or above to use this!`)
    if (!user)
        return message.channel.send(`${message.author.username}, please mention a user or put a valid ID!`)

    setTimeout(function() {
        member.guild.unban(`${user}`);
        message.channel.send(`${user} has been unbanned!`);
    
        let unbanEmbed = new Discord.RichEmbed()
        .setTitle(`UNBAN`)
        .setColor("#90ee90")
        .addField("User Unbanned", `${user}`, true)
        .addField("Moderator", `${message.author}`, true);

        let logs = message.guild.channels.find("name", "mod-log");
        if (!logs)
            return message.reply("Invalid channel!");
        logs.send(unbanEmbed);
    }, ms("1s"));
    
}

exports.help = {
    name: "unban"
}
