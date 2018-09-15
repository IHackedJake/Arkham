const Discord = require("discord.js");
const Enmap = require("enmap");
const ms = require("ms");

exports.run = (client, message, args) => {
    let user = message.mentions.users.first();
    let member = message.guild.member(user);
    let mutedRole = message.guild.roles.find("name", "Muted");
    let key = `${message.guild.id}-${message.author.id}`;
    let curOff = client.hist.get(key, "racism");

    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`${message.author.username}, you must have **Helper** or higher to use this!`)

    if (!user) return message.channel.send("Please enter a valid user/ID!")

    // 1st Offense - Warning

    if (curOff === 0) {
        client.hist.inc(key, "racism");
        client.warns.inc(key, "warns");
        message.channel.send(`**[WARN]** ${user.tag} has been warned for **Racism/Disrespect**!`);
        user.send(`You have been warned for **Racism/Disrespect**.`);
        let warnEmbed = new Discord.RichEmbed()
        .setTitle(`[WARN] - ${user.tag}`)
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor("#6aaf6a")
        .addField("User Punished", `${user}`, true)
        .addField("Moderator", `${message.author}`, true)
        .addField("Reason", "Racism/Disrespect", true)
        .addField("Channel Punished", message.channel, true)
        .addField("Current Offense", "1st", true)
        .addField("User's ID", `${user.id}`, true)
        .setTimestamp(new Date());

        let logs = message.guild.channels.find("name", "log-test");
        if (!logs) return message.reply("Invalid Channel.")
        logs.send(warnEmbed);

        setTimeout(function() {
            client.hist.set(key, {
                racism: 0
            });
        }, ms("1d"));

        setTimeout(function() {
            client.warns.math(key, "-", 1, "warns");
          }, ms("7d"));

        return;

        // 2nd Offense - 30 Minute Mute

    } else if (curOff === 1) {
        client.hist.inc(key, "racism");
        message.channel.send(`**[TEMP MUTE]** ${user.tag} has been temporarily muted for 30 minutes for **Racism/Disrespect**!`);
        user.send(`You have been temporarily muted for 30 minutes for **Racism/Disrespect**.`);
        member.addRole(mutedRole);
        let tmuteEmbed = new Discord.RichEmbed()
        .setTitle(`[TEMP MUTE] - ${user.tag}`)
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor("#6aaf6a")
        .addField("User Punished", `${user}`, true)
        .addField("Moderator", `${message.author}`, true)
        .addField("Reason", "Racism/Disrespect", true)
        .addField("Channel Punished", message.channel, true)
        .addField("User's ID", `${user.id}`, true)
        .addField("Duration", "30 Minutes", true)
        .setTimestamp(new Date());

        let logs = message.guild.channels.find("name", "log-test");
        if (!logs) return message.reply("Invalid Channel.")
        logs.send(tmuteEmbed);

        setTimeout(function() {
            member.removeRole(mutedRole);
            let unmuteEmbed = new Discord.RichEmbed()
            .setTitle(`[UNMUTE] - ${user.tag}`)
            .setColor("#6aaf6a")
            .addField("Moderator", `<@483740177819238401>`, true)
            .addField("Reason", "Mute Time Expired", true)
            .setTimestamp(new Date());

            logs.send(unmuteEmbed);
        }, ms("30m"));

        return;

        // 3rd Offense - 1 Hour Mute

    } else if (curOff === 2) {
        client.hist.inc(key, "racism");
        message.channel.send(`**[TEMP MUTE]** ${user.tag} has been temporarily muted for 1 hour for **Racism/Disrespect**!`);
        user.send(`You have been temporarily muted for 1 hour for **Racism/Disrespect**.`);
        member.addRole(mutedRole);
        let tmuteEmbed = new Discord.RichEmbed()
        .setTitle(`[TEMP MUTE] - ${user.tag}`)
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor("#6aaf6a")
        .addField("User Punished", `${user}`, true)
        .addField("Moderator", `${message.author}`, true)
        .addField("Reason", "Racism/Disrespect", true)
        .addField("Channel Punished", message.channel, true)
        .addField("User's ID", `${user.id}`, true)
        .addField("Duration", "1 hour", true)
        .setTimestamp(new Date());

        let logs = message.guild.channels.find("name", "log-test");
        if (!logs) return message.reply("Invalid Channel.")
        logs.send(tmuteEmbed);

        setTimeout(function() {
            member.removeRole(mutedRole);
            let unmuteEmbed = new Discord.RichEmbed()
            .setTitle(`[UNMUTE] - ${user.tag}`)
            .setColor("#6aaf6a")
            .addField("Moderator", `<@483740177819238401>`, true)
            .addField("Reason", "Mute Time Expired", true)
            .setTimestamp(new Date());

            logs.send(unmuteEmbed);
        }, ms("1h"));

        return;

        // 4th Offense - 1 Day Mute

    } else if (curOff === 3) {
        client.hist.inc(key, "racism");
        message.channel.send(`**[TEMP MUTE]** ${user.tag} has been temporarily muted for 1 day for **Racism/Disrespect**!`);
        user.send(`You have been temporarily muted for 1 day for **Racism/Disrespect**.`);
        member.addRole(mutedRole);
        let tmuteEmbed = new Discord.RichEmbed()
        .setTitle(`[TEMP MUTE] - ${user.tag}`)
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor("#6aaf6a")
        .addField("User Punished", `${user}`, true)
        .addField("Moderator", `${message.author}`, true)
        .addField("Reason", "Racism/Disrespect", true)
        .addField("Channel Punished", message.channel, true)
        .addField("User's ID", `${user.id}`, true)
        .addField("Duration", "1 day", true)
        .setTimestamp(new Date());

        let logs = message.guild.channels.find("name", "log-test");
        if (!logs) return message.reply("Invalid Channel.")
        logs.send(tmuteEmbed);

        setTimeout(function() {
            member.removeRole(mutedRole);
            let unmuteEmbed = new Discord.RichEmbed()
            .setTitle(`[UNMUTE] - ${user.tag}`)
            .setColor("#6aaf6a")
            .addField("Moderator", `<@483740177819238401>`, true)
            .addField("Reason", "Mute Time Expired", true)
            .setTimestamp(new Date());

            logs.send(unmuteEmbed);
        }, ms("1d"));

        return;
    }

}

exports.help = {
    name: "racism"
}