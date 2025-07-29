```
 _                       ____                 _         ____ _           _   
| |    __ _ _ __   __ _ / ___|_ __ __ _ _ __ | |__     / ___| |__   __ _| |_ 
| |   / _` | '_ \ / _` | |  _| '__/ _` | '_ \| '_ \   | |   | '_ \ / _` | __|
| |__| (_| | | | | (_| | |_| | | | (_| | |_) | | | |  | |___| | | | (_| | |_ 
|_____\__,_|_| |_|\__, |\____|_|  \__,_| .__/|_| |_|___\____|_| |_|\__,_|\__|
                  |___/                |_|        |_____|                    
```

# Langraph Chat 🚀

A simple chat app built with **Langraph** and **Langchain** using **Bun** and **TypeScript**.

> **Features:**
> - Persistent chat history (JSON file)
> - Console-based chat interface
> - Fun system prompt: Dr. Gregory House (House M.D.)
> - Easy setup and usage

---

[![Made with Bun](https://img.shields.io/badge/Made%20with-Bun-blue?logo=bun)](https://bun.sh/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Enabled-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Langchain](https://img.shields.io/badge/Langchain-AI-brightgreen?logo=langchain)](https://langchain.com/)

---

## Requirements

- [Bun](https://bun.sh/) — Fast JavaScript runtime
- [Langraph](https://langraph.com/) — Framework for building AI apps
- [Langchain](https://langchain.com/) — Framework for LLM-powered stuff
- [Node.js](https://nodejs.org/) — Needed for Bun
- [TypeScript](https://www.typescriptlang.org/) — Because types are cool

## Installation

```bash
bun install
```

## Usage

```bash
bun run dev
```

Type `/exit` in the chat console to quit.

---

## Known Issues

- Chat history is saved in a single JSON file (can get messy).
- JSON format isn't ideal for chat history, but works for now.
- File may get corrupted if the app crashes.
- If corrupted, delete the file and start over.

---

## Up Next

- Improve chat history management
- Switch to a better storage (e.g., database)
- Add a web interface
- Integrate tools (search, etc.)

---

## Notes

This is a demo app, built for fun and learning how to use Langraph and Langchain with Bun.

