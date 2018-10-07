module.exports = {
    help: { name: "ow", aliases: ["overwatch", "OW", "OVERWATCH", "OverWatch"] },
    run: async (call) => {
        var msg = call.message;
        var usr = call.message.member;

        var role = msg.guild.roles.find("name", "Overwatch")
            , role_name = "Overwatch"

        if (!role) return await msg.channel.send(`❌ Le rôle \`${role_name}\` ne semble pas exister ? :thinking:`)

        await call.message.react("✅")

        if (!usr.roles.exists("name", role_name)) {

            await usr.addRole(role).then(async () => {
                //msg.channel.send(`✅ Rôle \`${role_name}\` ajouté.`)
                await usr.createDM().then(async c => await c.send(`✅ Rôle \`${role_name}\` ajouté.`))
            })

        } else {

            await usr.removeRole(role).then(async () => {
                //msg.channel.send(`✅ Rôle \`${role_name}\` supprimé.`)
                await usr.createDM().then(async c => await c.send(`✅ Rôle \`${role_name}\` supprimé.`))
            })
        }
        
        setTimeout(async () => {
            await message.delete()
        }, 5000);
    }
}