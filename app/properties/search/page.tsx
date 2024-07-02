//
//
//

"use client";

import PropertySearch_FORM from "@/components/PropertySearch_FORM";
import Property_CARD from "@/components/Property_CARD";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";

export default function Search_PAGE() {
  const searchParams = useSearchParams();

  const [properties, SET_properties] = useState([]);
  const [loading, SET_loading] = useState(true);

  const location = searchParams.get("location");
  const propertyType = searchParams.get("propertyType");

  useEffect(() => {
    async function fetchProperties() {
      try {
        const response = await fetch(
          `/api/properties/search?location=${location}&propertyType=${propertyType}`
        );

        if (!response.ok) {
          SET_properties([]);
          throw new Error("Something went wrong...");
        }
        const data = await response.json();
        SET_properties(data);
        // ----------------------------------------
      } catch (error) {
        console.error(error);
      } finally {
        SET_loading(false);
      }
    }

    fetchProperties();
  }, [location, propertyType]);

  console.log(properties);

  if (loading) return <Spinner loading={loading} />;

  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <PropertySearch_FORM />
        </div>
      </section>

      <section className="px-4 py-6">
        <h1 className="text-3xl font-bold mt-8  mb-2">
          Search results for {`"${location}" in category "${propertyType}"`}
        </h1>
        <Link href="/properties" className="flex items-center text-blue-500 hover:underline mb-3">
          <FaArrowCircleLeft className="mr-2" />
          back to properties
        </Link>
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
