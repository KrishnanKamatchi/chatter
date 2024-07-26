"use client";

import { useEffect, useRef } from "react";

interface ChatBubbleProps {
  message: string;
  sender: string;
  position: "start" | "end";
  status: "Seen" | "Delivered" | "Sent";
}

export default function ChatBubble({
  message,
  sender,
  position,
  status,
}: ChatBubbleProps) {
  const now = new Date(Date.now());
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const time = `${hours}:${minutes}`;

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <div
      ref={ref}
      className={`chat ${position == "start" ? "chat-start" : "chat-end"}`}
    >
      <div className="chat-header">
        {sender}
        <time className="text-xs opacity-50 ml-2">{time}</time>
      </div>
      <div className="chat-bubble">{message}</div>
      <div className="chat-footer opacity-50">{status}</div>
    </div>
  );
}
