module.exports = {
    help: { name: "csgo", aliases: ["Counter-Strike", "cs", "css", "CSGO"] },
    run: async (call) => {
        var msg = call.message;
        var usr = call.message.member;

        var role = msg.guild.roles.find("name", "Counter-Strike")
            , role_name = "Counter-Strike"

        if (!role) return msg.channel.send(`❌ Le rôle \`${role_name}\` ne semble pas exister ? :thinking:`)

        call.message.react("✅")

        if (!usr.roles.exists("name", role_name)) {

            usr.addRole(role).then(() => {
                //msg.channel.send(`✅ Rôle \`${role_name}\` ajouté.`)
                usr.createDM().then(c => c.send(`✅ Rôle \`${role_name}\` ajouté.`))
            })

        } else {

            usr.removeRole(role).then(() => {
                //msg.channel.send(`✅ Rôle \`${role_name}\` supprimé.`)
                usr.createDM().then(c => c.send(`✅ Rôle \`${role_name}\` supprimé.`))
            })
        }
    }
}