import fs from 'node:fs';
import path from 'node:path';
import {SlashCommandBuilder, ChatInputCommandInteraction} from "discord.js";

type Command = {
    data: SlashCommandBuilder;
    execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}

export const commandMap = new Map<string, Command>();

export async function loadCommands() {
    const commandsPath = path.join(__dirname, '..', 'commands');
    const files = fs.readdirSync(commandsPath);
    for (const file of files) {
        const fileDir = path.join(commandsPath, file);
        const module = await import(fileDir);
        if (!module.data || !module.execute) {
            console.log(`No es pot carregar: ${file}`);
            continue;
        }
        commandMap.set(module.data.name, {data: module.data, execute: module.execute});
    }
}