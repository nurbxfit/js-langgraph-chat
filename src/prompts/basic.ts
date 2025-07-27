import { PromptTemplate } from "@langchain/core/prompts";

export const prompt = new PromptTemplate({
    template: "{content}",
    inputVariables: ["content"]
})