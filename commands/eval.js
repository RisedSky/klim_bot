module.exports = {
    help: { name: "eval" },
    run: async (call) => {
        var msg = call.message
        //message, bot, bot.commands, args, content, prefix, cmd

        let owner_list = ["145632403946209280"];
        if (!owner_list.includes(msg.author.id)) return;
        if (!msg.author.username == "RisedSky") return;
        if (!msg.author.discriminator == "1250") return;

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

            msg.author.createDM().then(c => c.send(clean(evaled), { code: "xl", split: true }))
        } catch (err) {
            msg.author.createDM().then(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``)
        }
    }
}