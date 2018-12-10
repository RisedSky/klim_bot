module.exports = {
    help: { name: "stop" },
    run: async (call) => {
        var message = call.message
            , Mess_Member = call.message.member
            , Mess_Channel = call.message.channel
        //message, bot, bot.commands, args, content, prefix, cmd

        if (message.guild.id !== "453464806062817281") { message.react("❌").then(async () => { message.delete(2500) }) }
        var server = call.bot.servers[message.guild.id]
        if (message.guild.voiceConnection) {
            for (var i = server.queue.length - 1; i >= 0; i--) {
                server.queue.splice(i, 1);
            }
            message.guild.voiceConnection.disconnect();
            message.channel.send(`:white_check_mark: Toutes les musiques ont été stoppés dans le salon : \`${message.guild.voiceConnection.channel.name}\` :wave:`).then(async msg => {
                await call.bot.deleteMyMessage(msg, 20 * 1000);
            })
        } else {
            await message.reply(call.bot.current_lang.Music_No_Music_Playing).then(async msg => {
                await call.bot.deleteMyMessage(msg, 5 * 1000)
            })
        }
    }
}