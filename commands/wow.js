module.exports = {
    help: { name: "wow", aliases: ["WOW"] },
    run: async (call) => {
        var msg = call.message;
        var usr = call.message.member;

        var role = msg.guild.roles.find("name", "World of Warcraft")
            , role_name = "World of Warcraft"

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