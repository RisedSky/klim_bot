module.exports = {
    help: { name: "lol", aliases: ["LoL", "LOL", "League of legends", "League Of legends", "League Of Legends", "League of Legends"] },
    run: async (call) => {
        var msg = call.message;
        var usr = call.message.member;

        var role = msg.guild.roles.find("name", "League of Legends")
            , role_name = "League of Legends"

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