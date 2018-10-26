module.exports = {
    help: { name: "react" },
    run: async (call) => {
        var Discord = require("discord.js")
            , pfx = call.bot.config.prefix
            , message = call.message

        if (!call.bot.admin_id.includes(call.message.member.id)) return message.delete()

        await call.message.react("✅")

        var embed = new Discord.RichEmbed()
            //.setAuthor(`Les rôles vous permettrons d'accéder aux différents salons de vos jeux favoris.`, call.bot.user.avatarURL)
            .setAuthor(`Utilisez les emotes pour vous donner/retirer votre jeu.`, call.bot.user.avatarURL)
            //.setDescription(call.bot.invisible_emote + "\n")
            
            /*.setDescription(`${call.bot.invisible_emote}\n` +
                `**__PÔLE BATTLE ROYALE :__**\n\n` +
                //:small_orange_diamond: 
                `${call.bot.fortnite} Section Fortnite\n\n` +
                `${call.bot.pubg} Section Playerunknown's Battlegrounds\n\n` +
                `${call.bot.bo4} Section Call of Duty Blackout\n\n\n` +

                `**__PÔLE FPS :__**\n\n` +
                `${call.bot.csgo} Section Counter-Strike\n\n` +
                `${call.bot.r6s} Section Rainbow Six Siège\n\n` +
                `${call.bot.ow} Section Overwatch\n\n\n` +

                `**__PÔLE MMOBA - SPORTS :__**\n\n` +
                `${call.bot.lol} Section League of Legends\n\n` +
                `${call.bot.dota2} Section Dota 2\n\n` +
                `${call.bot.rocket} Section Rocket League\n\n` +
                `${call.bot.fifa} Section FIFA\n\n`+
                `${call.bot.wow} Section World of Warcraft\n\n` +
                `${call.bot.hs} Section HearthStone\n\n`
                /*
                `Pôle Sport-Action :\n`+
                `:small_orange_diamond: Section Minecraft\n`+
                `:small_orange_diamond: Section Grand Theft Auto`)
                */

            //)
            .setColor("GREEN")
        //await call.message.channel.bulkDelete(100)
        setTimeout(async () => {
            await call.message.channel.send(embed).then(async msg => {
                await msg.react(call.bot.fortniteid)
                await msg.react(call.bot.pubgid)
                await msg.react(call.bot.bo4id)

                //FPS
                await msg.react(call.bot.csgoid)
                await msg.react(call.bot.r6sid)
                await msg.react(call.bot.owid)

                //MMO
                await msg.react(call.bot.lolid)
                await msg.react(call.bot.dota2id)

                //MOBA
                await msg.react(call.bot.rocketid)
                await msg.react(call.bot.fifaid)

                //SPORTS
                await msg.react(call.bot.wowid)
                await msg.react(call.bot.hsid)
            })
            await call.message.delete()
        }, 1500);
    }
}