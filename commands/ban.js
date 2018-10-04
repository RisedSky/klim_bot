module.exports = {
    help: { name: "ban" },
    run: async (call) => {
        var message = call.message;
        var usr = call.message.member;
        const Discord = require("discord.js")
        /*
        bot.member_Has_BAN_MEMBERS 
        bot.member_Has_KICK_MEMBERS 
        bot.member_Has_MANAGE_GUILD 
        bot.member_has_MANAGE_MESSAGES
        */

        if (!call.bot.member_Has_BAN_MEMBERS) {
            return message.react("❌")
        } else {
            if (!call.args[0]) {
                return message.reply("❌ Vous devez absolument mettre l'ID d'une personne.").then(m => { call.bot.deleteUserMessage(m, 10000) })
            } else if (!call.args[1]) {
                return message.reply("❌ Vous devez absolument mettre la raison de votre bannissement.").then(m => { call.bot.deleteUserMessage(m, 10000) })
            }

            var user_warned = message.guild.members.find("id", call.args[0].substr("2", "18"))
            if (!user_warned) {
                console.log("pas trouvé")
                return message.reply(`Je n'ai pas trouvé l'utilisateur \`${call.args[0]}\`'`)
            } else {
                console.log("trouvé")

                user_warned.createDM()
                    .then(c => {
                        var embed_warning = new Discord.RichEmbed()
                            .setColor("#FF0000")
                            .setDescription(`:warning: Vous avez été banni par ${call.bot.GetUserMention(message.author.id)} - '${message.author.id}'\n\nPour la raison suivante:\`\`\`${call.content.split(call.args[0])[1]}\`\`\``)


                        c.send(embed_warning)
                        user_warned.ban(({ reason: `${call.content.split(call.args[0])[1]} (demandé par ${message.author.tag})` }))
                        /*
                        c.send(`:warning: Vous avez reçu un avertissement par '${call.bot.GetUserMention(message.author.id)}' - '${message.author.id}' :warning:\nPour la raison suivante: \`\`\`${call.content.split(call.args[0])[1]}\`\`\` `)
                        */
                    })
                message.react("✅").then(() => {
                    call.bot.deleteUserMessage(message, 10 * 1000)
                })
                    .catch(error => {
                        console.log("Erreur sur le warn")
                        console.log(error)
                    })
            }
        }


        const category_name = String(message.channel.parent.name).toLowerCase() //Toujours en lowercase
        let logs_channel;
        let serv = "453464806062817281"

        let embed_warn = new Discord.RichEmbed()
            .setColor("#FF0000")
            .setDescription(`:warning: L'utilisateur ${call.args[0]} a été banni par ${call.bot.GetUserMention(message.author.id)}\n\nPour la raison suivante :\`\`\`${call.content.split(call.args[0])[1]}\`\`\``)
            .setTimestamp()
        //(${call.args[0].substr("2", "18")})

        if (category_name == "fortnite") {

            logs_channel = "494181756858138636"

            let salon = call.bot.guilds.find("id", serv).channels.find("id", logs_channel)
            salon.send(embed_warn)

        } else if (category_name == "playerunknown's bg") {

            logs_channel = "494182744121671720"
            let salon = call.bot.guilds.find("id", serv).channels.find("id", logs_channel)
            salon.send(embed_warn)

        } else if (category_name == "call of duty") {

            logs_channel = "494183270171410433"
            let salon = call.bot.guilds.find("id", serv).channels.find("id", logs_channel)
            salon.send(embed_warn)

        } else if (category_name == "counter-strike") {

            logs_channel = "494183411074727938"
            let salon = call.bot.guilds.find("id", serv).channels.find("id", logs_channel)
            salon.send(embed_warn)

        } else if (category_name == "overwatch") {

            logs_channel = "494183451126136832"
            let salon = call.bot.guilds.find("id", serv).channels.find("id", logs_channel)
            salon.send(embed_warn)

        } else if (category_name == "rainbow six siège") {

            logs_channel = "494183492557733888"
            let salon = call.bot.guilds.find("id", serv).channels.find("id", logs_channel)
            salon.send(embed_warn)

        } else if (category_name == "league of legends") {

            logs_channel = "494183856484646912"
            let salon = call.bot.guilds.find("id", serv).channels.find("id", logs_channel)
            salon.send(embed_warn)

        } else if (category_name == "w. warcraft & hearthstone") {

            logs_channel = "494183906828877825"
            let salon = call.bot.guilds.find("id", serv).channels.find("id", logs_channel)
            salon.send(embed_warn)

        } else {
            logs_channel = "495968450095742976"
            let salon = call.bot.guilds.find("id", serv).channels.find("id", logs_channel)

            var warn_embed = new Discord.RichEmbed()
                .setColor("#FF0000")
                .setDescription(`:warning: L'utilisateur ${call.args[0]} a reçu un avertissement par ${call.bot.GetUserMention(message.author.id)} dans le salon : <#${message.channel.id}>\n\nPour la raison suivante : \`\`\`${call.content.split(call.args[0])[1]}\`\`\` `)
                .setTimestamp()
            salon.send(warn_embed)
        }

    }
}
