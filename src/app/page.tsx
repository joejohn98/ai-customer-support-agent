"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";

export default function Home() {
  const [input, setInput] = useState("");

  const { messages, sendMessage, status } = useChat();

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input.trim()) return;

    sendMessage({ text: input });

    console.log("User input:", input);
    setInput("");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <header className="w-full">
        <h1 className="text-4xl font-bold text-center">AI Customer Support</h1>
      </header>
      <main className="flex-1 w-full max-w-4xl flex flex-col">
        {/* Chat window will go here */}
        <div className="flex-1 border rounded-lg my-4 p-4 bg-gray-50">
          {messages.length === 0 && (
            <p className="text-gray-500">
              Chat with our AI assistant to request a refund.
            </p>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`rounded-lg px-4 py-2 max-w-prose whitespace-pre-wrap ${
                message.role === "user"
                  ? "bg-gray-100 text-right ml-auto"
                  : "bg-blue-50 text-left"
              }`}
            >
              {message.parts.map((part, i) => {
                if (part.type === "text") {
                  return <span key={i}>{part.text}</span>;
                }
                return null;
              })}
            </div>
          ))}

          {(status === "submitted" || status === "streaming") && (
            <div className="bg-blue-50 text-left rounded-lg px-4 py-2 max-w-xs italic text-gray-400">
              Thinking...
            </div>
          )}
        </div>
        {/* Input form */}
        <form className="flex gap-2 mt-4" onSubmit={handleSubmit}>
          <input
            type="text"
            className="flex-1 border rounded-lg p-2"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={status === "submitted" || status === "streaming"}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-lg px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={status === "submitted" || status === "streaming"}
          >
            Send
          </button>
        </form>
      </main>
      <footer className="w-full text-center text-sm text-gray-500 mt-8">
        <p className="mb-2">Chat Status: {status}</p>
        <a href="/admin" className="hover:underline">
          Admin View
        </a>
      </footer>
    </div>
  );
}
