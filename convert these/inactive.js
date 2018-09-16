const Discord = require("discord.js");
const ms = require("ms");

exports.run = (client, message, args) => {
    let duration = args[0];
    let reason = args[1];
    let user = message.mentions.users.first();
    let member = message.guild.member(user);
    let role = message.guild.roles.find("name", "Inactive");
    
    if (!duration) return message.channel.send("Please specify a duration!")
    if (!reason) return message.channel.send("Please specify a reason!")

    message.channel.send(`${message.author}, you have successfully submitted an inactivity form for **${duration}**!`);

    message.member.addRole(role);

    let inactiveEmbed = new Discord.RichEmbed()
    .setTitle(`New Inactivity Form Submitted!`)
    .setColor("#0000FF")
    .addField("User", `${message.author}`, true)
    .addField("Duration", `${duration}`, true)
    .addField("Reason", `${reason}`, true);

    let logs = message.guild.channels.find(`name`, "inactivity-log");
                if (!logs)
                    return message.reply("Inavlid Channel.");
    
    logs.send(inactiveEmbed);

    setTimeout(function () {
        message.member.removeRole(role);
        messge.channel.send(`${message.author}, your inactivity notice is up! Your **Inactive** role has been removed.`);
    }, ms(duration));
}

exports.help = {
    name: "inactive"
}