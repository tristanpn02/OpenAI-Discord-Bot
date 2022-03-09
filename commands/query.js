const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('query')
        .setDescription('Queries OpenAI')

        .addStringOption(option =>
            option.setName('input')
                .setDescription('The query'))

        .addBooleanOption(option =>
            option.setName('private')
                .setDescription('IF True: Other\'s wont see this.'))

        .addBooleanOption(option =>
            option.setName('hidequery')
                .setDescription('IF True: I wont relay the query.')),

    async execute(interaction) {
        const hideQuery = typeof(interaction.options.getBoolean('hidequery')) != "undefined"
            ? interaction.options.getBoolean('hidequery')
            : false;
        
        const private = typeof(interaction.options.getBoolean('private')) != "undefined"
            ? interaction.options.getBoolean('private')
            : false;

        const { Configuration, OpenAIApi } = require("openai");

        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const openai = new OpenAIApi(configuration);

        const response = await openai.createCompletion("text-davinci-001", {
            prompt: interaction.options.getString('input'),
            temperature: 0.3,
            max_tokens: 100,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        });

        const output = {
            content: (hideQuery
                ? "" : "**" + interaction.options.getString('input') + "**")
                + response.data.choices[0].text,

            ephemeral: private
        }

        await interaction.reply(output);
    },
};