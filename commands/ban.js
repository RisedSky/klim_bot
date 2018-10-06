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

            var user_warned = message.guild.members.find("id", call.args[0])
            if (!user_warned) {
                console.log("pas trouvé")
                return message.reply(`Je n'ai pas trouvé l'utilisateur \`${call.args[0]}\`'`)
            } else {
                console.log("trouvé")

                user_warned.createDM()
                    .then(c => {
                        var embed_ban = new Discord.RichEmbed()
                            .setColor("#FF0000")
                            .setDescription(`:warning: Vous avez été banni par ${call.bot.GetUserMention(message.author.id)} - '${message.author.id}'\n\nPour la raison suivante:\`\`\`${call.content.split(call.args[0])[1]}\`\`\``)


                        c.send(embed_ban)
                        user_warned.ban(({ reason: `${call.content.split(call.args[0])[1]} (demandé par ${message.author.tag})` }))
                        /*
                        c.send(`:warning: Vous avez reçu un avertissement par '${call.bot.GetUserMention(message.author.id)}' - '${message.author.id}' :warning:\nPour la raison suivante: \`\`\`${call.content.split(call.args[0])[1]}\`\`\` `)
                        */
                    })
                message.react("✅").then(() => {
                    call.bot.deleteUserMessage(message, 10 * 1000)
                })
                    .catch(error => {
                        console.log("Erreur sur le ban")
                        console.log(error)
                    })
            }
        }


        const category_name = String(message.channel.parent.name).toLowerCase() //Toujours en lowercase
        let logs_channel = "495968450095742976"
        let serv = "453464806062817281"
        
        let salon = call.bot.guilds.find("id", serv).channels.find("id", logs_channel)

        var warn_embed = new Discord.RichEmbed()
            .setColor("#FF0000")
            .setDescription(`:warning: L'utilisateur ${call.bot.GetUserMention(call.args[0])} a été banni par ${call.bot.GetUserMention(message.author.id)} dans le salon : <#${message.channel.id}>\n\nPour la raison suivante : \`\`\`${call.content.split(call.args[0])[1]}\`\`\` `)
            .setTimestamp()
        salon.send(warn_embed)


    }
}
