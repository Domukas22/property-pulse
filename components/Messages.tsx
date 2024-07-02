//
//
//

"use client";

import { useEffect, useState } from "react";
import Message from "./Message";
import Spinner from "./Spinner";

export default function Messages() {
  const [messages, SET_messages] = useState([]);
  const [loading, SET_loading] = useState(true);

  useEffect(() => {
    const GET_messages = async () => {
      try {
        const res = await fetch("/api/messages");

        if (res.status === 200) {
          const data = await res.json();
          SET_messages(data);
        }
        // ------------------------------------
      } catch (error) {
        console.error("Error fetching messages: ", error);
      } finally {
        SET_loading(false);
      }
    };

    GET_messages();
  }, []);

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Messages</h1>

          <div className="space-y-4">
            {loading && <Spinner loading={loading} />}
            {messages.length === 0 && !loading && <p>No messages yet...</p>}
            {messages.length > 0 &&
              !loading &&
              messages.map((message) => <Message key={message._id} message_OBJ={message} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
