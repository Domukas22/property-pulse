//
//
//

"use client";

import { USE_globalContext } from "@/context/GlobalContext";
import { format, formatDistanceToNow } from "date-fns";

import { useState } from "react";
import { toast } from "react-toastify";

export default function Message({ message_OBJ }) {
  const [read, SET_read] = useState(message_OBJ.read);
  const [deleted, SET_deleted] = useState(false);

  const { unreadMessage_COUNT, SET_unreadMessageCount } = USE_globalContext();

  const HANLDE_read = async () => {
    try {
      const res = await fetch(`/api/messages/${message_OBJ._id}`, {
        method: "PUT",
      });

      if (res.status === 200) {
        const { read } = await res.json();
        SET_read(read);
        SET_unreadMessageCount((prev) => (read ? prev - 1 : prev + 1));

        if (read) {
          toast.success("Message marked as read");
        } else {
          toast.success("Message marked as unread");
        }
      }

      if (!res.ok) {
        const error = await res.json();
        toast.error(error.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Couldn't update message...");
    }
  };

  const HANLDE_delete = async () => {
    try {
      const res = await fetch(`/api/messages/${message_OBJ._id}`, {
        method: "DELETE",
      });

      if (res.status === 200) {
        toast.success("Message deleted");
        SET_deleted(true);
        SET_unreadMessageCount((prev) => (read ? prev : prev - 1));
      }
    } catch (error) {
      console.log(error);
      toast.error("Couldn't delete message...");
    }
  };

  if (deleted) return null;

  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      {!read && (
        <div className="absolute top-2 right-2 bg-purple-600 text-white px-2 py-1 rounded-md">
          New
        </div>
      )}
      <h2 className="text-xl mb-4">
        <span className="font-bold">Property Inquiry: </span>
        {message_OBJ.property.name}
      </h2>
      <p>{message_OBJ.message}</p>

      <ul className="mt-4">
        <li>
          <strong>Name: </strong> {message_OBJ.sender.username}
        </li>

        <li>
          <strong>Reply Email: </strong>
          <a href={`mailto:${message_OBJ.email}`} className="text-blue-500">
            {message_OBJ.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone: </strong>
          <a href={`tel:${message_OBJ.phone}`} className="text-blue-500">
            {message_OBJ.phone}
          </a>
        </li>
        {GET_date(new Date(message_OBJ.createdAt))}
      </ul>
      <button
        onClick={HANLDE_read}
        className={`mt-4 mr-3 ${read ? "bg-gray-300" : "bg-blue-500 text-white"}  py-1 px-3 rounded-md`}
      >
        {read ? "Mark as unread" : "Mark as read"}
      </button>
      <button onClick={HANLDE_delete} className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md">
        Delete
      </button>
    </div>
  );
}

function GET_date(date: Date) {
  const relativeTime = formatDistanceToNow(date, { addSuffix: true });
  const formattedDate = format(date, "d. MMMM, yyyy"); // e.g., "2. June, 2024"

  return (
    <li>
      <strong>Received:</strong> {relativeTime} ({formattedDate})
    </li>
  );
}
