const Discord = require("discord.js");

exports.run = (client, message, args) => {
    
    message.channel.send(`Hey, ${message.author.username}\n\n__Appeal Link__\nLink`);



}    


exports.help = {
    name: "appeal"
}