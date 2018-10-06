module.exports = {
    help: { name: "helps", aliases: ["h", "help"] },
    run: async (call) => {
        //message, bot, bot.commands, args, content, prefix, cmd

        var Discord = require("discord.js");
        var Mess_Member = call.message.member
            , pfx = call.prefix


        //#region Truc moche en bas mdr
        /*
        var help_msgToSend_cmds = (
            "\n" +
            "```md\n" +
            `# Voici les différentes commandes du KLIM BOT.\n\n` +
            //`#» ${pfx} helps\nLes différentes commandes du KLIM Bot.\n\n` +
            //`#» ${pfx} rules\nLe règlement du Discord de KLIM.\n\n` +
            `#» ${pfx} roles\nLes différents rôles de la KLIM Community.\n\n` +
            `#» ${pfx} salons\nComment créer son propre salon privé ?\n\n` +
            `#» ${pfx} liens\nLes différents liens de la KLIM.` +
            "\n" +
            "```")

        call.bot.sendDMToUser(call.message, help_msgToSend_cmds)
        //#endregion
        */

        call.message.react("✅")

        var help_embed = new Discord.RichEmbed()
            .setColor("GREEN")
            .setDescription(
                `*Voici les différentes commandes du KLIM BOT.*\n\n` +
                `:small_orange_diamond: **${pfx} helps** :arrow_right: Les différentes commandes du KLIM Bot.\n` +
                //`:small_orange_diamond: **${pfx} rules** :arrow_right: Le règlement du Discord de KLIM.\n` +
                `:small_orange_diamond: **${pfx} roles** :arrow_right: Les différents rôles de la KLIM Community.\n` +
                `:small_orange_diamond: **${pfx} salons** :arrow_right: Comment créer son propre salon privé ?\n` +
                `:small_orange_diamond: **${pfx} liens** :arrow_right: Les différents liens de la KLIM.`
            )

        return call.message.author.createDM().then(async c => await c.send(help_embed))
        //return call.message.channel.send(help_embed)
    }
}