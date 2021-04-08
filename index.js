const fs = require("fs");
const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFolders = fs.readdirSync("./src/commands");
const eventFiles = fs
	.readdirSync("./src/events")
	.filter((file) => file.endsWith(".js"));

// Load all commands from commands directory
for (const folder of commandFolders) {
	const commandFiles = fs
		.readdirSync(`./src/commands/${folder}`)
		.filter((file) => file.endsWith(".js"));
	for (const file of commandFiles) {
		const command = require(`./src/commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

// Load all event handlers from events directory
for (const file of eventFiles) {
	const event = require(`./src/events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

client.login(config.token);
