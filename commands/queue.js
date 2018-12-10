module.exports = {
    help: { name: "queue", aliases: ["list"] },
    run: async (call) => {
        var message = call.message
            , Mess_Member = call.message.member
            , Discord = require("discord.js")
        //message, bot, bot.commands, args, content, prefix, cmd

        try {
            var server = call.bot.servers[message.guild.id]
                , xQueue = server.queue

            if (!xQueue[0]) {
                message.reply(`❌ La liste de musique est vide`).then(async msg => {
                    await call.bot.deleteMyMessage(msg, 20 * 1000);
                })
                return;
            }
            //console.log("Queue length: " + xQueue.length) //show us how many musics there is
            let embedQueue = new Discord.RichEmbed()
                .setColor("#ffa500")
                .setAuthor(`Liste de musique`, call.bot.user.avatarURL)
                .setDescription(`*Voici ta liste de musique*`)
                .setFooter(`Liste de musique demandée par ${message.author.username} • ID: ${message.author.id}`)
                .addBlankField()

            var xQueue_AddedFields = 0;

            for (var i in xQueue) {
                //console.log(embedQueue.fields.length)
                if (embedQueue.fields.includes(`Fin de transmission`)) return;

                if (embedQueue.fields.length <= 21) {
                    xQueue_AddedFields++;
                    embedQueue.addField(`[${i}] » ${xQueue[i]['title']}`, `*demandé par ${xQueue[i]['user']}*`)
                } else {
                    var RemainingNumber = xQueue.length - xQueue_AddedFields
                    embedQueue.addField(`Ainsi que ${RemainingNumber} autres...`, `Fin de transmission`)
                }
            }

            embedQueue.addBlankField();

            message.channel.send(embedQueue).then(async msg => {
                await call.bot.deleteMyMessage(msg, 180 * 1000);
            })

        } catch (error) {
            console.log("Queue command problem")
            console.log(error)
        }
    }
}