module.exports = {
    help: { name: "d2", aliases: ["dota", "D2"] },
    run: async (call) => {
        var msg = call.message;
        var usr = call.message.member;

        var role = msg.guild.roles.find("name", "Dota 2")
            , role_name = "Dota 2"

        if (!role) return await msg.channel.send(`❌ Le rôle \`${role_name}\` ne semble pas exister ? :thinking:`)

        await call.message.react("✅")
        const salonHighlight = "495968450095742976"
            , serv = "453464806062817281"

        if (!usr.roles.exists("name", role_name)) {

            await usr.addRole(role).then(async () => {
                //msg.channel.send(`✅ Rôle \`${role_name}\` ajouté.`)
                await usr.createDM().then(async c => await c.send(`✅ Rôle \`${role_name}\` ajouté.`))
                await call.bot.guilds.find(s => s.id == serv).channels.find(c => c.id == salonHighlight).send(`**{user} ** s'est donné le rôle :arrow_right: **${call.bot.config.prefix} ${role_name}**`)
            })

        } else {

            await usr.removeRole(role).then(async () => {
                //msg.channel.send(`✅ Rôle \`${role_name}\` supprimé.`)
                await usr.createDM().then(async c => await c.send(`✅ Rôle \`${role_name}\` supprimé.`))
                await call.bot.guilds.find(s => s.id == serv).channels.find(c => c.id == salonHighlight).send(`**{user} ** s'est enlevé le rôle :arrow_right: **${call.bot.config.prefix} ${role_name}**`)
            })
        }
        
        setTimeout(async () => {
            await call.message.delete()
        }, 2500);
    }
}