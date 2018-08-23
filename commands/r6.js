module.exports = {
    help: { name: "r6", aliases: ["R6", "r6s"] },
    run: async (call) => {
        var msg = call.message;
        var usr = call.message.member;

        var role = msg.guild.roles.find("name", "Rainbow Six Siège")
            , role_name = "Rainbow Six Siège"

        if (!role) return msg.channel.send(`❌ Le rôle \`${role_name}\` ne semble pas exister ? :thinking:`)

        call.message.react("✅")

        if (!usr.roles.exists("name", role_name)) {

            usr.addRole(role).then(() => {
                msg.channel.send(`✅ Rôle \`${role_name}\` ajouté.`)
            })

        } else {

            usr.removeRole(role).then(() => {
                msg.channel.send(`✅ Rôle \`${role_name}\` supprimé.`)
            })

        }
    }
}