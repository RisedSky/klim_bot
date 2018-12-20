module.exports = {
    help: { name: "look_welcome" },
    run: async (call) => {
        //message, bot, bot.commands, args, content, prefix, cmd
        var pfx = await call.bot.config.prefix
            , message = await call.message
        const Discord = require("discord.js");

        if (!call.bot.admin_id.includes(call.message.member.id)) return message.delete()

        await call.message.react("✅")
        message.delete(2500)
        var usr = message.member
        let embed_welcome = new Discord.RichEmbed()
            .setColor("GREEN")
            .setAuthor(`Bienvenue sur le serveur discord KLIM !`, call.bot.avatarURL)
            .setDescription(`Avant toute chose merci de lire ce message, puis ensuite d'aller lire le <#364687962916651010>\n${bot.invisible_emote}`)
            //.addField(`Pour accéder à vos salons favoris.`, `:small_orange_diamond: Allez dans le salon <#453483219770277888>, puis réagissez avec les réactions, cela va vous permettre d'accéder à vos différentes sections de jeux.\n${bot.invisible_emote}`)
            .addField(`Les salons vocaux privés de KLIM.`, `:small_orange_diamond: Vous avez accès à des salons privés sur notre serveur discord.\n` +
                `Avec ces salons vous allez pouvoir communiquer avec des personnes ou avec vos amis directement sur le serveur officiel de KLIM!\n\n` +
                `:small_orange_diamond: Rejoignez le salon "créer-votre-salon-privé" de votre section de jeu, attendez quelques secondes et le tour est joué !\n${call.bot.invisible_emote}\n\n` +
                `:warning: Si votre jeu ne se trouve dans aucune des sections disponibles, allez dans la section "KLIM eSport" rejoindre "autres-jeux", un salon privé sera automatiquement crée.\n${call.bot.invisible_emote}`)

            .addField(`:information_source: Notez que vous allez avoir la permission de kicker ou bannir les personnes ainsi que de modifier **votre salon**.`, //\n\n
                `${call.bot.invisible_emote}\n**Voici quelques points sur ces permissions **: \n` +
                `:small_orange_diamond: Lorsque vous mutez quelqu'un avec le "Serveur muet" ("Server Mute"), le bot va détecter ce mute et va alors kicker la personne **de votre salon**.\n\n` +
                `:small_orange_diamond: Si cette personne en question revient dans votre salon, mutez le avec le "Serveur sourd" ("Server Deafen"), il sera alors "banni" de votre salon **jusqu'à sa suppression**.\n\n` +
                `:small_orange_diamond: Vous pouvez changer le nombre de slot si vous en avez l'envie en faisant clique droit (sur votre salon) puis "modifier le salon".\n` +
                "*A savoir que votre salon privé sera supprimé dans un délai de 05 minutes si aucune personne n'y est présente.*")
        //.addBlankField()
        usr.createDM()
            .then(async c => {
                console.log("Envoyé!");
                await c.send(embed_welcome)
            })
            .catch(async e => {
                console.log(`Impossible de DM ${usr.tag}`);
                console.log(e)
            })

    }
}