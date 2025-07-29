```
 _                       ____                 _         ____ _           _   
| |    __ _ _ __   __ _ / ___|_ __ __ _ _ __ | |__     / ___| |__   __ _| |_ 
| |   / _` | '_ \ / _` | |  _| '__/ _` | '_ \| '_ \   | |   | '_ \ / _` | __|
| |__| (_| | | | | (_| | |_| | | | (_| | |_) | | | |  | |___| | | | (_| | |_ 
|_____\__,_|_| |_|\__, |\____|_|  \__,_| .__/|_| |_|___\____|_| |_|\__,_|\__|
                  |___/                |_|        |_____|                    
                                                                                                                                                     
```


# langraph chat 🚀

This is a simple chat app I built using Langraph and Langchain.
Right now, it’s just a basic console-based interface where you can chat with a model.

It saves your chat history using JSON files, so even if you restart the app, you can continue the convo like nothing happened.

I built this mostly for fun (and learning), and I plan to add more stuff later, maybe a web interface, maybe more features, who knows.

Most of the demos I found online use Python, so I wanted to show how to do it with JavaScript/TypeScript using Bun instead.

---

[![Made with Bun](https://img.shields.io/badge/Made%20with-Bun-blue?logo=bun)](https://bun.sh/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Enabled-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Langchain](https://img.shields.io/badge/Langchain-AI-brightgreen?logo=langchain)](https://langchain.com/)

---

## Requirements
- [Bun](https://bun.sh/) - Fast JavaScript runtime
- [Langraph](https://langraph.com/) - Framework for building AI apps
- [Langchain](https://langchain.com/) - Framework for LLM-powered stuff
- [Node.js](https://nodejs.org/) - Needed for Bun
- [TypeScript](https://www.typescriptlang.org/) - Because types are cool

## Installation

```bash
bun install
```

## Usage

```bash
bun run dev
```

## Features
- Persistent chat history (so you don't lose your deep thoughts)
- Simple chat interface
- Built with Langraph and langchain
- Console-based (for now)

Just for fun, the ML system prompt is set up to sound like Dr. Gregory House from House M.D.  
So yeah, you can have a snarky chat with him.


## Notes
This is a console app for now. I’m thinking of adding a web UI later.

Chat history is saved in JSON, no database or fancy stuff.