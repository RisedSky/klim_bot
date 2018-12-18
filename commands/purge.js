module.exports = {
    help: { name: "purge" },
    run: async (call) => {
        //message, bot, bot.commands, args, content, prefix, cmd

        try {
            var Discord = require("discord.js");
            var Mess_Member = call.message.member
                , pfx = call.prefix
                , NumberToPurge;

            if (!call.bot.admin_id.includes(Mess_Member.id)) return call.message.reply(`Vous n'êtes pas autorisé à faire cette commande.`)

            //call.message.react("✅")

            if (!call.args[0]) return call.message.reply("Merci d'indiquer combien de messages tu veux supprimer.")
            else if (!parseInt(call.args[0])) return call.message.reply(`\`${call.args[0]}\` n'est pas un nombre !`)
            else if (call.args[0] > 100) {
                NumberToPurge = 101
            } else { NumberToPurge = call.args[0] }

            call.message.react("✅").then(() => {
                setTimeout(() => {
                    if (NumberToPurge == 101) {
                        setTimeout(() => {
                            call.message.channel.bulkDelete(100)
                            call.message.channel.bulkDelete(100)
                        }, 2500);
                    } else {
                        call.message.channel.bulkDelete(NumberToPurge)
                    }
                }, 2500);
            })

        } catch (error) {
            console.log(`purge error`)
            console.log(error)
        }
    }
}