
import { prompt } from "./src/prompts/basic";
import { llm } from "./src/llm";
import ChatIO from "./src/utils/chat-io";

const chain = prompt.pipe(llm);

const io = new ChatIO();

console.log("Chat started. Type 'exit' to quit.");
while (true) {
    const input = await io.read();
    if (!input) break;

    const response = await chain.invoke({ content: input });
    io.write(response.content as string);
}