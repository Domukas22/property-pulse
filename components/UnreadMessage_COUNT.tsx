//
//
//

"use client";

import { USE_globalContext } from "@/context/GlobalContext";
import { useEffect, useState } from "react";

export default function UnreadMessage_COUNT({ session }) {
  const { unreadMessage_COUNT, SET_unreadMessageCount } = USE_globalContext();

  useEffect(() => {
    if (!session) return;

    const FETCH_count = async () => {
      try {
        const res = await fetch("/api/messages/unread-count");

        if (res.ok) {
          const count = await res.json();
          SET_unreadMessageCount(count);
        }
      } catch (error) {
        console.error(error);
      }
    };

    FETCH_count();
  }, [session]);

  return (
    unreadMessage_COUNT > 0 && (
      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
        {unreadMessage_COUNT}
      </span>
    )
  );
}
