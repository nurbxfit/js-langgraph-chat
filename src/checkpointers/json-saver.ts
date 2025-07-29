import { MemorySaver } from "@langchain/langgraph";
import type { Checkpoint, CheckpointMetadata, PendingWrite, SerializerProtocol } from "@langchain/langgraph-checkpoint";
import serializer from "../utils/storage-serializer";
import type { RunnableConfig } from "@langchain/core/runnables";

export class JsonMemorySaver extends MemorySaver {
    private filePath: string = 'chat_checkpoints.json'
    constructor(serde?: SerializerProtocol) {
        super(serde);
        this.initStorage();
    }

    async initStorage() {
        // check if filePath existed
        const file = Bun.file(this.filePath);
        if (await file.exists() && file.size > 0) {
            const data = await file.text();
            const parsed = JSON.parse(data);

            const deSerializedStorage = serializer.deserializeStorage(parsed);
            Object.assign(this.storage, deSerializedStorage);
        }
    }

    async flushToDisk() {
        const serialized = serializer.serializeStorage(this.storage);
        await Bun.write(this.filePath, JSON.stringify(serialized, null, 2));
    }

    override async put(config: RunnableConfig, checkpoint: Checkpoint, metadata: CheckpointMetadata): Promise<RunnableConfig> {
        const result = await super.put(config, checkpoint, metadata);
        await this.flushToDisk();
        return result;
    }

    override async putWrites(config: RunnableConfig, writes: PendingWrite[], taskId: string): Promise<void> {
        await super.putWrites(config, writes, taskId);
        await this.flushToDisk();
    }
}

