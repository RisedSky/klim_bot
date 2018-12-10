module.exports = {
    help: { name: "play" },
    run: async (call) => {
        var message = await call.message
            , Mess_Member = await call.message.member
        //message, bot, bot.commands, args, content, prefix, cmd

        try {
            var server = await call.bot.servers[message.guild.id]

            if (!call.args[0]) {
                await message.react("❌").catch(async e => {
                    if (e.name === "DiscordAPIError") return;
                    console.log("Error play > " + e);
                })
                await message.reply(`❌ Merci d'indiquer une musique à jouer (le lien ou le nom de la musique)`).then(async msg => {
                    await call.bot.deleteMyMessage(msg, 16 * 1000);
                })
                return;

            } else if (!Mess_Member.voiceChannel) {

                await message.react("❌").catch(async e => {
                    if (e.name === "DiscordAPIError") return;
                    console.log("Error play > " + e);
                })
                await message.reply(`❌ Tu dois être connecté à un salon vocal`).then(async msg => {
                    await call.bot.deleteMyMessage(msg, 16 * 1000);
                })
                return;

            } else if (Mess_Member.selfDeaf) {
                await message.react("❌").catch(async e => {
                    if (e.name === "DiscordAPIError") return;
                    console.log("Error play > " + e);
                })
                await message.reply(`❌ Tu ne dois pas être muet au niveau des écouteurs (deafen)`).then(async msg => {
                    await call.bot.deleteMyMessage(msg, 16 * 1000);
                })
                return;
            }
            message.react("✅").then(async () => {
                message.delete(5000)
            })

            server.playit = true;

            var parsed = await call.bot.URL.parse(call.args[0]);
            if (parsed && parsed.host) {
                // YouTube URL

                //var regExp = /^.*(youtu.be\/|list=)([^#\&\?]*).*/;
                /*
                var match = args[1].match(regExp);
        
                if (match && match[2]) {
                    server.annonce_it = false;
                    queue_playlist(match[2], message);
                    return;
                }
                */

                server.annonce_it = true;
                if (parsed.host.match(/(www\.)?youtube.com|(www\.)?youtu.be/i)) {

                    var regExp = /^.*v=([^#\&\?]*).*/;
                    var match = call.args[0].match(regExp);

                    if (match[1]) {//if (match && match[2]) {
                        return call.bot.search_video(message, match[1]);
                    } else {
                        await message.reply(`❌ Ce n'est pas une playlist`).then(async msg => {
                            await call.bot.deleteMyMessage(msg, 14 * 1000)
                        })
                    }

                    return;

                } else if (parsed.host.match(/(www\.)?soundcloud.com/i)) {
                    console.log("C'est du soundcloud")
                    await message.reply(`❌ Soundcloud n'est pas encore supporté. Ptet bientôt ¯\\_(ツ)_/¯ :tm:`).then(async msg => {
                        await call.bot.deleteMyMessage(msg, 16 * 1000);
                    })

                    return;
                }

            } else {
                var argsSearch = await message.content.split(" ");

                var q = "";

                for (var i = 1; i < argsSearch.length; i++) {
                    q += argsSearch[i] + " ";
                }
                return call.bot.search_video(message, q);
            }


        } catch (error) {
            console.log("play error");
            console.log(error);

        }
    }

}