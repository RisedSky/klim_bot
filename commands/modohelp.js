module.exports = {
    help: { name: "modohelp", aliases: ["modhelp", "ModoHelp", "ModHelp", "modohelps", "modhelps", "modo_help"] },
    run: async (call) => {
        //message, bot, bot.commands, args, content, prefix, cmd
        var Mess_Member = call.message.member
            , pfx = call.bot.config.prefix
        const Discord = require("discord.js");

        
        if (!call.bot.admin_id.includes(call.message.author.id)) {
            return call.message.reply("Vous n'avez la permission de faire cela.")
                .then(async msg => {
                    await msg.delete(6000)
                })
        }
        await call.message.react("✅")

        var embed_modo = new Discord.RichEmbed()
            .setAuthor(`Voici les différentes commandes pour les modérateurs/modératrices.`, call.bot.user.avatarURL)
            .setDescription(`${call.bot.invisible_emote}\n` +
                //`:warning: **ATTENTION, Merci d'utiliser les commandes via le bot __et non manuellement sous peine de sanctions__ ainsi que de placer ces dernières dans le salon <#496046633465675786>** :warning:\n\n${call.bot.invisible_emote}\n` +
                `Pour avertir un utilisateur :\n` +
                `:small_orange_diamond: **${pfx} warn "ID Utilisateur" "Raison"**\n\n\n` +

                `Pour expulser un utilisateur du serveur :\n` +
                `:small_orange_diamond: **${pfx} kick "ID Utilisateur" "Raison"**\n\n\n` +

                `Pour bannir un utilisateur du serveur :\n` +
                `:small_orange_diamond: **${pfx} ban "ID Utilisateur" "Raison"**\n\n\n` +

                //`Pour faire parler le bot (moi) ****${pfx} say Votre message tout beau**\n` +
                //`Pour faire un purge de tous les messages (100 en nombre de messages) **** **${pfx} purge 100**\n` +

                `Pour faire un purge spécifique sur un utilisateur :\n` +
                `:small_orange_diamond: **${pfx} purge_user @user 100**\n\n\n` +

                `Pour déplacer le message d'un utilisateur vers un autre salon :\n` +
                `:small_orange_diamond: **${pfx} move_mess "ID Message" "#Salon"**\n` +
                `:warning: Vous devez utiliser cette commande dans le même salon que le message à déplacer.\n\n` +
                `\n\n` +
                `:information_source: [Pour activer le mode de développeur pour accéder aux IDs utilisateurs](https://gyazo.com/7d6038b11873530303f7600b2543a3ab.gif)\n\n` +
                `:information_source: [Pour prendre l'ID d'un utilisateur](https://gyazo.com/cc93be6a4129ee3c1259c6d919336ba5.gif)\n\n` +
                `:information_source: [Pour prendre l'ID d'un message](https://gyazo.com/b9b13fdcd739163e530d948fea2d2d22.gif)\n`
            )
            .setColor("RED");


        var embed_anim = new Discord.RichEmbed()
            .setAuthor(`Voici les différentes commandes pour les animateurs et responsables de sections.`, call.bot.user.avatarURL)
            .setDescription(`${call.bot.invisible_emote}\n` +
                //`:warning: **ATTENTION, Merci d'utiliser les commandes via le bot __et non manuellement sous peine de sanctions__ ainsi que de placer ces dernières dans le salon <#496046633465675786>** :warning:\n\n${call.bot.invisible_emote}\n` +
                `Pour donner aux utilisateurs mentionnés d'avoir le rôle Tournois :\n` +
                `:small_orange_diamond: **${pfx} tournoi @user**\n\n` +

                `Pour enlever à tous les utilisateurs le rôle Tournois :\n` +
                `:small_orange_diamond: **${pfx} tournoi_end**`
            )
            .setColor("GREEN");

        setTimeout(async () => {
            await call.message.delete()
        }, 10000);

        //await call.message.author.createDM().then(async c => { await c.send(embed_modo) })
        await call.message.channel.send(embed_modo)
        await call.message.channel.send(embed_anim)
    }
}