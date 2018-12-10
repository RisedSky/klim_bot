module.exports = {
    help: { name: "pause" },
    run: async (call) => {
        var message = call.message
            , Mess_Member = call.message.member
            , Mess_Channel = call.message.channel
        //message, bot, bot.commands, args, content, prefix, cmd

        var server = call.bot.servers[message.guild.id]
        if (!server.dispatcher) {
            //console.log("No dispatcher")
            message.reply(`❌ Aucune musique en cours d'écoute`).then(async msg => {
                await call.bot.deleteMyMessage(msg, 15 * 1000)
            });
            return;

        } else if (!Mess_Member.voiceChannel.name === message.guild.voiceConnection.channel.name) {
            message.reply(`❌ Tu n'es pas dans le même salon vocal que moi`)
                .then(async msg => {
                    await call.bot.deleteMyMessage(msg, 12 * 1000);
                })
            return;
        }

        if (server.dispatcher_paused) {
            server.dispatcher.resume();
            server.dispatcher_paused = false;
            message.reply(`:white_check_mark: La musique est désormais reprise :play_pause: :headphones:`).then(async msg => {
                await call.bot.deleteMyMessage(msg, 20 * 1000)
            })
        } else {
            server.dispatcher.pause();
            server.dispatcher_paused = true;
            message.reply(`:white_check_mark: La musique est désormais en pause :stop_button: :headphones:`).then(async msg => {
                await call.bot.deleteMyMessage(msg, 20 * 1000)
            })
        }

    }
}