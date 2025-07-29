export class JsonStorageSerializer {
    deserializeStorage(storage:
        Record<string, Record<string, Record<string, [{ [key: string]: number }, { [key: string]: number }, string | undefined]>>>

    ): Record<string, Record<string, Record<string, [Uint8Array, Uint8Array, string | undefined]>>> {

        const result: Record<string, Record<string, Record<string, [Uint8Array, Uint8Array, string | undefined]>>> = {};

        for (const [threadId, threadData] of Object.entries(storage)) {
            result[threadId] = {}
            for (const [namespace, namespaceData] of Object.entries(threadData)) {
                result[threadId][namespace] = {};
                for (const [checkpointId, [checkpoint, metadata, parentId]] of Object.entries(namespaceData)) {

                    result[threadId][namespace][checkpointId] = [
                        toUint8Array(checkpoint),
                        toUint8Array(metadata),
                        parentId
                    ];
                }
            }
        }
        return result;
    }

    serializeStorage(
        storage: Record<string, Record<string, Record<string, [Uint8Array, Uint8Array, string | undefined]>>>
    ): Record<string, Record<string, Record<string, [{ [key: string]: number }, { [key: string]: number }, string | undefined]>>> {
        const result: Record<string, Record<string, Record<string, [{ [key: string]: number }, { [key: string]: number }, string | undefined]>>> = {}

        for (const [threadId, threadData] of Object.entries(storage)) {
            result[threadId] = {}
            for (const [namespace, namespaceData] of Object.entries(threadData)) {
                result[threadId][namespace] = {};
                for (const [checkpointId, [checkpoint, metadata, parentId]] of Object.entries(namespaceData)) {

                    result[threadId][namespace][checkpointId] = [
                        fromUint8Array(checkpoint),
                        fromUint8Array(metadata),
                        parentId
                    ];
                }
            }
        }

        return result;
    }
}

export default new JsonStorageSerializer();

function toUint8Array(obj: { [key: string]: number }) {
    const objArray = Object.keys(obj)
        .sort((a, b) => Number(a) - Number(b))
        .map(key => obj[key])
        .filter((value): value is number => typeof value === "number");

    return new Uint8Array(objArray);
}

function fromUint8Array(obj: Uint8Array) {
    const result: Record<string, number> = {};
    obj.forEach((val, index) => result[index] = val);
    return result;
}