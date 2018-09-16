const Discord = require("discord.js");
const ms = require("ms");
const Enmap = require("enmap");

exports.run = (client, message, args) => {

    const key = `${message.guild.id}-${message.author.id}`;
    let reason = message.content.split(' ').splice(2).join(' ');
    let server = args[0];
    let pollChannel = message.guild.channels.find("name", "polls");
    let serverList = ["skyblock", "skyblock1", "skyblock2", "prison", "factions", "skywars", "towny", "creative", "eco", "ecosurvival", "eco-survival", "kitpvp", "discord"];
    
    if (!message.member.hasPermission('ADMINISTRATOR'))
    return message.channel.send(`${message.author.username}, you must have **Admin** or above to use this!`)

    if (!reason) return message.author.send("Please submit a valid suggestion!") && message.delete()
    if (!server) return message.author.send("Please submit a valid server!") && message.delete()
    if(!serverList.some(word => message.content.includes(word))) return message.author.send("Please submit a valid server: skyblock, prison, factions, skywars, towny, creative, ecosurvival, kitpvp, discord") && message.delete()

    client.poll.set(key, {
        poll: reason,
        server: server
    });

    message.delete();

    let getPoll = client.poll.get(key, "poll");
    let getServer = client.poll.get(key, "server");

        let pollEmbed = new Discord.RichEmbed()
        .setColor("#006400")
        .addField("Suggestion For", `${getServer}`)
        .addField(`${message.author.tag}'s Poll`, `${getPoll}`)
        .setTimestamp(new Date());

       pollChannel.send(pollEmbed)

        .then(function(message) {
            setTimeout(function() {
                message.react("✅");
            }, ms("1s"));
            setTimeout(function() {
                message.react("🤷");
            }, ms("2s"));
            setTimeout(function() {
                message.react("❌");
            }, ms("3s"));
        }).catch(function() {
        });
}

exports.help = {
    name: "poll"
}