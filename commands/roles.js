module.exports = {
    help: { name: "roles" },
    run: async (call) => {
        var Discord = require("discord.js")
            , pfx = call.bot.config.prefix;

        call.message.react("✅")

        var embed = new Discord.RichEmbed()
            //.setAuthor(`Les rôles vous permettrons d'accéder aux différents salons de vos jeux favoris.`, call.bot.user.avatarURL)
            .setAuthor(`Les commandes vous permettrons d'accéder aux différents salons de jeux.`, call.bot.user.avatarURL)
            //.setDescription(call.bot.invisible_emote + "\n")
            .setDescription(`${call.bot.invisible_emote}\nCounter-Strike : ${pfx} csgo     |     Call of Duty : ${pfx} cod\n\nRainbow Six Siège : ${pfx} r6s     |     Fortnite : ${pfx} ftn\n\nPlayerunknown's Battlegrounds : ${pfx} pubg     |     League of Legends : ${pfx} lol\n\nOverWatch : ${pfx} ow     |     World of WarCraft : ${pfx} wow\n\nHearthStone : ${pfx} hs`)
            //.addField("--------------------------", call.bot.rolesArray)
            
            /*
            .addField("Counter-Strike", `${pfx} csgo`, true)
            .addField("Counter-Strike", `${pfx} csgo`, true)
            .addBlankField()
            .addField("Counter-Strike", `${pfx} csgo`, true)
            .addField("Counter-Strike", `${pfx} csgo`, true)
            */

            .setColor("GREEN")
        call.message.channel.send(embed)

    }
}