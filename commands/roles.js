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
            .setDescription(`${call.bot.invisible_emote}\nPôle Battle Royale :\n:small_orange_diamond: Section Fortnite :arrow_right: ${pfx} ftn\n:small_orange_diamond: Section Playerunknown's Battlegrounds :arrow_right: ${pfx} pubg\n\nPôle FPS :\n:small_orange_diamond: Section Counter-Strike :arrow_right: ${pfx} csgo\n:small_orange_diamond: Section Call of Duty :arrow_right: ${pfx} cod\n:small_orange_diamond: Section Rainbow Six Siège :arrow_right: ${pfx} r6s\n\nPôle MMO-MOBA : \n:small_orange_diamond: Section League of Legends :arrow_right: ${pfx} lol\n:small_orange_diamond: Section Overwatch :arrow_right: ${pfx} ow\n:small_orange_diamond: Section World of Warcraft :arrow_right: ${pfx} wow\n:small_orange_diamond: Section HearthStone :arrow_right: ${pfx} hs`)

            .setColor("GREEN")
        call.message.channel.send(embed)

    }
}