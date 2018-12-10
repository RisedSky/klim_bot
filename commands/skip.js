module.exports = {
    help: { name: "skip", aliases: ["next"] },
    run: async (call) => {
        var message = call.message
            , Mess_Member = call.message.member
        //message, bot, bot.commands, args, content, prefix, cmd

        if (message.guild.id !== "453464806062817281") { return message.react("❌").then(async () => { message.delete(2500) }) }
        var server = await call.bot.servers[message.guild.id]
        if (!Mess_Member.voiceChannel) {
            message.reply(`❌ Tu dois être connecté à un salon vocal si tu veux que je skip une musique`).then(async msg => {
                await call.bot.deleteMyMessage(msg, 12 * 1000);
            })
            return;
        } else if (!message.guild.voiceConnection) {
            message.reply(`❌ Il n'y pas de musique actuellement en cours de lecture`).then(async msg => {
                await call.bot.deleteMyMessage(msg, 12 * 1000);
            })
            return;
        } else if (Mess_Member.selfDeaf) { //Si la personne est deafen alors on fait éviter de faire user la bande passante pour rien
            message.reply(`❌ Tu ne dois pas être muet au niveau des écouteurs (deafen)`).then(async msg => {
                await call.bot.deleteMyMessage(msg, 12 * 1000);
            })
            return;

        } else if (!Mess_Member.voiceChannel.name === message.guild.voiceConnection.channel.name) {
            message.reply(`❌ Tu n'es pas dans le même salon vocal que moi`)
                .then(async msg => {
                    await call.bot.deleteMyMessage(msg, 12 * 1000);
                })
            return;
        } else if (!server.queue[1]) {
            message.reply(`❌ Je ne peux pas skipper la musique car c'est la seule se trouvant dans la liste`).then(async msg => {
                await call.bot.deleteMyMessage(msg, 10 * 1000)
            })
            return;
        }
        //console.log("User: " + Mess_Member.voicechannel.name + " | " + "Me: " + message.guild.voiceConnection.channel.name)

        //console.log(server.dispatcher);

        var video_id = server.queue[1]["id"];
        var title = server.queue[1]["title"];
        var user = server.queue[1]["user"];

        if (server.dispatcher) {
            var msg = [];
            msg.push(`:white_check_mark: Musique skippée :\n\`${server.now_playing_data["title"]}\` *(demandée par ${server.now_playing_data["user"]})* \n\n`);
            msg.push(`Musique actuellement en cours :\n\`${title}\` *(demandée par ${user})*`)

            message.channel.send(msg).then(async msg => {
                await call.bot.deleteMyMessage(msg, 60 * 1000);
            })

            server.dispatcher.end();
        }

        server.now_playing_data["title"] = title;
        server.now_playing_data["user"] = user;

    }
}