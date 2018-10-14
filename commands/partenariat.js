module.exports = {
    help: { name: "partenariat", aliases: ["partenariats"] },
    run: async (call) => {
        //message, bot, bot.commands, args, content, prefix, cmd
        const Discord = require("discord.js")
            , message = call.message;


        if (message.member.roles.find(r => r.id == call.bot.Administrateur_Role) || message.member.roles.find(r => r.id == call.bot.Moderateur_Role)) {
            await call.message.react("✅")

            var embed_msg = new Discord.RichEmbed()
                .setAuthor(``, call.bot.user.avatarURL)
                .setColor("GREEN")
                .setAuthor("Concernant les partenariats", call.bot.user.avatarURL)
                .setDescription(
                    //`**Concernant les partenariats**\n\n` +
                    //`${call.bot.invisible_emote}\n` +
                    `Bonjour,\n\n` +

                    `Nous regrettons mais notre politique de partenariat est actuellement **en cours de modification**.\n\n` +
                    `De ce fait, nous n'acceptons temporairement plus aucune **demande de partenariat ni de sponsoring**.\n\n` +
                    `Bien cordialement.`
                )

            await message.channel.send(embed_msg)
            setTimeout(async () => {
                await message.delete()
            }, 3500);
        } else {
            await call.message.react("❌")
            return message.delete(2500)
        }
    }
}