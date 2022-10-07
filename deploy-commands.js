const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [
    // new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
    // new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
    // new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
    // new SlashCommandBuilder().setName('logmembers').setDescription('Displays Guild Member List in Console Log.'),
    // new SlashCommandBuilder().setName('logchannels').setDescription('Displays Guild Channel List in the console log.'),
    // new SlashCommandBuilder().setName('checkperm').setDescription('Console logs user perm'),
    // new SlashCommandBuilder().setName('getadmins').setDescription('Console logs admins'),
    // new SlashCommandBuilder().setName('getalladmins').setDescription('Console logs admins from db'),
    // new SlashCommandBuilder().setName('insertadmins').setDescription('Insert list of Admins to db'),
    // new SlashCommandBuilder().setName('checkadmins').setDescription('Check list of Admins against DB'),
]
    .map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);