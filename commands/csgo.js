module.exports = {
    help: { name: "csgo", aliases: ["Counter-Strike", "cs", "css", "CSGO"] },
    run: async (call) => {
        var msg = await call.message;
        var usr = await call.message.member;

        var role = await msg.guild.roles.find("name", "Counter-Strike")
            , role_name = "Counter-Strike"

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