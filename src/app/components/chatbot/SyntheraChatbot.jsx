"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import bot from "/public/synthera_bot.png";
import { RiChatAiFill } from "react-icons/ri";

export default function SyntheraChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "ai", content: "Hi — I'm Synthera AI" },
    { role: "ai", content: "How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (open) {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content }),
      });

      const data = await res.json();
      if (data.reply) {
        const botMessage = { role: "ai", content: data.reply };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "ai", content: "Sorry, I couldn’t understand that." },
        ]);
      }
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "Oops! Something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed right-6 bottom-6 z-50">
      {/* Chat window */}
      {open && (
        <div className="w-80 md:w-96 h-[420px] bg-gray-900 shadow-xl rounded-2xl flex flex-col border border-gray-700 overflow-hidden">
          {/* Header */}
          <header className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
            <div className="flex items-center gap-3">
              <div className="border rounded-full p-2 border-[#37B6FF]">
                <Image src={bot} alt="synthera-bot" className="w-8" />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-200">
                  Synthera AI
                </div>
                <div className="text-xs text-[#37B6FF]">Shopping assistant</div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="p-1 cursor-pointer text-white text-lg"
            >
              ✕
            </button>
          </header>

          {/* Messages */}
          <main className="p-3 flex-1 overflow-y-auto space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                    m.role === "user"
                      ? "bg-slate-700 text-white"
                      : "bg-gray-800 text-white"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-800 text-white px-3 py-2 rounded-lg text-sm">
                  Typing...
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </main>

          {/* Input */}
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
                className="px-4 cursor-pointer py-2 bg-[#173E72] text-white rounded-lg hover:opacity-95 disabled:opacity-60"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-label="Open Synthera chat"
          className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white hover:scale-105 transition"
        >
          <RiChatAiFill className="text-3xl" />
        </button>
      )}
    </div>
  );
}
