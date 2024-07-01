//
//
//

"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react"; // this is how you get user info on a client comp
import profileDefault from "@/assets/images/profile.png";
import { useState, useEffect } from "react";
import Spinner from "@/components/Spinner";
import { toast } from "react-toastify";

export default function Profile_PAGE() {
  const { data: session } = useSession();
  const profile_IMG = session?.user?.image || profileDefault;
  const profile_NAME = session?.user?.name || "John Doe";
  const profile_EMAIL = session?.user?.email || "email@gmail.com";

  const [properties, SET_properties] = useState([]);
  const [loading, SET_loading] = useState(true);

  useEffect(() => {
    const FETCH_userProperties = async (user_ID: string) => {
      if (!user_ID) return;

      try {
        const res = await fetch(`/api/properties/user/${user_ID}`);
        if (res.status === 200) {
          const data = await res.json();
          SET_properties(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        SET_loading(false);
      }
    };

    // Fetch user properties when session is available
    if (session?.user?.id) FETCH_userProperties(session.user.id);
  }, [session]);

  const HANDLE_deleteProperty = async (property_ID: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this property?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/properties/${property_ID}`, { method: "DELETE" });
      if (res.status === 200) {
        // Remove property from the UI
        const updated_PROPERTIES = properties.filter((property) => property._id !== property_ID);
        SET_properties(updated_PROPERTIES);
        toast.success("Property deleted successfully.");
      } else {
        toast.error("Failed to delete property.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete property.");
    }
  };

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx-20 mt-10">
              <div className="mb-4">
                <Image
                  className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                  src={profile_IMG || profileDefault}
                  alt="User"
                  width={200}
                  height={200}
                />
              </div>
              <h2 className="text-2xl mb-4">
                <span className="font-bold block">Name: </span>
                {profile_NAME}
              </h2>
              <h2 className="text-2xl">
                <span className="font-bold block">Email: </span>
                {profile_EMAIL}
              </h2>
            </div>

            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Your Listings</h2>

              {!loading && properties.length === 0 && (
                <p className="">You have no properties listed.</p>
              )}

              {loading ? (
                <Spinner loading={loading} />
              ) : (
                properties.map((property, index) => (
                  <div className="mb-10" key={index}>
                    <Link href={`/properties/${property._id}`}>
                      <img
                        className="h-32 w-full rounded-md object-cover"
                        src={property.images[0]}
                        alt=""
                        width={500}
                        height={100}
                      />
                    </Link>
                    <div className="mt-2">
                      <p className="text-lg font-semibold">{property.name}</p>
                      <p className="text-gray-600">
                        Address: {property.location.street} {property.location.city}{" "}
                        {property.location.state}
                      </p>
                    </div>
                    <div className="mt-2">
                      <Link
                        href={`/properties/${property._id}/edit`}
                        className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => HANDLE_deleteProperty(property._id)}
                        className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                        type="button"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
