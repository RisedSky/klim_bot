module.exports = {
    help: { name: "liens" },
    run: async (call) => {
        //message, bot, bot.commands, args, content, prefix, cmd
        var Mess_Member = call.message.member
        const Discord = require("discord.js");

        await call.message.react("✅")

        var embed = new Discord.RichEmbed()
            .setAuthor(`Voici les différents liens de la KLIM.`, call.bot.user.avatarURL)
            .setDescription(`${call.bot.invisible_emote}\n` +
                `Sites officiels de KLIM Technologies.\n\n` +
                `[${call.bot.klimtechs} Site Web](https://www.klimtechs.com/?lang=fr)   |   [${call.bot.amazon} Amazon](http://bit.ly/KLIMAmzn)   |   [${call.bot.fb} Facebook](https://www.facebook.com/KLIMTechs)\n\n` +
                `[${call.bot.insta} Instagram](https://www.instagram.com/KLIMTechs/)   |   [${call.bot.twitter} Twitter](https://twitter.com/KLIMTechs)   |   [${call.bot.youtube} YouTube](https://www.youtube.com/channel/UC6Qauu_HRCSrZn0R6vg6PQQ)\n\n` +

                `Sites officiels de KLIM eSports.\n\n` +
                `[${call.bot.klimesports} Site Web](http://klimesports.com/)   |   [${call.bot.steam} Steam](https://steamcommunity.com/groups/KLIMTechs)   |   [${call.bot.twitter} Twitter](https://twitter.com/KLIMeSports)   |   [${call.bot.youtube} YouTube](https://www.youtube.com/channel/UC2yBhvwEygvP9DwIKK-3R-A)`)
            //   |   

            .setColor("GREEN");


        await call.message.author.createDM().then(async c => { await c.send(embed) })

        setTimeout(async () => {
            await call.message.delete()
        }, 2500);
    }
}