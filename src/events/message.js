const config = require("../../config.json");
module.exports = {
	name: "message",
	once: false,
	execute(message, client) {
		if (!message.content.startsWith(config.prefix) || message.author.bot) {
			return;
		}

		const args = message.content
			.slice(config.prefix.length)
			.trim()
			.split(/ +/);
		const commandName = args.shift().toLowerCase();

		if (!client.commands.has(commandName)) {
			message.reply("Tat command don't exists");
			return;
		}

		const command = client.commands.get(commandName);

		try {
			command.execute(message, args);
		} catch (error) {
			console.error(error);
			message.reply("there was an error trying to execute that command!");
		}
	},
};
