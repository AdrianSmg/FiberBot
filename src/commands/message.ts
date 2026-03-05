import {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits,
    Role, ColorResolvable, ChannelType
} from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("message")
    .setDescription("Enviar un missatge")
    .addStringOption(option =>
        option
            .setName("missatge")
            .setDescription("contingut de l'anunci")
            .setRequired(true)
    )
    .addChannelOption(option =>
        option
            .setName("canal")
            .setDescription("canal")
            .addChannelTypes(ChannelType.GuildText, ChannelType.GuildAnnouncement)
            .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages);

export async function execute(interaction: ChatInputCommandInteraction) {

    const message = interaction.options.getString("missatge", true);

    const selectedChannel = interaction.options.getChannel("canal");
    const targetChannel = (selectedChannel ?? interaction.channel);

    if (!targetChannel) {
        await interaction.reply({
            content: "Aquest canal no és vàlid per enviar-hi anuncis.",
            ephemeral: true
        });
        return;
    }

    await targetChannel.send({
        content: message,
        allowedMentions: { parse: ["everyone"] },
    });

    await interaction.reply({
        content: "Anunci enviat al canal d'anuncis.",
        ephemeral: true,
    });
}