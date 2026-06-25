"use client";

import { ChangeEvent, useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
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
          {/* Messages will be displayed here */}
          <p className="text-gray-500">
            Chat with our AI assistant to request a refund.
          </p>
        </div>
        {/* Input form */}
        <form className="flex gap-2 mt-4" onSubmit={handleSubmit}>
          <input
            type="text"
            className="flex-1 border rounded-lg p-2"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-lg px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </form>
      </main>
      <footer className="w-full text-center text-sm text-gray-500 mt-8">
        <a href="/admin" className="hover:underline">
          Admin View
        </a>
      </footer>
    </div>
  );
}
