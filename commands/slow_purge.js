module.exports = {
    help: { name: "slow_purge" },
    run: async (call) => {
        //message, bot, bot.commands, args, content, prefix, cmd

        /*
        bot.member_Has_BAN_MEMBERS 
        bot.member_Has_KICK_MEMBERS 
        bot.member_Has_MANAGE_GUILD 
        bot.member_has_MANAGE_MESSAGES
        */

        try {

            if(!call.bot.admin_id.includes(call.message.member.id)) return console.log("Non autorisé");
            
            async function deleteMyMessage(message, time) {
                if (message.deletable()) await message.delete(time)
            }
            var NumberToDelete = await call.args[0]

            if (!call.args[0]) {
                return await message.reply("No args").then(async msg => {
                    await deleteMyMessage(msg, 6000);
                })
            } else if (!parseInt(NumberToDelete)) {
                console.log("pas un int")
                return await message.reply("Pas un int").then(async msg => {
                    await deleteMyMessage(msg, 9 * 1000)
                })
            }

            if (NumberToDelete <= 0) {
                return await message.reply("Met un nombre à delete").then(async msg => {
                    await deleteMyMessage(msg, 5000);
                })

            } else if (NumberToDelete > 100) {
                return await message.reply("Max 100 messages").then(async msg => {
                    await deleteMyMessage(msg, 6000);
                })

            } else if (!call.bot.member_has_MANAGE_MESSAGES) {
                return await message.reply("Tu as besoin de la perm MANAGE_MESSAGES").then(async msg => {
                    await deleteMyMessage(msg, 7000);
                })
            }

            var time = 0;
            var nmbr = 0;
            var nmbrdeleted = 0;
            setTimeout(async () => {
                await call.message.channel.fetchMessages({ limit: NumberToDelete })
                    .then(async messages => {
                        let msg = await messages.array()
                        NumberToDelete = await messages.size;
                        console.log("Number to delete: " + NumberToDelete);

                        var IntervalDelete = await setInterval(DeleteCollectionMessage, 1250)

                        async function DeleteCollectionMessage() {
                            try {
                                if (nmbrdeleted == NumberToDelete) {
                                    return clearInterval(IntervalDelete)
                                }
                                if (time == undefined || time == null) time = 750;

                                if (!msg || msg == undefined || msg == null) {
                                    return clearInterval(IntervalDelete)
                                }

                                let MsgToDelete = msg.shift()
                                if (!MsgToDelete.deletable) return
                                if (MsgToDelete.pinned) return;
                                //console.log(MsgToDelete)
                                if (MsgToDelete == null || MsgToDelete == undefined) {
                                    return clearInterval(IntervalDelete)
                                }
                                await nmbrdeleted++;
                                await MsgToDelete.delete(time)
                            } catch (error) {
                                //console.log(error);
                            }
                        }
                    });
            }, 3500);
        } catch (error) {
            console.log("Purge command problem: " + error)
        }
    }
}