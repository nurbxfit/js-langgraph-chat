
import { llm } from "./src/llm";
import ChatApp, { type ChatConfig } from "./src/app";
import { v4 as uuidv4 } from 'uuid';
import { JsonStorageSerializer } from "./src/utils/storage-serializer";

// can be usefull when we implement persistence memory
const id = "00b33e0e-5cf0-441d-81f7-231b4e0a66dc" // uuidv4();
// console.log('id:', id);

const config: ChatConfig = {
    configurable: {
        thread_id: id
    }
}
const app = new ChatApp(llm, config);

app.run();


// // testing the serializer
// const serializer = new JsonStorageSerializer();
// const file = Bun.file("chat_checkpointer.json");
// if (await file.exists() && file.size > 0) {
//     const data = await file.text();
//     const parsed = JSON.parse(data);

//     const deSerializedStorage = serializer.deserializeStorage(parsed);
//     const serializedStorage = serializer.serializeStorage(deSerializedStorage);

//     console.log('result:', serializedStorage);
// } else {
//     console.log('file not found!');
// }

