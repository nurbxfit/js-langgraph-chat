import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOllama } from "@langchain/ollama";
import readline from 'readline';

const chat = new ChatOllama({
    model: "llama3.1",
    temperature: 0,
    maxRetries: 2
});

const prompt = new PromptTemplate({
    template: "{content}",
    inputVariables: ["content"]
})

const chain = prompt.pipe(chat);


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function askQuestion() {
    rl.question(">> ", async (input) => {
        if (input.toLowerCase() === '/exit') {
            rl.close();
            return;
        }

        const result = await chain.invoke({ content: input });
        console.log("🤖:", result.content);

        // Ask again
        askQuestion();
    })
}

console.log("Chat started. Type 'exit' to quit.");
askQuestion();