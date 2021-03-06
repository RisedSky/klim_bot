module.exports = {
    help: { name: "salons", aliases: ["channels"] },
    run: async (call) => {
        //message, bot, bot.commands, args, content, prefix, cmd
        const Discord = require("discord.js")


        await call.message.react("✅")

        /*
        await call.message.author.createDM().then(async c => {
            await c.send(
                "Comment créer votre propre salon privé ?\n\nRien de plus simple !\n" +
                "Rejoignez le salon \"créer votre salon privé\" de votre section de jeu, attendez quelques secondes et le tour est joué !\n\n" +
                `:information_source: Notez que vous allez avoir la permission de kicker ou bannir les personnes **de votre salon**.\n\n**Voici quelques points sur ces permissions**: \nLorsque vous mutez quelqu'un avec le "Serveur muet" ("Server Mute"), le bot va détecter ce mute et va alors kicker la personne **de votre salon**.\nSi cette personne en question revient dans votre salon, mutez le avec le "Serveur sourd" ("Server Deafen"), il sera alors "banni" de votre salon **jusqu'à sa suppression**.\n\n` +
                "*A savoir que votre salon privé sera supprimé dans un délai de 5 minutes si aucune personne y est présente.*\n\n"
            )
        })
        */


        var embed_salons = new Discord.RichEmbed()
            .setColor("GREEN")
            .setAuthor("Comment créer votre propre salon privé ?", call.bot.user.avatarURL)
            .setDescription(`${call.bot.invisible_emote}\n` +
                `:small_orange_diamond: Rejoignez le salon \"créer-votre-salon-privé\" de votre section de jeu, attendez quelques secondes et le tour est joué !\n\n` +
                `:warning: Si votre jeu ne se trouve dans aucune des sections disponibles, allez dans la section "KLIM eSport" rejoindre "autres-jeux", un salon privé sera automatiquement crée.\n${call.bot.invisible_emote}`)
            .addField(`:information_source: Notez que vous allez avoir la permission de kicker ou bannir les personnes ainsi que de modifier **votre salon**.\n`, //\n\n
                `${call.bot.invisible_emote}\n**Voici quelques points sur ces permissions **: \n` +
                `:small_orange_diamond: Lorsque vous mutez quelqu'un avec le "Serveur muet" ("Server Mute"), le bot va détecter ce mute et va alors kicker la personne **de votre salon**.\n\n` +
                `:small_orange_diamond: Si cette personne en question revient dans votre salon, mutez le avec le "Serveur sourd" ("Server Deafen"), il sera alors "banni" de votre salon **jusqu'à sa suppression**.\n\n` +
                `:small_orange_diamond: Vous pouvez changer le nombre de slot si vous en avez l'envie en faisant clique droit (sur votre salon) puis "modifier le salon".\n` +
                "*A savoir que votre salon privé sera supprimé dans un délai de 05 minutes si aucune personne n'y est présente.*")
        /*
        `:information_source: Notez que vous allez avoir la permission de kicker ou bannir les personnes **de votre salon**.\n\n ` +
        `**Voici quelques points sur ces permissions**: \n` +
        `:small_orange_diamond: Lorsque vous mutez quelqu'un avec le "Serveur muet" ("Server Mute"), le bot va détecter ce mute et va alors kicker la personne **de votre salon**.\n ` +
        `:small_orange_diamond: Si cette personne en question revient dans votre salon, mutez le avec le "Serveur sourd" ("Server Deafen"), il sera alors "banni" de votre salon **jusqu'à sa suppression**.\n\n` +
        "*A savoir que votre salon privé sera supprimé dans un délai de 5 minutes si aucune personne n'y est présente.*"
        */

        await call.message.author.createDM().then(async c => { c.send(embed_salons) })

        setTimeout(async () => {
            await call.message.delete()
        }, 2500);
    }
}