module.exports = {
    help: { name: "helps", aliases: ["h", "help"] },
    run: async (call) => {
        //message, bot, bot.commands, args, content, prefix, cmd

        var Discord = require("discord.js");
        var Mess_Member = call.message.member
            , pfx = call.prefix

            call.message.react("✅")

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

        return call.message.react("✅")
    }
}