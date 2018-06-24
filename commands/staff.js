module.exports = {
    help: { name: "staff" },
    run: async (call) => {
        //message, bot, bot.commands, args, content, prefix, cmd
        var Mess_Member = call.message.member;
       
        call.message.reply("")
    }
}