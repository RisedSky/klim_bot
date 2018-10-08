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

        setTimeout(async () => {
            await call.message.delete()
        }, 2500);

        if (!call.bot.member_has_MANAGE_MESSAGES) {
            return await message.react("❌")
        } else {
            if (!call.args[0]) {
                return await message.reply("❌ Vous devez absolument mettre l'ID du message.").then(async m => { await call.bot.deleteUserMessage(m, 10000) })
            } else if (!call.args[1]) {
                return await message.reply("❌ Vous devez absolument mettre le salon.").then(async m => { await call.bot.deleteUserMessage(m, 10000) })
            }


            let message_id;
            let salon_id = await message.guild.channels.find(c => c.id == call.args[1].substr("2", "18"))
            if (!salon_id) return await message.reply("Le salon donné ne menne vers nul part...").then(async m => await call.bot.deleteUserMessage(m, 5000))

            message.channel.fetchMessages({ limit: 100 })
                .then(async messages => {
                    //console.log(`${messages.filter(m => m.id === call.args[0]).size} messages`)
                    message_id = await messages.filter(m => m.id == call.args[0]).first()
                    if (!message_id) return await message.reply("L'ID du message donné ne menne vers nul part")
                        .then(async m => await call.bot.deleteUserMessage(m, 5000))
                    //console.log(message_id)

                    //if (messages.filter(m => m.id === call.args[0]).size == 0 || !message_id)
                    //console.log(message_id)

                    var mess_send = new Discord.RichEmbed()
                        .setColor("#FFFF00") //yellow
                        .setTitle(`${message_id.member.user.tag} a écrit`)
                        .setDescription(message_id.content)
                        .setFooter(`Message déplacé par ${call.message.member.user.tag}`)

                    await salon_id.send(mess_send)
                    if (message_id.deletable) await message_id.delete()

                })
                .catch(console.error);

        }

    }
}