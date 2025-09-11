"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import bot from "../../assets/synthera_bot.png";
import { RiChatAiFill } from "react-icons/ri";

export default function SyntheraChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "bot",
      text: "Hi — I'm Synthera AI.",
    },
    {
      id: 2,
      role: "bot",
      text: "Ask about outfits, sizes or browse the shop!",
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    // Close on Escape key
    function handleKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    // auto-scroll to latest message when open or messages change
    if (open)
      scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((s) => [
      ...s,
      { id: Date.now(), role: "user", text: userMessage },
    ]);
    setInput("");

    // Add loading state message
    const loadingId = Date.now() + 1;
    setMessages((s) => [
      ...s,
      { id: loadingId, role: "bot", text: "Typing..." },
    ]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();

      // Remove loading
      setMessages((s) => s.filter((m) => m.id !== loadingId));

      if (data.reply) {
        setMessages((s) => [
          ...s,
          { id: Date.now() + 2, role: "bot", text: data.reply },
        ]);
      } else {
        setMessages((s) => [
          ...s,
          {
            id: Date.now() + 3,
            role: "bot",
            text: "Sorry, I couldn't understand.",
          },
        ]);
      }
    } catch (error) {
      setMessages((s) => s.filter((m) => m.id !== loadingId));
      setMessages((s) => [
        ...s,
        {
          id: Date.now() + 4,
          role: "bot",
          text: "Oops! Something went wrong.",
        },
      ]);
    }
  };

  return (
    <div className="fixed right-6 bottom-6 z-50">
      {/* Chat panel */}
      {open && (
        <div className="w-80 md:w-96 h-[420px] bg-gray-900 shadow-xl rounded-2xl flex flex-col border border-gray-700 overflow-hidden">
          <header className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="border rounded-full p-2 border-primary">
                <Image src={bot} alt="synthera-bot" className="w-8" />
              </div>
              <div>
                <div className="text-sm font-semibold">Synthera AI</div>
                <div className="text-xs text-gray-500">Shopping assistant</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="p-1 cursor-pointer rounded-md text-white text-lg"
              >
                ✕
              </button>
            </div>
          </header>

          <main className="p-3 flex-1 overflow-y-auto space-y-3">
            {messages.map((m , idx) => (
              <div
                key={idx}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-lg ${
                    m.role === "user"
                      ? "bg-slate-700 text-white"
                      : "bg-gray-800 text-white"
                  }`}
                >
                  <div className="text-sm">{m.text}</div>
                </div>
              </div>
            ))}
            <div ref={scrollRef} />
          </main>

          <form
            onSubmit={handleSubmit}
            className="px-3 py-3 border-t border-gray-800"
          >
            <div className="flex items-center gap-2">
              <input
                type="text"
                aria-label="Type a message"
                className="flex-1 placeholder:text-white  bg-gray-800  px-3 py-2 rounded-lg border border-gray-700 focus:outline-none  focus:border-yellow-300"
                placeholder="Ask Synthera . . ."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                type="submit"
                className="px-3 cursor-pointer py-2 bg-primary text-white rounded-lg hover:opacity-95 disabled:opacity-60"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Floating launcher button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        title="Synthere ChatBot"
        aria-label="Open Synthera chat"
        className={`w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white text-lg font-semibold hover:scale-105 transition ${
          open && "hidden"
        }`}
      >
        <RiChatAiFill className="text-3xl" />
      </button>
    </div>
  );
}
