module.exports = {
    help: { name: "tournoi" },
    run: async (call) => {
        var message = call.message;
        var usr = call.message.member;
        const Discord = require("discord.js")

        let role_tournois = message.guild.roles.find(r => r.name === "Tournois")
            , role_everyone = message.guild.roles.find(r => r.name === "@everyone")

        if (!role_tournois || !role_everyone) {
            console.log(`Error!\nEveryone:${role_everyone}\nTournois:${role_tournois}`)
        }

        /*
        call.bot.member_Has_BAN_MEMBERS 
        call.bot.member_Has_KICK_MEMBERS 
        call.bot.member_Has_MANAGE_GUILD 
        call.bot.member_has_MANAGE_MESSAGES
        call.bot.member_has_MANAGE_CHANNELS
        ❌
        */

        if (call.bot.member_has_MANAGE_CHANNELS || message.member.roles.find(async r => await r.id === call.bot.ResponsableSection_Role)) {
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
                /*if (String(message.channel.topic.includes("Tournoi"))) {
                    await message.channel.setTopic(String(message.channel.topic).replace("Tournoi", "<unlocked>"))
                }*/
                await message.react("❌").then(async msg => await call.bot.deleteUserMessage(msg, 5000))
                console.log(`Not find`)
            }

        } else {
            await message.react("❌").then(async msg => await call.bot.deleteUserMessage(msg, 3500))
        }
    }
}