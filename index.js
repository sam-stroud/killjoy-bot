const { Client, Intents } = require('discord.js');
const { token, owner, guildId } = require('./config.json');
const { getEmbed } = require('./killjoyEmbeds.js');
const { getAllAdmins, insertAdmin, getAdmin, deleteAdmin } = require('./models.js');

const client = new Client({ 
	intents: [
		Intents.FLAGS.GUILD_MEMBERS, 
		Intents.FLAGS.GUILDS, 
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.DIRECT_MESSAGES
	],
	partials: [
		'MESSAGE', 'CHANNEL',
	],
});


/* -- The Meat of it Below -- */

client.once('ready', () => {
    console.log('Ready!');
	// client.user.setUsername('Killjoy Bot');
	// client.user.setAvatar('./bot.png');
});

client.on('messageCreate', async message => {
	console.log('Received a Message.');
	const guild = await checkGuild(guildId);

	await guild.roles.fetch();
	await guild.members.fetch();
	
	const person = await guild.members.cache.get(message.author.id);
	if (await person.roles.cache.some(role => role.name === 'Smile')) {
		await console.log(person.user.username + " is an admin of " + guild.name + ".");
		
		const words = message.content.split(' ');
		let wordCntr = 0;
		words.forEach(word => {
			if (word == 'schedule' || word == 'Schedule' || word == 'event' || word == 'Event') {
				wordCntr++;
			}
		});
		
		if (wordCntr > 0) {
			message.reply('You would like to schedule an event.');
		} else {
			message.reply('Hi ' + person.user.username + ', what can I do for you? :D' + 
			'\nI can help you:\n\t 1. Schedule an Event!\n\nJust say "Schedule an Event", etc.')
			.then(() => console.log('Replied to DM.'))
			.catch(console.error);
		}
	}
});

// client.on('interactionCreate', async interaction => {
//     if (!interaction.isCommand()) return;

//     const { commandName } = interaction;

// 	switch (commandName) {
// 		case 'ping': {
// 			const timeTaken = Date.now() - interaction.createdTimestamp;
// 			await interaction.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
// 			break;
// 		}

//         case 'server': {
//             await interaction.reply(`Server Name: ${interaction.guild.name}\nTotal Members: ${interaction.guild.memberCount}`);
//             break;
//         }

// 		case 'user': {
// 			const guild = checkGuild(interaction.guildId);

// 			await guild.members
// 				.fetch(interaction.user.id)
// 				.then((usr) => {
// 					usr.send(interaction.user.tag);
// 				});

// 			await interaction.reply(`You: ${interaction.user}\nYour Id: ${interaction.user.id}`);
// 			break;
// 		}

// 		case 'logmembers': {
// 			const guild = checkGuild(interaction.guildId);

// 			if (guild != null) {
// 				guild.members
// 					.fetch()
// 					.then((members) => members.forEach((member) => console.log(member.user.username)),);
// 				await interaction.reply(`Member Info Logged in Console.`);
// 				break;
// 			} else {
// 				await interaction.reply(`Error in processing request.`);
// 				break;
// 			}
// 		}

// 		case 'logchannels': {
// 			const guild = checkGuild(interaction.guildId);

// 			if (guild != null) {
// 				guild.channels
// 					.fetch()
// 					.then((channels) => channels.forEach((channel) => console.log(channel.name)),);
// 				await interaction.reply(`Channel Info Logged in Console.`);
// 				break;
// 			} else {
// 				await interaction.reply(`Error in processing request.`);
// 				break;
// 			}
// 		}

// 		case 'checkperm': {
// 			const myBot = '949512327420575754';
// 			const guild = checkGuild(interaction.guildId);

// 			await guild.members
// 				.fetch(myBot)
// 				.then((members) => console.log(members.permissions.has("MANAGE_ROLES")));
// 			break;
// 		}

// 		// Converts a Map() of admins
// 		case 'getadmins': {
// 			const guild = checkGuild(interaction.guildId);
// 			if (guild != null) {
// 				await guild.members.fetch();
// 				await guild.roles.fetch();

// 				const gOwner = await guild.members.cache.find((o) => o.id === owner);
// 				const adminRole = await guild.roles.cache.find((r) => r.name === 'Smile');
// 				const adminMap = new Map([
// 					[gOwner.id, gOwner.user.username],
// 				]);

// 				await adminRole.members.forEach((mem) => adminMap.set(mem.user.id, mem.user.username));
// 				await console.log(adminMap);
// 			}
// 			break;
// 		}

// 		// Converts all db records into a Map()
// 		case 'getalladmins': {
// 			const guild = checkGuild(interaction.guildId);
// 			if (guild != null) {
// 				const adminMap = new Map();
// 				const allAdmins = getAllAdmins();
// 				let response = '';

// 				await allAdmins.then(function(result) {
// 					result.forEach((msg) => adminMap.set(msg.id, msg.username));
// 				});
// 				await adminMap.forEach((value, key) => {
// 					response += value + '\n';
// 				});
// 				await interaction.reply(response);
// 			}
// 			break;
// 		}

// 		// Creates a Map() of admins and sends them as inserts to db.
// 		case 'insertadmins': {
// 			const guild = checkGuild(interaction.guildId);
// 			if (guild != null) {
// 				await guild.roles.fetch();
// 				await guild.members.fetch();

// 				const gOwner = await guild.members.cache.find((o) => o.id === owner);
// 				const adminRole = await guild.roles.cache.find((r) => r.name === 'Smile');
// 				const adminMap = new Map([
// 					[gOwner.id, gOwner.user.username],
// 				]);

// 				await adminRole.members.forEach((mem) => adminMap.set(mem.user.id, mem.user.username));
// 				await adminMap.forEach((value, key) => {
// 					insertAdmin(key, value);
// 				});
// 			}
// 			break;
// 		}

// 		case 'checkadmins': {
// 			const guild = await checkGuild(interaction.guildId);
// 			if (guild != null) {
// 				await guild.roles.fetch();
// 				await guild.members.fetch();

// 				// Get Cached Map() of Admins
// 				const gOwner = await guild.members.cache.find((o) => o.id === owner);
// 				const adminRole = await guild.roles.cache.find((r) => r.name === 'Smile');
// 				const cachedAdmins = new Map([
// 					[gOwner.id, gOwner.user.username],
// 				]);
// 				await adminRole.members.forEach((mem) => cachedAdmins.set(mem.user.id, mem.user.username));

// 				// Get DB Map() of Admins
// 				const dbAdmins = getAllAdmins();
// 				const dbAdminsMap = new Map();
// 				await dbAdmins.then(function(response) {
// 					response.forEach((row) => dbAdminsMap.set(row.id, row.username));
// 				});

// 				// Insert or Delete Rows if necessary
// 				await cachedAdmins.forEach((v, k) => {
// 					const ae = getAdminExists(k, v);
// 					ae.then((bool) => {
// 						if (!bool) {
// 							insertAdmin(k, v);
// 							dbAdminsMap.set(k, v);
// 							console.log(`Inserted ${v}`);
// 						}
// 					});
// 				});
// 				await dbAdminsMap.forEach((v, k) => {
// 					if (!cachedAdmins.has(k)) {
// 						deleteAdmin(k, v);
// 						dbAdminsMap.delete(k);
// 						console.log(`Deleted ${v}`);
// 					}
// 				});

// 				await console.log('Cache: ');
// 				await console.log(cachedAdmins);
// 				await console.log('DB: ');
// 				await console.log(dbAdminsMap);
// 				await interaction.reply('Sent to console.');
// 			}
// 			break;
// 		}

// 				// Get DB stored Map() of Admins
// 				/* const adminMap = new Map();
// 				const allAdmins = getAllAdmins();
// 				await allAdmins.then(function(result) {
// 					result.forEach((msg) => adminMap.set(msg.id, msg.username));
// 				});

// 				// Compare Maps()
// 				let dbList;
// 				await cachedAdmins.forEach((value, key) => {
// 					dbList = getAdmin(key, value);
// 					await dbList.then(function(result) {
						
// 					})
// 				});
// 			}
// 		}*/
// 	}
// });


client.on('guildMemberAdd', async member => {
	if (member.user.bot) return;
	const guild = checkGuild(member.guild.id);

	if (guild != null) {
		await guild.roles.fetch();
		await guild.members.fetch();

		// Define Variables
		const newby = member.user;
		const aL = [owner];
		const newbyRole = guild.roles.cache.find((r) => r.name === 'Newcomer!');
		const adminRole = guild.roles.cache.find((r) => r.name === 'Smile');

		// Assign newby the Newcomer! role
		try {
			await member.roles.add(newbyRole);
			//await member.roles.remove(memberRole.id, `Not a member yet.`);
		} catch (err) {
			console.log(err);
		}

		// Build list of Admins
		await guild.roles
			.fetch(adminRole.id)
			.then((roles) => roles.members.forEach((mem) => aL.push(mem.user.id)),);

		// Send newby the welcome message
		const _msgn = getEmbed('newbyMsg', newby.username);
		newby.send({ embeds: [_msgn] });

		// Send admins the notification message
		for (let i = 0; i < aL.length; i++) {
			const _msga = getEmbed('adminMsg', newby.username);
			await guild.members
				.fetch(aL[i])
				.then((usr) => {
					usr.send({ embeds: [_msga] });
				});
		}
	}
});


/*
client.on('message', async message => {
	if (message.author.bot) return;
	if (message.channel.type === 'dm') {
		const prefix = '!';
		if (message.content.startsWith(prefix)) {
			const msgBody = message.content.slice(prefix.length);
			const args = msgBody.split(' ');
			const msg = args.shift().toLowerCase();


		} else { return; }
	}
});
*/

client.login(token);


/* -- Helper Functions -- */

function checkGuild(intGId) {
	const myGuild = client.guilds.cache.find((g) => g.id === intGId);
	if (!myGuild) {
		return console.log(`Can't find your guild lol.`);
	} else {
		return myGuild;
	}
}

function compareMaps(map1, map2) {
	if (map1.size !== map2.size) return false;

	for (const x of map1.entries()) {
		let exists;
		for (const y of map2.entries()) {
			exists = 0;
			if (x.value === y.value) {
				exists += 1;
			}
		}
		if (exists === 0) {
			return false;
		}
	}
}

async function getAdminExists(mid, musername) {
	const rec = getAdmin(mid, musername);
	const dbAdminMap = new Map();

	await rec.then(function(response) {
		response.forEach((row) => dbAdminMap.set(row.id, row.username));
	});

	return dbAdminMap.has(mid);
}
