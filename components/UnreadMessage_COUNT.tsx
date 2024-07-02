//
//
//

"use client";

import { useEffect, useState } from "react";

export default function UnreadMessage_COUNT({ session }) {
  const [count, SET_Count] = useState(0);

  useEffect(() => {
    if (!session) return;

    const FETCH_count = async () => {
      try {
        const res = await fetch("/api/messages/unread-count");

        if (res.ok) {
          const count = await res.json();
          SET_Count(count);
        }
      } catch (error) {
        console.error(error);
      }
    };

    FETCH_count();
  }, [session]);

  return (
    count > 0 && (
      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
        {count}
      </span>
    )
  );
}
