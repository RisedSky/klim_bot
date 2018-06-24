module.exports = {
	help: { name: "reload", aliases: ["r"] },
	run: async (call) => {
		var msg = call.message
		//message, bot, bot.commands, args, content, prefix, cmd

		if (!call.args[0]) return msg.reply("Must provide a command name to reload.");
		if (msg.author.id != "145632403946209280") return;
		// the path is relative to the *current folder*, so just ./filename.js
		try {
			delete require.cache[require.resolve(`./${call.args[0]}.js`)]
			msg.reply(`✅ The command \`${call.args[0]}\` has been reloaded`);
		} catch (error) {
			if (error.message.includes("Cannot find module")) {
				return msg.reply("The module doesn't exist !")
			}
			msg.channel.send(error.message)
		}
	}
}