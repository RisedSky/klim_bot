module.exports = {
    help: { name: "sondage", aliases: "poll" },
    run: async (call) => {
        var Discord = require("discord.js")
        //message, bot, bot.commands, args, content, prefix, cmd
        var Mess_Member = call.message.member;

        if (!call.bot.admin_id.includes(call.message.author.id)) {
            call.message.reply("Vous n'avez la permission pour faire cela.")
                .then(msg => {
                    call.bot.deleteUserMessage(msg, 8000)
                })
        }

        var cont = call.message.content
        //console.log(cont);

        b1 = cont.indexOf(" | ");
        b2 = cont.indexOf(" | ", b1 + 3);
        b3 = cont.indexOf(" | ", b2 + 3);
        if (b3 == -1) b3 = cont.length;
        b4 = cont.indexOf(" | ", b3 + 3);
        if (b4 == -1) b4 = cont.length;
        b5 = cont.indexOf(" | ", b4 + 3);
        if (b5 == -1) b5 = cont.length;
        b6 = cont.indexOf(" | ", b5 + 3);
        if (b6 == -1) b6 = cont.length;
        b7 = cont.indexOf(" | ", b6 + 3);
        if (b7 == -1) b7 = cont.length;
        b8 = cont.indexOf(" | ", b7 + 3);
        if (b8 == -1) b8 = cont.length;
        b9 = cont.indexOf(" | ", b8 + 3);
        if (b9 == -1) b9 = cont.length;

        //console.log(call.args);
        //console.log(call.args.join(" "));
        //console.log(call.args.join(" ").split(" | ")[0]);
        //console.log(call.args);
        //console.log(call.args);

        var question = cont.substr(call.prefix.length + 1 + call.cmd.length, call.args.join(" ").split(" | ")[0].length + 1);
        //console.log(`question = ${question}`);

        prop1 = cont.substr(b1 + 3, b2 - b1 - 3);
        prop2 = cont.substr(b2 + 3, b3 - b2 - 3);
        prop3 = cont.substr(b3 + 3, b4 - b3 - 3);
        prop4 = cont.substr(b4 + 3, b5 - b4 - 3);
        prop5 = cont.substr(b5 + 3, b6 - b5 - 3);
        prop6 = cont.substr(b6 + 3, b7 - b6 - 3);
        prop7 = cont.substr(b7 + 3, b8 - b7 - 3);
        prop8 = cont.substr(b8 + 3, b9 - b8 - 3);
        prop9 = cont.substr(b9 + 3);

        if (question == "" || prop1 == "" || prop2 == "") {
            call.message.reply("Aucune question/réponse définie.")
                .then(msg => {
                    call.bot.deleteUserMessage(msg, 8 * 1000)
                })
        }

        var embed = new Discord.RichEmbed()
            .setColor("DARK_PURPLE")
            .setAuthor(`Sondage par ${call.message.author.username}`, call.message.author.displayAvatarURL)
            .setTitle(question)
            .addField(prop1, ":one:", true)
            .addField(prop2, ":two:", true)
            //.setFooter(AskedBy_EmbedFooter(call.message.author))
            .setTimestamp();

        if (prop3 != "") embed.addField(prop3, ":three:", true);
        if (prop4 != "") embed.addField(prop4, ":four:", true);
        if (prop5 != "") embed.addField(prop5, ":five:", true);
        if (prop6 != "") embed.addField(prop6, ":six:", true);
        if (prop7 != "") embed.addField(prop7, ":seven:", true);
        if (prop8 != "") embed.addField(prop8, ":eight:", true);
        if (prop9 != "") embed.addField(prop9, ":nine:", true);

        call.message.channel.send(embed)
            .then(function (msg) {
                msg.react("1%E2%83%A3")
                setTimeout(function () { msg.react("2%E2%83%A3") }, 1000);
                setTimeout(function () { if (prop3 != "") msg.react("3%E2%83%A3") }, 2000);
                setTimeout(function () { if (prop4 != "") msg.react("4%E2%83%A3") }, 3000);
                setTimeout(function () { if (prop5 != "") msg.react("5%E2%83%A3") }, 4000);
                setTimeout(function () { if (prop6 != "") msg.react("6%E2%83%A3") }, 5000);
                setTimeout(function () { if (prop7 != "") msg.react("7%E2%83%A3") }, 6000);
                setTimeout(function () { if (prop8 != "") msg.react("8%E2%83%A3") }, 7000);
                setTimeout(function () { if (prop9 != "") msg.react("9%E2%83%A3") }, 8000);
            });


        function AskedBy_EmbedFooter(author) { return `Demandé par ${author.username} • ID: ${author.id}` }
    }
}