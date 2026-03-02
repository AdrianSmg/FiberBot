import 'dotenv/config';
import {Client, GatewayIntentBits} from 'discord.js';
import {commandMap, loadCommands} from "./loaders/loadCommands";

async function main() {
    await loadCommands();
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
        const command = commandMap.get(interaction.commandName);
        if (!command) return;
        await command.execute(interaction);
    });

    client.login(process.env.TOKEN);

}

main().catch(console.error);