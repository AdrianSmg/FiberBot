import {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits,
    Role, ColorResolvable, ChannelType
} from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("announce")
    .setDescription("Enviar un anunci en format embed")
    .addStringOption(option =>
        option
            .setName("titol")
            .setDescription("titol de l'anunci")
            .setRequired(true)
    )
    .addStringOption(option =>
        option
            .setName("missatge")
            .setDescription("contingut de l'anunci")
            .setRequired(true)
    )
    .addRoleOption(option =>
        option
            .setName("rol")
            .setDescription("rol a mencionar (opcional)")
            .setRequired(false)
    )
    .addStringOption(option =>
        option
            .setName("color")
            .setDescription("color de l'embed (opcional)")
            .setRequired(false)
    )
    .addChannelOption(option =>
        option
            .setName("canal")
            .setDescription("canal")
            .addChannelTypes(ChannelType.GuildText, ChannelType.GuildAnnouncement)
            .setRequired(false)
    )
    .addStringOption(option =>
        option
            .setName("imatge")
            .setDescription("imatge (opcional)")
            .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages);

export async function execute(interaction: ChatInputCommandInteraction) {

    const title = interaction.options.getString("titol", true);
    const message = interaction.options.getString("missatge", true);
    const role = interaction.options.getRole("rol") as Role | null;
    const color = (interaction.options.getString("color") ?? "#F54927") as ColorResolvable;
    const image = interaction.options.getString("imatge", false);

    const selectedChannel = interaction.options.getChannel("canal");
    const targetChannel = (selectedChannel ?? interaction.channel);

    if (!targetChannel) {
        await interaction.reply({
            content: "Aquest canal no és vàlid per enviar-hi anuncis.",
            ephemeral: true
        });
        return;
    }

    const embed = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(message)
        .setFooter({ text: "Relacions Internacionals FIB" })
    if (image) embed.setImage(image);

    const content = role ? `<@&${role.id}>` : undefined;

    await targetChannel.send({
        content: content,
        embeds: [embed],
        allowedMentions: { parse: ["everyone"] },
    });

    await interaction.reply({
        content: "Anunci enviat al canal d'anuncis.",
        ephemeral: true,
    });
}