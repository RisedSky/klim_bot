module.exports = {
    help: { name: "kick" },
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

        if (!call.bot.member_Has_KICK_MEMBERS) {
            return message.react("❌")
        } else {
            if (!call.args[0]) {
                return message.reply("❌ Vous devez absolument mettre l'ID d'une personne.").then(m => { call.bot.deleteUserMessage(m, 10000) })
            } else if (!call.args[1]) {
                return message.reply("❌ Vous devez absolument mettre la raison de votre kick.").then(m => { call.bot.deleteUserMessage(m, 10000) })
            }


            call.bot.fetchUser(call.args[0], true)
                .then(user_warned => {
                    console.log("trouvé")

                    user_warned.createDM()
                        .then(c => {
                            var embed_kick = new Discord.RichEmbed()
                                .setColor("#E59400")
                                .setDescription(`:warning: Vous avez été kick du serveur ${call.message.guild.name} par ${call.bot.GetUserMention(message.author.id)} (${call.message.author.tag})\n\nPour la raison suivante: \`\`\`${call.content.split(call.args[0])[1]}\`\`\` `)

                            c.send(embed_kick)
                            user_warned.kick(({ reason: `${call.content.split(call.args[0])[1]} (demandé par ${message.author.tag})` }))

                            message.react("✅").then(() => {
                                call.bot.deleteUserMessage(message, 10 * 1000)
                            })

                            //const category_name = String(message.channel.parent.name).toLowerCase() //Toujours en lowercase
                            let logs_channel = "495968450095742976"
                            let serv = "453464806062817281"

                            let salon = call.bot.guilds.find("id", serv).channels.find("id", logs_channel)

                            var warn_embed = new Discord.RichEmbed()
                                .setColor("#E59400")
                                .setDescription(`:warning: L'utilisateur ${call.bot.GetUserMention(call.args[0])} a été kick par ${call.bot.GetUserMention(message.author.id)} dans le salon : <#${message.channel.id}>\n\nPour la raison suivante : \`\`\`${call.content.split(call.args[0])[1]}\`\`\` `)
                                .setTimestamp()
                            salon.send(warn_embed)

                        })

                        .catch(error => {
                            console.log("Erreur sur le kick")
                            console.log(error)
                        })
                })
                .catch(e => {
                    console.log("pas trouvé")
                    return message.reply(`Je n'ai pas trouvé l'utilisateur '\`${call.args[0]}\`' (${e.message})`)
                })
        }
    }
}