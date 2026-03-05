import 'dotenv/config';
import {REST, Routes} from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';

const token = process.env.TOKEN!;
const clientId = process.env.CLIENT_ID!;
const guildId = process.env.GUILD_ID!;

const commandsPath = path.join(__dirname, 'commands');

const rest = new REST({ version: '10' }).setToken(token);

async function main() {

    const files = fs.readdirSync(commandsPath);
    const commands: any[] = [];

    for (const file of files) {

        const fileDir = path.join(commandsPath, file);
        const module = await import(fileDir);
        if (!module.data || !module.execute) {
            console.log(`No es pot carregar: ${file}`);
            continue;
        }
        const data = module.data;
        commands.push(data.toJSON());
    }
    for (const datar of commands) {
        console.log(datar);
    }

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