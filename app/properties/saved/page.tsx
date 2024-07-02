//
//
//

"use client";
import Property_CARD from "@/components/Property_CARD";
import Spinner from "@/components/Spinner";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function SavedProperties_PAGE() {
  const [properties, SET_properties] = useState([]);
  const [loading, SET_loading] = useState(true);

  useEffect(() => {
    const GET_savedProperties = async () => {
      try {
        const res = await fetch("/api/bookmarks");

        if (!res.ok) {
          console.log(res.statusText);
          toast.error("Failed to fetch saved properties. Please try again.");
        }

        const data = await res.json();
        SET_properties(data);
      } catch (error) {
        console.log("Failed to fetch saved properties", error);
        toast.error("An error occurred. Please try again.");
      } finally {
        SET_loading(false);
      }
    };

    GET_savedProperties();
  }, []);

  if (loading) return <Spinner loading={loading} />;

  return (
    <>
      <h1 className="text-3xl font-bold mt-8 text-center">Saved properties</h1>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          {properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map((property) => (
                <Property_CARD key={property._id} property={property} />
              ))}
            </div>
          ) : (
            <p>No properties found</p>
          )}
        </div>
      </section>
    </>
  );
}
