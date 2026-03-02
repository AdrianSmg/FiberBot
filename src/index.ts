import 'dotenv/config';
import {Client, GatewayIntentBits} from 'discord.js';
import * as ping from './commands/ping';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
    ],
});

client.once('ready', () => {
    console.log('Ready!');
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.commandName == 'ping') {
        await interaction.reply('pong');
    }
});

client.login(process.env.TOKEN);