const Discord = require("discord.js");
const Enmap = require("enmap");

exports.run = (client, message, args) => {
    const key = `${message.guild.id}-${message.author.id}`;
    let user = message.mentions.users.first();
    let curWarns = client.warns.get(key, "warns");

    if (curWarns === 0) return message.reply("Unable to unwarn player due to them not having any current active warnings.")
    if (!user) return message.reply("Please mention a valid user/ID!")
    if (!args[1]) return message.reply("Please submit a valid amount of warnings to remove!")

    client.warns.math(key, "-", args[1], "warns");

    message.channel.send(`${user.tag} has had **${args[1]}** warnings removed.`);

}

exports.help = {
    name: "unwarn"
}