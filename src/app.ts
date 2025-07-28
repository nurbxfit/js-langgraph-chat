import type { ChatOllama } from "@langchain/ollama";
import ChatIO from "./utils/chat-io";
import { v4 as uuidv4 } from "uuid";
import { BinaryOperatorAggregate, CompiledStateGraph, END, MemorySaver, MessagesAnnotation, START, StateGraph, type Messages, type StateType } from "@langchain/langgraph";
import { chatPrompt } from "./prompts/basic";
import type { BaseMessage, MessageContent } from "@langchain/core/messages";

interface ChatConfig {
    configurable: { thread_id: string };
}

interface ChatState {
    messages: BaseMessage[];
}

class ChatApp {
    protected io!: ChatIO;
    protected app!: CompiledStateGraph<ChatState, any>;
    protected config!: ChatConfig;
    constructor(protected llm: ChatOllama, protected id: string = uuidv4()) {
        this.init();
    }

    init() {
        // create a memory server
        const memory = new MemorySaver();
        // init IO
        this.io = new ChatIO();
        // try using langraph to gives memory to the chat
        const graph = this.createGraph();
        this.app = graph.compile({ checkpointer: memory });
        this.config = { configurable: { thread_id: uuidv4() } };

    }

    private createGraph() {
        const graph = new StateGraph(MessagesAnnotation);

        // define the node graph
        graph
            .addNode("model", (state) => this.modelHandler(state))
            .addEdge(START, "model")
            .addEdge("model", END);

        return graph;

    }

    protected async modelHandler(state: typeof MessagesAnnotation.State) {
        const prompt = await chatPrompt.invoke(state); // chatPrompt =  ChatPromptTemplate.fromMessages
        const response = await this.llm.invoke(prompt);

        return { messages: [response] };
    }


    async listenInput() {
        const input = await this.io.read();
        if (input.toLowerCase() === '/exit') return undefined;
        return [
            {
                role: 'user',
                content: input
            }
        ]
    }

    writeOutput(data: StateType<{
        messages: BinaryOperatorAggregate<BaseMessage[], Messages>;
    }>) {
        const lastMessage = data.messages[data.messages.length - 1]?.content;
        const cleanedText = this.cleanMessage(lastMessage);
        this.io.write(cleanedText)
    }

    private cleanMessage(message: string | MessageContent | undefined) {
        const cleanedText = String(message).replace(/<think>[\s\S]*?<\/think>/, "").trim();
        return cleanedText;
    }


    async run() {
        while (true) {
            try {
                const input = await this.listenInput();
                if (!input) break;

                const response = await this.app.invoke({ messages: input }, this.config);
                // Ensure response has the correct shape for writeOutput
                if (response && Array.isArray(response.messages)) {
                    this.writeOutput(response as StateType<{ messages: BinaryOperatorAggregate<BaseMessage[], Messages>; }>);
                } else {
                    throw new Error("Response does not contain messages array.");
                }
            } catch (error) {
                console.error("Chat error:", error);
                this.io.write("Error occured");
                process.exit(1);
            }

        }

        this.cleanup();
    }

    async cleanup() {
        await this.io.close?.();
    }
}


export default ChatApp;