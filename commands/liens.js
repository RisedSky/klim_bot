module.exports = {
    help: { name: "liens" },
    run: async (call) => {
        //message, bot, bot.commands, args, content, prefix, cmd
        var Mess_Member = call.message.member
        const Discord = require("discord.js");

        await call.message.react("✅")

        var embed = new Discord.RichEmbed()
            .setAuthor(`Voici les différents liens de la KLIM.`, call.bot.user.avatarURL)
            .setDescription(`${call.bot.invisible_emote}\n` + `Sites officiels de KLIM Technologies.\n\n` +
                `[Site Web](https://www.klimtechs.com/?lang=fr)   |   [Amazon](http://bit.ly/KLIMAmzn)   |   [Facebook](https://www.facebook.com/KLIMTechs)   |   [Instagram](https://www.instagram.com/KLIMTechs/)   |   [Twitter](https://twitter.com/KLIMTechs)   |   [YouTube](https://www.youtube.com/channel/UC6Qauu_HRCSrZn0R6vg6PQQ)` +
                `\n\n\nSites officiels de KLIM eSports.\n\n[Site Web](http://klimesports.com/)   |   [Twitter](https://twitter.com/KLIMeSports)   |   [YouTube](https://www.youtube.com/channel/UC2yBhvwEygvP9DwIKK-3R-A)   |   [Steam](https://steamcommunity.com/groups/KLIMTechs)`)


            .setColor("GREEN");


        await call.message.author.createDM().then(async c => { await c.send(embed) })

        setTimeout(async () => {
            await message.delete()
        }, 2500);
    }
}