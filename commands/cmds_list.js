module.exports = {
    help: { name: "cmds_list" },
    run: async (call) => {
        var Discord = require("discord.js")
            , pfx = call.bot.config.prefix
            , message = call.message

        if (!call.bot.admin_id.includes(call.message.member.id)) return message.delete()

        await call.message.react("✅")

        var embed_song_cmds = new Discord.RichEmbed()
            .setAuthor(`Liste des commandes pour la musique.`, call.bot.user.avatarURL)
            .setDescription(`${call.bot.invisible_emote}\n` +
                `Pour mettre une musique :\n` +
                `:small_orange_diamond: **${pfx} play "lien ou nom de la musique"**\n\n\n` +

                `Pour mettre une playlist :\n` +
                `:small_orange_diamond: **${pfx} play "lien de la playlist"**\n\n\n` +

                `Pour chercher une musique :\n` +
                `:small_orange_diamond: **${pfx} search "nom de la musique"**\n\n\n` +

                `Pour mettre en pause/reprendre la musiique :\n` +
                `:small_orange_diamond: **${pfx} pause**\n\n\n` +

                `Pour avoir la queue :\n` +
                `:small_orange_diamond: **${pfx} queue**\n\n\n` +

                `Pour avoir le statut de la musique en cours :\n` +
                `:small_orange_diamond: **${pfx} status**\n\n\n` +

                `Pour passer à la musique suivante :\n` +
                `:small_orange_diamond: **${pfx} skip**\n\n\n` +

                `Pour stopper **toutes** les musiques en cours :\n` +
                `:small_orange_diamond: **${pfx} stop**\n\n\n` +

                `:warning: Vous devez être dans un salon vocal pour utiliser le bot (et aussi dans son salon pour certaines commandes).\n\n` +
                `\n\n` +
                `:information_source: **Ne pas** demander au bot de jouer de la musique alors qu'il est **déjà utilisé sur un autre salon vocal**.`
            )
            .setColor("RED");


        setTimeout(async () => {
            await call.message.delete()
        }, 10000);

        await call.message.channel.send(embed_song_cmds)
    }
}