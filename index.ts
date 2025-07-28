
import { llm } from "./src/llm";
import ChatApp from "./src/app";


const app = new ChatApp(llm);

app.run();