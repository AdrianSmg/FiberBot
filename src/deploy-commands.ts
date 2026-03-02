import 'dotenv/config';
import {REST, Routes} from 'discord.js';
import {data as pingData} from './commands/ping';

const token = process.env.TOKEN!;
const clientId = process.env.CLIENT_ID!;
const guildId = process.env.GUILD_ID!;

const commands = [pingData.toJSON()];
const rest = new REST({ version: '10' }).setToken(token);

async function main() {
    console.log('Registrant comandes al servidor de proves...');
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
        body: commands,
    });
    console.log('Comandes registrades!');
}

main().catch((err) => {
    console.error('Error registrant comandes.', err);
    process.exit(1);
});