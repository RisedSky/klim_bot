module.exports = {
    help: { name: "modohelp", aliases: ["modhelp", "ModoHelp", "ModHelp", "modohelps", "modhelps"] },
    run: async (call) => {
        //message, bot, bot.commands, args, content, prefix, cmd
        var Mess_Member = call.message.member
            , pfx = call.bot.config.prefix
        const Discord = require("discord.js");

        await call.message.react("✅")

        var embed = new Discord.RichEmbed()
            .setAuthor(`Voici les différentes commandes pour les modérateurs/modératrices.`, call.bot.user.avatarURL)
            .setDescription(`${call.bot.invisible_emote}\n` +
                `:warning: **ATTENTION, Merci d'utiliser les commandes via le bot __et non manuellement sous peine de sanctions__ ainsi que de placer ces dernières dans le salon <#496046633465675786>** :warning:\n\n${call.bot.invisible_emote}\n` +
                `:small_orange_diamond: Pour avertir un utilisateur :\n:arrow_right: **${pfx} warn "ID Utilisateur" "Raison"**\n\n` +
                `:small_orange_diamond: Pour expulser un utilisateur du serveur :\n:arrow_right: **${pfx} kick "ID Utilisateur" "Raison"**\n\n` +
                `:small_orange_diamond: Pour bannir un utilisateur du serveur :\n:arrow_right: **${pfx} ban "ID Utilisateur" "Raison"**\n\n` +
                //`Pour faire parler le bot (moi) :arrow_right: **${pfx} say Votre message tout beau**\n` +
                //`Pour faire un purge de tous les messages (100 en nombre de messages) :arrow_right: **${pfx} purge 100**\n` +
                `:small_orange_diamond: Pour faire un purge spécifique sur un utilisateur :\n:arrow_right: **${pfx} purge_user 100**\n\n` +
                `:small_orange_diamond: Pour déplacer le message d'un utilisateur vers un autre salon :\n:arrow_right: **${pfx} move_mess "ID Message" "#Salon"**\n:warning: Vous devez utiliser cette commande dans le même salon que le message à déplacer.\n\n` +
                `\n\n` +
                `:information_source: Pour activer le mode de développeur pour accéder aux IDs utilisateurs faites comme le gif :\n\`https://gyazo.com/7d6038b11873530303f7600b2543a3ab.gif\`\n\n` +
                `:information_source: Pour prendre l'ID d'un utilisateur veuillez suivre ce petit gif vous expliquant comment faire :\n\`https://gyazo.com/cc93be6a4129ee3c1259c6d919336ba5.gif\`\n\n` +
                `:information_source: Pour prendre l'ID d'un message veuillez suivre ce petit gif vous expliquant comment faire :\n\`https://gyazo.com/b9b13fdcd739163e530d948fea2d2d22.gif\`\n`)


            .setColor("RED");

        setTimeout(async () => {
            await call.message.delete()
        }, 10000);

        await call.message.author.createDM().then(async c => { await c.send(embed) })
    }
}