const Discord = require("discord.js");

exports.run = (client, message, args) => {
    let rolesEmbed = new Discord.RichEmbed()
        .setDescription("All the permissions each role has!")
        .setColor("blue")
        .addField("Helper", ">warn | >kick | >tempmute | >hist")
        .addField("Mod", ">ban | >tempban | >unmute")
        .addField("Senior Mod", ">slowmode")
        .addField("Admin", ">mute");

    message.channel.send(rolesEmbed);
}

exports.help = {
    name: "permissions"
}