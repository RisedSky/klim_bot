module.exports = {
    help: { name: "say" },
    run: async (call) => {
        var Mess_Member = call.message.member;
        if (!call.bot.admin_id.includes(Mess_Member.id)) return call.message.reply(`Vous n'êtes pas autorisé à faire cette commande.`)

        call.message.channel.send(call.args.join(" "))
        if (call.message.deletable) return call.message.delete()
    }
}