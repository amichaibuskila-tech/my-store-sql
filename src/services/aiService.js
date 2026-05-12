const ModelClient = require("@azure-rest/ai-inference").default;
const { AzureKeyCredential } = require("@azure/core-auth");

const token = process.env.GITHUB_TOKEN;

const client = new ModelClient("https://models.inference.ai.azure.com", new AzureKeyCredential(token));

const getAIResponse = async (userMessage, history = []) => {
    try {
        const response = await client.path("/chat/completions").post({
            body: {
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    ...history,
                    { role: "user", content: userMessage }
                ],
                model: "gpt-4o-mini"
            }
        });

        if (response.status !== "200") {
            throw new Error(response.body.error.message);
        }

        return response.body.choices[0].message.content;
    } catch (error) {
        console.error("AI Service Error:", error);
        throw error;
    }
};

module.exports = { getAIResponse };