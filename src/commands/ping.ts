import {SlashCommandBuilder, ChatInputCommandInteraction} from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Response: pong")

export async function execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply('pong');
}