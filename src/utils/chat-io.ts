import readline from 'readline';

class ChatIO {
    rl!: readline.Interface;
    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    }

    async read(): Promise<string> {
        return new Promise((resolve, reject) => {
            this.rl.question(">> ", async (input) => {
                // if (input.toLowerCase() === '/exit') {
                //     this.rl.close();
                //     return resolve('');
                // }

                resolve(input);
            })
        })
    }

    write(output: string) {
        console.log("🤖:", output);
    }

    close() {
        this.rl.close();
    }
}

export default ChatIO;