module.exports = {
    help: { name: "roles" },
    run: async (call) => {
        var Discord = require("discord.js")
            , pfx = call.bot.config.prefix;

        if (!call.bot.admin_id.includes(call.message.member.id)) return message.delete()

        await call.message.react("✅")

        var embed = new Discord.RichEmbed()
            //.setAuthor(`Les rôles vous permettrons d'accéder aux différents salons de vos jeux favoris.`, call.bot.user.avatarURL)
            .setAuthor(`Les commandes vous permettrons d'accéder aux différents salons de jeux.`, call.bot.user.avatarURL)
            //.setDescription(call.bot.invisible_emote + "\n")
            .setDescription(`${call.bot.invisible_emote}\n` +
                `**__Pôle Battle Royale :__**\n` +
                `:small_orange_diamond: Section Playerunknown's Battlegrounds :arrow_right: **${pfx} pubg**\n` +
                `:small_orange_diamond: Section Fortnite :arrow_right: **${pfx} ftn**\n` +
                `:small_orange_diamond: Section Call of Duty Blackout :arrow_right: **${pfx} cod**\n\n` +

                `**__Pôle FPS :__**\n` +
                `:small_orange_diamond: Section Counter-Strike :arrow_right: **${pfx} cs**\n` +
                `:small_orange_diamond: Section Rainbow Six Siège :arrow_right: **${pfx} r6s**\n` +
                `:small_orange_diamond: Section Overwatch :arrow_right: **${pfx} ow**\n\n` +

                `**__Pôle MMOBA - Sports :__**\n` +
                `:small_orange_diamond: Section World of Warcraft & HearthStone :arrow_right: **${pfx} wow** - **${pfx} hs**\n` +
                `:small_orange_diamond: Section League of Legends :arrow_right: **${pfx} lol**\n` +
                `:small_orange_diamond: Section Dota 2 :arrow_right: **${pfx} d2**\n` +
                `:small_orange_diamond: Section Rocket League & FIFA :arrow_right: **${pfx} rl** - **${pfx} fifa**\n`
                /*
                `Pôle Sport-Action :\n`+
                `:small_orange_diamond: Section Minecraft :arrow_right: **${pfx} mc**\n`+
                `:small_orange_diamond: Section Grand Theft Auto :arrow_right: **${pfx} gta**`)
                */

            )
            .setColor("GREEN")
        //await call.message.channel.bulkDelete(100)
        setTimeout(async () => {
            await call.message.channel.send(embed)
            await call.message.delete()
        }, 2500);

    }
}