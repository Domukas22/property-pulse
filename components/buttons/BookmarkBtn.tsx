//
//
//

"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { FaBookmark } from "react-icons/fa";

export default function BookmarkBtn({ property }) {
  const { data: session } = useSession();
  const user_ID = session?.user?.id;

  const [IS_bookmarked, SET_bookmarked] = useState(false);
  const [loading, SET_loading] = useState(true);

  useEffect(() => {
    if (!user_ID) return SET_loading(false);

    const GET_bookmarkStatus = async () => {
      try {
        const res = await fetch("/api/bookmarks/check", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            property_ID: property._id,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          SET_bookmarked(data.IS_bookmarked);
        }
      } catch (error) {
        console.log("Failed to bookmark property", error);
        toast.error("An error occurred. Please try again.");
      } finally {
        SET_loading(false);
      }
    };

    GET_bookmarkStatus();
  }, [property._id, user_ID]);

  const HANDLE_click = async () => {
    if (!user_ID) {
      toast.error("Please sign in to bookmark this property.");
      return;
    }

    try {
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          property_ID: property._id,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        toast.success(data.message);
        SET_bookmarked(data.IS_bookmarked);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } catch (error) {
      console.log("Failed to bookmark property", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  if (loading)
    return (
      <button className="bg-gray-300 text-white font-bold w-full py-2 px-4 rounded-full">
        Loading...
      </button>
    );

  return (
    <button
      onClick={HANDLE_click}
      className={`${IS_bookmarked ? "bg-red-700 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"} text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center`}
    >
      <FaBookmark className="mr-2" /> {IS_bookmarked ? "Remove from saved" : "Save property"}
    </button>
  );
}
