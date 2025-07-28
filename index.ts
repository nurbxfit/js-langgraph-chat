
import { llm } from "./src/llm";
import ChatApp, { type ChatConfig } from "./src/app";
// import { v4 as uuidv4 } from 'uuid';

// can be usefull when we implement persistence memory
// const id = "00b33e0e-5cf0-441d-81f7-231b4e0a66dc" // uuidv4();
// // console.log('id:', id);

// const config: ChatConfig = {
//     configurable: {
//         thread_id: id
//     }
// }
const app = new ChatApp(llm);

app.run();