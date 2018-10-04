module.exports = {
    help: { name: "move_mess" },
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


        if (!call.bot.member_has_MANAGE_MESSAGES) {
            return message.react("❌")
        } else {
            if (!call.args[0]) {
                return message.reply("❌ Vous devez absolument mettre l'ID du message.").then(m => { call.bot.deleteUserMessage(m, 10000) })
            } else if (!call.args[1]) {
                return message.reply("❌ Vous devez absolument mettre le salon.").then(m => { call.bot.deleteUserMessage(m, 10000) })
            }


            let message_id;
            let salon_id = message.guild.channels.find("id", call.args[1].substr("2", "18"))
            if (!salon_id) return message.reply("Le salon donné ne menne vers nul part...").then(async m => await call.bot.deleteUserMessage(m, 5000))

            message.channel.fetchMessages({limit: 100})
                .then(messages => {
                    //console.log(`${messages.filter(m => m.id === call.args[0]).size} messages`)
                    message_id = messages.first()
                    if (messages.filter(m => m.id === call.args[0]).size == 0 || !message_id) return message.reply("L'ID du message donné ne menne vers nul part").then(async m => await call.bot.deleteUserMessage(m, 5000))
                    //console.log(message_id)

                    var mess_send = new Discord.RichEmbed()
                        .setColor("#FFFF00") //yellow
                        .setTitle(`${message_id.member.user.tag} a écrit`)
                        .setDescription(message_id.content)
                        .setFooter(`Message déplacé par ${call.message.member.user.tag}`)
                    salon_id.send(mess_send)
                    if(message_id.deletable) message_id.delete()

                })
                .catch(console.error);

        }
    }
}