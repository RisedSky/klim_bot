module.exports = {
    help: { name: "ftn", aliases: ["Fortnite", "fortnite", "FTN"] },
    run: async (call) => {
        var msg = call.message;
        var usr = call.message.member;

        var role = msg.guild.roles.find("name", "Fortnite")
            , role_name = "Fortnite"

        if (!role) return msg.channel.send(`❌ Le rôle \`${role_name}\` ne semble pas exister ? :thinking:`)

        if (!usr.roles.exists("name", role_name)) {

            usr.addRole(role).then(() => {
                msg.channel.send(`✅ Rôle \`${role_name}\` ajouté.`)
            })

        } else {

            usr.removeRole(role).then(() => {
                msg.channel.send(`✅ Rôle \`${role_name}\` enlevé.`)
            })

        }
    }
}