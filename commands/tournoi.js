module.exports = {
    help: { name: "tournoi" },
    run: async (call) => {
        var message = call.message;
        var usr = call.message.member;
        const Discord = require("discord.js")

        //message, bot, bot.commands, args, content, prefix, cmd
        //call.bot.member_Has_BAN_MEMBERS 
        //call.bot.member_Has_KICK_MEMBERS 
        //call.bot.member_Has_MANAGE_GUILD 
        //call.bot.member_has_MANAGE_MESSAGES
        //call.bot.member_has_MANAGE_CHANNELS
        //✅
        //❌
        
        message.delete(5000)

        if (!message.member.roles.find(r => r.name === "Responsables de Section" || r.name === "Animateurs" || r.name == "Direction Communautaire")) return message.reply(":no_entry_sign: Tu n'es pas habilité à utiliser cette commande!").then(msg => msg.delete(5500))


        if (!call.args[0]) { return await message.reply("Merci de notifier un utilisateur.").then(async msg => await msg.delete(5000)) }

        if (!message.mentions.users.first()) return message.reply("Merci de notifier un utilisateur valide.")

        message.react("✅")
        
        let role_tournois = message.guild.roles.find(r => r.name === "Tournois")
            , role_everyone = message.guild.roles.find(r => r.name === "@everyone")
            , role_user_args = call.args[0]
            //, role_user = message.guild.members.find(u => u.name == String(role_user_args).replace("@", ""))
            , role_user = message.guild.members.find(u => u.id === message.mentions.users.first().id)

        if (message.mentions.users.size > 1) {
            var msgsend = ""
            console.log(`au dessus de 1`)
            message.mentions.users.forEach(async u => {
                let user = message.guild.members.find(usr => usr.id === u.id)

                if (user.roles.find(r => r === role_tournois)) console.log("déjà le rôle")
                else {
                    await user.addRole(role_tournois).then(async () => { msgsend += (`${user.user.username} a reçu le rôle Tournois.\n`) })
                    console.log(msgsend)
                }
            })
            setTimeout(() => {
                console.log(`Length = '${String(msgsend).length}'`)
                console.log(`send = '${String(msgsend)}'`)
                if (String(msgsend).length === 0) {
                    message.reply("Les utilisateurs ont déjà le rôle Tournois.").then(msg => msg.delete(7000))
                } else {
                    message.reply(msgsend).then(msg => { msgsend = ""; msg.delete(10000) })

                }
            }, 5000);
            return;
        }

        console.log(role_user)

        if (role_user) {
            if (role_user.roles.find(r => r === role_tournois)) {
                //A le role tournois
                return message.reply("L'utilisateur a déjà le rôle Tournois.").then(async msg => await msg.delete(3000))

            } else {
                //N'a pas le role tournois
                return role_user.addRole(role_tournois)
                    .then(async () => message.reply("L'utilisateur à désormais le rôle Tournois.").then(async msg => await msg.delete(3000)))
                    .catch(async err => await console.log(`Je n'ai pas réussi à donner le rôle Tournois à cet utilisateur\nErreur:${err.message}`))
            }

            /*
            if (!role_tournois || !role_everyone) {
                console.log(`Error!\nEveryone:${role_everyone}\nTournois:${role_tournois}`)
            }
                
            if (call.bot.member_has_MANAGE_CHANNELS || message.member.roles.find(r => r.id === call.bot.ResponsableSection_Role)) {
                message.delete(4500)
        
                if (String(message.channel.topic).includes("<locked>")) {
                    await message.react("✅")
                    await message.channel.setTopic(String(message.channel.topic).replace("<locked>", "<unlocked>")).then(async c => {
                        //Salon qui est désormais débloqué
                        await c.overwritePermissions(role_everyone, { READ_MESSAGES: true, SEND_MESSAGES: false })
                        await c.overwritePermissions(role_tournois, { READ_MESSAGES: true, SEND_MESSAGES: true }).then(console.log(`Channel unlocked`))
                    })
        
                } else if (String(message.channel.topic).includes("<unlocked>")) {
                    await message.react("✅")
                    await message.channel.setTopic(String(message.channel.topic).replace("<unlocked>", "<locked>")).then(async c => {
                        //Salon qui est désormais bloqué
                        await c.overwritePermissions(role_everyone, { READ_MESSAGES: true, SEND_MESSAGES: false })
                        await c.overwritePermissions(role_tournois, { READ_MESSAGES: true, SEND_MESSAGES: true }).then(console.log(`Channel locked`))
                    })
        
                } else {
                    //if (String(message.channel.topic.includes("Tournoi"))) {
                    //    await message.channel.setTopic(String(message.channel.topic).replace("Tournoi", "<unlocked>"))
                    //}
            await message.react("❌").then(async msg => await call.bot.deleteUserMessage(msg, 5000))
            console.log(`Not find`)
        }
        
        } else {
        await message.react("❌").then(async msg => await call.bot.deleteUserMessage(msg, 3500))
        }
            */
        }
    }
}