
import { chatPrompt } from "./src/prompts/basic";
import { llm } from "./src/llm";
import ChatIO from "./src/utils/chat-io";
import { v4 as uuidv4 } from "uuid";
import { END, MemorySaver, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";


const chat_id = uuidv4();

const io = new ChatIO();
console.log('chat_id:', chat_id);

// try using langraph to gives memory to the chat
const graph = new StateGraph(MessagesAnnotation);

// define the node graph
graph.addNode("model", async (state: typeof MessagesAnnotation.State) => {
    const prompt = await chatPrompt.invoke(state);
    const response = await llm.invoke(prompt);

    console.log('DEBUG:', response);

    return { messages: [response] };
})
    .addEdge(START, "model")
    .addEdge("model", END);


// Add memory
const memory = new MemorySaver();

const app = graph.compile({ checkpointer: memory });
const config = { configurable: { thread_id: uuidv4() } };


console.log("Chat started. Type '/exit' to quit.");
while (true) {
    const input = await io.read();
    if (!input) break;

    const userInput = [
        {
            role: 'user',
            content: input
        }
    ];
    const response = await app.invoke({ messages: userInput }, config);
    const lastMessage = response.messages[response.messages.length - 1]?.content;
    // clean up remove the thinking part
    const cleanedText = String(lastMessage).replace(/<think>[\s\S]*?<\/think>/, "").trim()
    io.write(cleanedText);
}