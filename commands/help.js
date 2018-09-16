const Discord = require("discord.js");

exports.run = (client, message, args) => {
    let helpEmbed = new Discord.RichEmbed()
    .setTitle("All Commands!")
    .setColor("#41ebf4")
    .addField("-apply", "Shows all of the Arkham application links!")
    .addField("-appeal", "Gives a link to submit discord and in-game punishments.")
    .addField("-buy", "Gives you the ArkhamNetwork webstore link!")
    .addField("-commands", "Shows this embed!")
    .addField("-forms", "Gives you a link to all the forms on the forums!")
    .addField("-forums", "Gives you a link to the ArkhamNetwork forums!")
    .addField("-report", "Gives you a link to player reports!")
    .addField("-rules", "Gives you a link to the server and discord rules!")
    .addField("-stafflist", "Gives you a link to the stafflist!")
    .addField("-vote", "Shows you all vote links!");

    message.channel.send(helpEmbed);
}

exports.help = {
    name: "help"
}