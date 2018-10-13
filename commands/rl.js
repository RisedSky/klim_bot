module.exports = {
    help: { name: "rl", aliases: ["rocket", "RL", "RocketLeague", "Rocket-League", "Rocket_League"] },
    run: async (call) => {
        var msg = call.message;
        var usr = call.message.member;

        var role = msg.guild.roles.find("name", "Rocket League")
            , role_name = "Rocket League"

        setTimeout(async () => {
            await call.message.delete()
        }, 2500);

        if (!role) return await msg.channel.send(`❌ Le rôle \`${role_name}\` ne semble pas exister ? :thinking:`)

        if (usr.roles.find(r => r.id == call.bot.Administrateur_Role) || usr.roles.find(r => r.id == call.bot.Moderateur_Role)) {
            return await call.message.react("❌")
        }

        await call.message.react("✅")
        const salonHighlight = "495968450095742976"
            , serv = "453464806062817281"

        if (!usr.roles.exists("name", role_name)) {

            await usr.addRole(role).then(async () => {
                //msg.channel.send(`✅ Rôle \`${role_name}\` ajouté.`)
                await usr.createDM().then(async c => await c.send(`✅ Rôle \`${role_name}\` ajouté.`))
                await call.bot.guilds.find(s => s.id == serv).channels.find(c => c.id == salonHighlight).send(`**${usr.user.tag}** s'est donné le rôle :arrow_right: **${role_name}**`)
            })

        } else {

            await usr.removeRole(role).then(async () => {
                //msg.channel.send(`✅ Rôle \`${role_name}\` supprimé.`)
                await usr.createDM().then(async c => await c.send(`✅ Rôle \`${role_name}\` supprimé.`))
                await call.bot.guilds.find(s => s.id == serv).channels.find(c => c.id == salonHighlight).send(`**${usr.user.tag}** s'est enlevé le rôle :arrow_right: **${role_name}**`)
            })
        }

        setTimeout(async () => {
            await call.message.delete()
        }, 2500);
    }
}