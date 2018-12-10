module.exports = {
    help: { name: "search" },
    run: async (call) => {
        var message = call.message
            , Mess_Member = call.message.member
            , Mess_Channel = call.message.channel
        //message, bot, bot.commands, args, content, prefix, cmd

        if (!call.args[0]) {
            message.react("❌").catch(e => {
                if (e.name === "DiscordAPIError") return;
                console.log("Error search > " + e);
            })
            message.reply(`❌ Merci de mettre le titre d'une musique`).then(async msg => {
                await call.bot.deleteMyMessage(msg, 12 * 1000);
            })
            return;
        }

        call.bot.servers[message.guild.id].playit = false;

        var argsSearch = message.content.split(" ");
        var q = "";
        for (var i = 1; i < argsSearch.length; i++) {
            q += argsSearch[i] + " ";
        }
        call.bot.search_video(message, q);
    }
}