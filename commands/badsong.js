const Discord = require("discord.js");

exports.run = (client, message, args) => {
    let user = message.mentions.users.first();
    let member = message.guild.member(user);
    let reason = "Inappropriate Usage of teh Music Bots";
   
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply("You must be **Mod** or higher to use this!")
    if (!user) return message.reply("Please mention a valid user/ID!")

    message.channel.send(`${user} has been banned for 1 day for **Inappropriate Usage of the Music Bots**!`);
    user.send(`You have been temporarily banned for 1 day for **Inappropriate Usgae of the Music Bots**.`);
    member.ban(reason);

    // logs

    setTimeout(function() {
        member.guild.unban(`${user.id}`);
        // logs

    }, ms("1d"));

    message.channel.send("You can use this, congrats");
    
}

exports.help = {
    name: "badsong"
}
