const Discord = require("discord.js");

exports.run = (client, message, args) => {

    let applyEmbed = new Discord.RichEmbed()
    .setDescription("Arkham Application Links!")
    .setColor("#35a8dd")
    .addField("Staff Application", "http://arkhamnetwork.org/staff/")
    .addField("YouTuber Application", "http://arkhamnetwork.org/community/forums/youtuber-applications.70/")
    .addField("Builder Application", "http://arkhamnetwork.org/community/forums/builder-applications.117/")
    .addField("Discord DJ Application", "N/A");
    return message.channel.send(applyEmbed);




}    


exports.help = {
    name: "apply"
}