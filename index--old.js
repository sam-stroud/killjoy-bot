const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });

client.once('ready', () => {
	console.log('Ready!');
});

const prefix = '!';

client.on('messageCreate', function(message) {
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;

	const commandBody = message.content.slice(prefix.length);
	const args = commandBody.split(' ');
	const command = args.shift().toLowerCase();

	switch (command) {
		case 'ping': {
			const timeTaken = Date.now() - message.createdTimestamp;
			message.reply(`Boing! This message had a latency of ${timeTaken}ms.`);
			break;
		}

		case 'sum': {
			const numArgs = args.map(x => parseFloat(x));
			const sum = numArgs.reduce((counter, x) => counter += x);
			message.reply(`The sum of all the arguments you provided is ${sum}!`);
			break;
		}

		case 'getusername': {
			// const user = message.member.user.tag;
			const user = message.member.client;
			message.reply(`Your username is: ${user}`);
			break;
		}
	}
});

client.login(token);