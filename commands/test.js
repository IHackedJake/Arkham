const Discord = require("discord.js");

exports.run = (client, message, args) => {
    let testEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL)
    .setThumbnail(message.author.displayAvatarURL)
    .addField("Are you bad?", `${message.author}, you are bad.`)
    .setFooter(message.author.tag, message.author.displayAvatarURL);


    // message.author.displayAvatar

    message.channel.send(testEmbed);
}

exports.help = {
    name: "test"
}