const Discord = require("discord.js");
const ms = require("ms");

exports.run = (client, message, args) => {
    let options = ["factionleader"];
    let app = args[0];
    let name = args[1];
    let reason = message.content.split(' ').splice(3).join(' ');

    if (!app) return message.author.send("Please select a valid application type. Current types: 'factionleader'.")
    if (!name) return message.author.send("Please submit a valid faction name.")
    if (!reason) return message.author.send("Please submit the reasoning for why you should have the role.")

    if (!app === "factionleader") {
        message.author.send("Please select a valid application type. Current types: 'factionleader'.");
        return;
    }

    let applyEmbed = new Discord.RichEmbed()
    .setTitle(`New Application - ${message.author.tag}`)
    .setColor("#00FF00")
    .addField("User", `${message.author}`, true)
    .addField("Faction", `${name}`, true)
    .addField("Reason", `${reason}`, true)
    .setTimestamp(new Date());

    let logs = message.guild.channels.find("name", "log-test");
    if (!logs) return message.reply("Invalid Channel.")
    function embed() {
        logs.send(applyEmbed);
        setTimeout(function() {
            message.react("👍");
        }, ms("1s"));
        setTimeout(function() {
            message.react("👎");
        }, ms("2s"));
    }

    embed();


}

exports.help = {
    name: "apply"
}