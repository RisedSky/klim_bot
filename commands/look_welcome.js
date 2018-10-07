module.exports = {
    help: { name: "look_welcome" },
    run: async (call) => {
        //message, bot, bot.commands, args, content, prefix, cmd
        var pfx = await call.bot.config.prefix
            , message = await call.message
        const Discord = await require("discord.js");

        if (!message.member.id == "239887147765727232") return;

        await call.message.react("✅")
        await message.delete()
        var usr = message.member
        let embed_welcome = new Discord.RichEmbed()
            .setColor("GREEN")
            .setAuthor(`Bienvenue sur le serveur discord KLIM !`, call.bot.avatarURL)
            .setDescription(`Avant toute chose merci de lire ce message, puis ensuite d'aller lire le <#364687962916651010>\n${call.bot.invisible_emote}`)
            .addField(`Pour accéder à vos salons favoris.`, `:small_orange_diamond: Faites la commande : **${call.bot.config.prefix} roles** dans le salon <#453483219770277888> cela va vous permettre d'accéder à vos différentes sections de jeux.`)
            .addField(`${call.bot.invisible_emote}\nLes salons vocaux privés de KLIM.`, `:small_orange_diamond: Vous avez accès à des salons privés sur notre serveur discord.\n` +
                `Avec ces salons vous allez pouvoir communiquer avec des personnes ou avec vos amis directement sur le serveur officiel de KLIM!\n\n` +
                ":small_orange_diamond: Rejoignez le salon \"créer votre salon privé\" de votre section de jeu, attendez quelques secondes et le tour est joué !\n\n" +
                `:information_source: Notez que vous allez avoir la permission de kicker ou bannir les personnes ** de votre salon **.\n\n` +
                `**Voici quelques points sur ces permissions **: \n` +
                `:small_orange_diamond: Lorsque vous mutez quelqu'un avec le "Serveur muet" ("Server Mute"), le bot va détecter ce mute et va alors kicker la personne **de votre salon**.\n ` +
                `:small_orange_diamond: Si cette personne en question revient dans votre salon, mutez le avec le "Serveur sourd" ("Server Deafen"), il sera alors "banni" de votre salon **jusqu'à sa suppression**.\n\n` +
                "*A savoir que votre salon privé sera supprimé dans un délai de 05 minutes si aucune personne n'y est présente.*")
        //.addBlankField()
        usr.createDM()
            .then(async c => {
                console.log("Envoyé!");
                await c.send(embed_welcome)
            })
            .catch(async e => {
                await console.log(`Impossible de DM ${usr.tag}`);
                await console.log(e)
            })

    }
}