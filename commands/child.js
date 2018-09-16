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

    
    let curOff = client.child.get(key, "child");
    if (curOff === 0) {
        client.child.inc(key, "child");
        message.channel.send(`**[BAN]** ${user.tag} has been temporarily banned for 7 days for **Supporting Child Pornography**!`);
        let childEmbed = new Discord.RichEmbed()
        .setTitle(`BAN - ${user.tag}`)
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setColor("#006400")
        .addField("User Punished", `${user}`, true)
        .addField("Moderator", `${message.author}`, true)
        .addField("Reason", "Supporting Child Porn", true)
        .addField("Channel Punished", message.channel, true)
        .addField("Current Offense", "1st", true)
        .addField("User's ID", `${user.id}`, true)
        .addField("Duration", "7 Days", true)
        .setTimestamp(new Date());

        let logs = message.guild.channels.find("name", "mod-log");
        if (!logs) return message.reply("Invalid Channel!");
        logs.send(childEmbed);

        member.ban(reason);

        setTimeout(function() {
            member.guild.unban(`${user.id}`);
            let unbanEmbed = new Discord.RichEmbed()
            .setTitle(`UNBAN - ${user.tag}`)
            .setColor("#006400")
            .addField("User Unbanned", `${user}`, true)
            .addField("Reason", "Ban Time Expired", true);

            logs.send(unbanEmbed);
        }), ms("7d");
    } else if (curOff === 1) {
        client.child.inc(key, "child");
        message.channel.send(`**[BAN]** ${user.tag} has been temporarily banned for **Supporting Child Pornography**!`);
        let childEmbed = new Discord.RichEmbed()
        .setTitle(`BAN - ${user.tag}`)
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setColor("#006400")
        .addField("User Punished", `${user}`, true)
        .addField("Moderator", `${message.author}`, true)
        .addField("Reason", "Supporting Child Porn", true)
        .addField("Channel Punished", message.channel, true)
        .addField("Current Offense", "1st", true)
        .addField("User's ID", `${user.id}`, true)
        .addField("Duration", "Permanent", true)
        .setTimestamp(new Date());

        let logs = message.guild.channels.find("name", "mod-log");
        if (!logs) return message.reply("Invalid Channel!");
        logs.send(childEmbed);

        member.ban(reason);
    }
}

exports.help = {
    name: "child"
}