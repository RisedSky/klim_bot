module.exports = {
    help: { name: "play-list" },
    run: async (call) => {
        var message = call.message
            , Mess_Member = call.message.member
        //message, bot, bot.commands, args, content, prefix, cmd

        try {
            var server = call.bot.servers[message.guild.id]
            if (!call.args[0]) {
                message.react("❌").catch(e => {
                    if (e.name === "DiscordAPIError") return;
                    console.log("Error play-list > " + e);
                })
                message.reply(`❌ Merci d'indiquer une musique à jouer (le lien de la playlist)`).then(async msg => {
                    await call.bot.deleteMyMessage(msg, 16 * 1000);
                })
                return;

            } else if (!Mess_Member.voiceChannel) {
                message.react("❌").catch(e => {
                    if (e.name === "DiscordAPIError") return;
                    console.log("Error play-list > " + e);
                })
                message.reply(`❌ Tu dois être connecté à un salon vocal`).then(async msg => {
                    await call.bot.deleteMyMessage(msg, 16 * 1000);
                })
                return;

            } else if (Mess_Member.selfDeaf) { //Si la personne est deafen alors on fait éviter de faire user la bande passante pour rien
                message.react("❌").catch(e => {
                    if (e.name === "DiscordAPIError") return;
                    console.log("Error play-list > " + e);
                })
                message.reply(`❌ You have to be listening (not deafen)`).then(async msg => {
                    await call.bot.deleteMyMessage(msg, 16 * 1000);
                })
                return;
            }

            server.playit = true;

            var parsed = call.bot.URL.parse(call.args[0]);
            if (parsed && parsed.host) {
                // YouTube URL
                var regExp = /^.*(youtu.be\/|list=)([^#\&\?]*).*/;
                var match = call.args[0].match(regExp);

                if (match[2]) {//if (match && match[2]) {
                    server.annonce_it = false;
                    call.bot.queue_playlist(match[2], message);
                    return;
                } else {
                    message.reply(`❌ It's not a playlist`).then(msg => {
                        call.bot.deleteMyMessage(msg, 14 * 1000)
                    })
                }
            } else {
                message.reply(`❌ Hmm sorry but... it's not a link :/`).then(async msg => {
                    await call.bot.deleteMyMessage(msg, 14 * 1000)
                })
            }

        } catch (error) {
            console.log("play-list error");
            console.log(error);
        }
    }
}