const Discord = require("discord.js");

exports.run = (client, message, args) => {
    let syncEmbed = new Discord.RichEmbed()
    .setTitle("How to sync your account!")
    .setColor("blue")
    .setDescription("By syncing your account, you will recieve the donator rank you have in game here on discord.")
    .addField("1. Syncing your forums account", "The first step in obtaining your donator rank on discord is to sync your in-game account to your forum account. To do this, simply run /syncaccount while in-game and click on the message prompt in chat. You will be able to verify that your in-game account has synced to your forum account by going onto your profile page. On there, you should notice your donator rank tag/ title and a unique donator rank banner for your rank. ")
    .addField("2. Discord Integration", "The next step to obtaining your donator rank is to associate your forum account to your discord account. To do this, go to the 'External Accounts' setting on your forums account (http://arkhamnetwork.org/community/account/external-accounts). Click on the 'Associate with Discord' button then sign into your discord account. Once you have done this, you will be asked to allow ArkhamNetwork to be able to access certain information about you, such as your email address and what discord servers your're in. If you are ready to allow it to do so, click the 'Authorize' button.")

    message.channel.send(syncEmbed);
}

exports.help = {
    name: "sync"
}