const Discord = require("discord.js");
const Enmap = require("enmap");

exports.run = (client, message, args) => {

    const key = `${message.guild.id}-${message.author.id}`;
    let status = client.toggle.get(key, "toggle");

    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply("You must be **Admin/Discord Mod** or higher to use this!")

    if (!args[0]) {
        message.channel.send(`The filter is currently **${status}**.`);
        return;
    } else {
        client.toggle.set(key, {
            toggle: args[0]
        });
    
        message.channel.send(`Filter has been toggled to: **${args[0]}**.`);
    }
}

exports.help = {
    name: "filter"
}