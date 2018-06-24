module.exports = {
    help: { name: "slow_purge" },
    run: async (call) => {
        //message, bot, bot.commands, args, content, prefix, cmd

        function deleteMyMessage(message, time) {
            if (message.deletable()) message.delete(time)
        }

        try {

            var NumberToDelete = message.content.substr(7);

            if (!args[1]) {
                message.reply("No args").then(function (msg) {
                    deleteMyMessage(msg, 6000);
                })

                return;
            } else if (!parseInt(NumberToDelete)) {
                console.log("pas un int")
                message.reply("Pas un int").then(function (msg) {
                    deleteMyMessage(msg, 9 * 1000)
                })
                return;
            }

            if (!BOT_MANAGE_MESSAGESPerm) {
                message.reply("J'ai pas la perm pour suppr les messages (MANAGE_MESSAGES)").then(function (msg) {
                    deleteMyMessage(msg, 15 * 1000)
                });
                return;
            } else if (NumberToDelete <= 0) {
                message.reply("Met un nombre à delete").then(function (msg) {
                    deleteMyMessage(msg, 5000);
                })
                return;

            } else if (NumberToDelete > 100) {
                message.reply("Max 100 messages").then(function (msg) {
                    deleteMyMessage(msg, 6000);
                })

                return;
            } else if (!member_has_MANAGE_MESSAGES) {
                message.reply("Tu as besoin de la perm MANAGE_MESSAGES").then(function (msg) {
                    deleteMyMessage(msg, 7000);
                })

                return;
            }

            var nmbr = 0;
            var nmbrdeleted = 0;
            setTimeout(() => {
                message.channel.fetchMessages({ limit: NumberToDelete })
                    .then(async messages => {
                        let msg = messages.array()
                        NumberToDelete = messages.size;
                        console.log("Number to delete: " + NumberToDelete);

                        var IntervalDelete = setInterval(DeleteCollectionMessage, 1250)

                        function DeleteCollectionMessage() {
                            try {
                                if (nmbrdeleted == NumberToDelete) {
                                    return clearInterval(IntervalDelete)
                                }
                                if (time == undefined || time == null) time = 750;
                                if (!message.deletable) return
                                if (message.pinned) return;

                                if (!msg || msg == undefined || msg == null) {
                                    return clearInterval(IntervalDelete)
                                }

                                let MsgToDelete = msg.shift()
                                console.log(MsgToDelete)
                                if (MsgToDelete == null || MsgToDelete == undefined) {
                                    return clearInterval(IntervalDelete)
                                }
                                nmbrdeleted++;
                                MsgToDelete.delete(time)
                            } catch (error) {
                                console.log(error);
                            }
                        }
                    });
            }, 3500);
        } catch (error) {
            console.log("Purge command problem: " + error)
        }
    }
}