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

            .setDescription(`${call.bot.invisible_emote}\n` +
                `Si vous êtes nouveau sur le **Discord KLIM**, vous aurez accès uniquement au département ${call.bot.klimtechs} **Technologies**, ${call.bot.klimesports} **eSports** ainsi que ${call.bot.klimcommunity} **Community**.\n\n` +
                `Afin que vous puissiez accéder aux différentes sections de jeux choisissez vos jeux en cliquant sur les **réactions**.\n\n` +
                `Vous aurez également à disposition des **salons privés** afin de vous permettre de discuter aisément avec vos amis.\n\n` +
                `Pour créer un salon privé il vous suffit de cliquer sur le salon vocal **"@créer-votre-salon-privé"** dans la section de jeu de votre choix.\n\n` +
                `:warning: Si votre jeu ne se trouve dans aucune des sections disponibles, allez dans la section **KLIM Community** rejoindre le salon vocal **"@autres-jeux"**, un salon privé sera automatiquement crée.\n\n` +
                `Une fois cela fait, vous allez avoir la permission de** muter** et de **bannir** les personnes dans votre salon.\n\n` +
                `:small_orange_diamond: Lorsque vous mutez quelqu'un avec le **"Serveur muet"**, le bot va détecter ce mute et va alors **kicker** la personne de votre salon.\n\n` +
                `:small_orange_diamond: Si cette personne en question revient dans votre salon, mutez le avec le **"Serveur sourd"**, il sera alors **"banni"** de votre salon jusqu'à sa suppression.\n\n` +
                `:small_orange_diamond: Vous pouvez également changer le nombre de slot si vous avez en avez l'envie en faisant clique droit sur votre salon puis **"modifier le salon"**.`
            )
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