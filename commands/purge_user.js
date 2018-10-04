module.exports = {
    help: { name: "purge_user" },
    run: async (call) => {
        var Discord = require("discord.js")
        var usr = call.message.member

        //message, bot, bot.commands, args, content, prefix, cmd

        var Discord = require("discord.js");
        var Mess_Member = call.message.member
            , pfx = call.prefix
            , NumberToPurge;

        if (!Mess_Member.roles.find("id", call.bot.Moderateur_Role) || !Mess_Member.roles.find("id", call.bot.Administrateur_Role)) return call.message.reply(`Vous n'êtes pas autorisé à faire cette commande.`).then(async m => await call.bot.deleteUserMessage(m, 5000))

        //call.message.react("✅")
        if (!call.args[0]) return call.message.reply("Merci de notifier la personne").then(async m => await call.bot.deleteUserMessage(m, 5000))

        if (!call.args[1]) return call.message.reply("Merci d'indiquer combien de messages tu veux supprimer.").then(async m => await call.bot.deleteUserMessage(m, 5000))
        else if (!parseInt(call.args[1])) return call.message.reply(`\`${call.args[1]}\` n'est pas un nombre !`).then(async m => await call.bot.deleteUserMessage(m, 5000))
        else if (call.args[1] > 100) {
            NumberToPurge = 101
        } else { NumberToPurge = call.args[1] }

        call.message.react("✅").then(() => {
            setTimeout(() => {
                var message_deleted = 0
                if (NumberToPurge == 101) {
                    call.message.channel.fetchMessages({ limit: 100 })
                        .then(async messages => {
                            for (var i in messages.array()) {
                                if (messages.array()[i].member.id == call.args[0].substr(2, 18)) {
                                    if (messages.array()[i].deletable) await messages.array()[i].delete()
                                }
                            }
                        })
                        .catch(console.error)
                } else {
                    call.message.channel.fetchMessages({ limit: 100 })
                        .then(async messages => {
                            for (var i in messages.array()) {
                                if (message_deleted == call.args[1]) return console.log(`${message_deleted} -- ${call.args[1]} (Finished)`);


                                if (messages.array()[i].member.id == call.args[0].substr(2, 18)) {
                                    if (messages.array()[i].deletable) await messages.array()[i].delete()
                                    message_deleted++
                                }

                            }
                        })
                        .catch(console.error)
                }
            }, 2500);
        })
    }
}
