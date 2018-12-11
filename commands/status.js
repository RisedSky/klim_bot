module.exports = {
    help: { name: "status" },
    run: async (call) => {
        var message = call.message
            , Mess_Member = call.message.member
            , Discord = require("discord.js")
        //message, bot, bot.commands, args, content, prefix, cmd

        try {
            if (message.guild.id !== "453464806062817281") { return message.react("❌").then(async () => { message.delete(2500) }) }

            var server = call.bot.servers[message.guild.id]
            if (!server.queue[0]) {
                message.reply("❌ Aucune musique actuellement en cours").then(async msg => {
                    await call.bot.deleteMyMessage(msg, 15 * 1000)
                })
                return;
            }
            var disp_time = call.bot.moment.duration(server.dispatcher.time, "milliseconds")
            console.log(`Server disptacher => '${disp_time.get("seconds")}' - Time => '${server.queue[0]["YouTubeTimeSec"]}'`);

            var time_remainingSec = (server.queue[0]["YouTubeTimeSec"] - disp_time.get("seconds"))

            var de = new Date(null);
            de.setSeconds(time_remainingSec);
            var TimeRemaining = de.toISOString().substr(11, 8); // récupere le temps et le transforme en HH:mm:ss

            embedStatus = new Discord.RichEmbed()
                .setColor("#FFFF00")
                .setAuthor(`Status`, call.bot.user.avatarURL)
                .setDescription(`*The current status of the song*`)
                .setThumbnail(server.queue[0]["YouTubeThumbnail"]).setURL(server.queue[0]["YouTubeLink"])

                .addField(`Musique actuelle : ${server.queue[0]["title"]}`, `*(demandée par ${server.queue[0]["user"]})*`)
                .addBlankField()

                .addField(`La musique est-elle bouclée ?`, call.bot.CheckInfo_ToBooleanEmoji(server.loopit), true)
                .addField(`La musique est-elle stoppée ?`, call.bot.CheckInfo_ToBooleanEmoji(server.dispatcher_paused), true)

                .addBlankField()

                .addField(`Mise en ligne par`, server.queue[0]["YouTubeUploader"], true)
                .addField(`Durée de`, `**${server.queue[0]["YouTubeTime"]}**`, true) //temps
                .addBlankField(true)
                .addField(`Temps restant`, `**${TimeRemaining}**`, true)

                .addBlankField()

                .addField(`Vues`, server.queue[0]["YouTubeViews"], true)
                .addField(`Lien`, `[Cliquez ici](${server.queue[0]["YouTubeLink"]})`, true)

                .setFooter(`Status demandée par ${message.author.username} • ID: ${message.author.id}`)

            message.channel.send(embedStatus).then(async msg => {
                await call.bot.deleteMyMessage(msg, 120 * 1000);
            })

        } catch (error) {
            console.log("Status command problem ")
            console.log(error)
        }
    }
}