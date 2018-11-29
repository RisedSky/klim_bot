module.exports = {
    help: { name: "eval" },
    run: async (call) => {
        const message = call.message
            , channel = message.channel

        //message, bot, bot.commands, args, content, prefix, cmd

        let owner_list = call.bot.admin_id
        if (!owner_list.includes(message.author.id)) return;
        //if (!message.author.username == "KLIM RisedSky") return;
        //if (!message.author.discriminator == "1250") return;

        function clean(text) {
            if (typeof (text) === "string")
                return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else
                return text;
        }

        try {
            const code = call.content;
            let evaled = eval(code);

            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);

            await message.author.createDM().then(async c => {
                await c.send(clean(evaled), { code: "xl", split: true })
            })
        } catch (err) {
            await message.author.createDM().then(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``)
        }
    }
}