module.exports = {
    help: { name: "tournoi_end" },
    run: async (call) => {
        var message = call.message;
        var usr = call.message.member;
        const Discord = require("discord.js")

        //message, bot, bot.commands, args, content, prefix, cmd
        message.delete(5000)

        if (!message.member.roles.find(r => r.name === "Responsables de Section" || r.name === "Animateurs" || r.name == "Direction Communautaire")) return message.reply(":no_entry_sign: Tu n'es pas habilité à utiliser cette commande!").then(msg => msg.delete(5500))

        message.react("✅")
        let role_tournois = message.guild.roles.find(r => r.name === "Tournois")
            , role_everyone = message.guild.roles.find(r => r.name === "@everyone")

        let number = 0
        message.channel.send(`X utilisateurs ont perdu le rôle Tournois.`).then(async msg => {
            message.guild.members.forEach(async members => {
                if (members.roles.find(r => r === role_tournois)) {
                    await members.removeRole(role_tournois)
                    number++;
                    await msg.edit(String(msg).replace(String(msg).substr(0, 1), number))
                }
            })
            return msg.delete(10000)
        });

    }
}