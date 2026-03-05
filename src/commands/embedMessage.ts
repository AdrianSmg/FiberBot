import {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    EmbedBuilder,
} from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("embedmessage")
    .setDescription("Publica l'anunci de resolució i verificació (RI)");

export async function execute(interaction: ChatInputCommandInteraction) {

    const channel = interaction.guild?.channels.cache.get("1478659629130059816");

    if (!channel || !channel.isTextBased()) {
        return interaction.reply({ content: "No trobo el canal d'anuncis.", ephemeral: true });
    }

    const embed = new EmbedBuilder()
        .setColor(0xF54927)
        .setTitle("📢 Anunci – Resolució provisional i verificació")
        .setDescription("Hola a tothom!\n\nUs informem de dues qüestions importants:")
        .addFields(
            {
                name: "📄 1. Resolució provisional de destinacions",
                value:
                    "Ja s’ha publicat la **resolució provisional amb les destinacions assignades**.\n" +
                    "Reviseu-la per comprovar **quina és la vostra universitat i ciutat de destinació**." +
                    "Recordeu que heu d'acceptar o rebutjar la vostra proposta de destinació!",
            },
            {
                name: "🪪 2. Verificació al servidor",
                value:
                    "Per poder accedir als **canals de la vostra destinació**, primer hem de **verificar la vostra identitat**.\n\n" +
                    "➡️ **Obriu un ticket** i envieu la informació que s’hi indica.\n\n" +
                    "Quan puguem verificar les dades, **us assignarem el rol de la vostra destinació** i podreu començar a conèixer la gent del vostre destí." +
                    "\n",
            },
        )
        .setImage("https://www.fib.upc.edu/sites/fib/files/images/fib/edifici-b6-principal-2020-700x300.png")
        .setFooter({ text: "RRII FIB" });

    await channel.send({
        content: "@everyone",
        embeds: [embed],
        allowedMentions: { parse: ["everyone"] },
    });

    await interaction.reply({
        content: "Anunci enviat al canal d'anuncis.",
        ephemeral: true,
    });
}