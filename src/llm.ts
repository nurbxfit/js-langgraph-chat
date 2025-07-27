import { ChatOllama } from "@langchain/ollama";

export const llm = new ChatOllama({
    model: "deepseek-r1",
    temperature: 0,
    maxRetries: 2
});