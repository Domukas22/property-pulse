//
//
//
"use client";

// when fetching from a client component, you have to use useEffect
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FETCH_sinleProperty } from "@/utils/request";
import { loadBindings } from "next/dist/build/swc";
import PropertyHeader_IMAGE from "@/components/PropertyHeader_IMAGE";

interface Property {
  _id: { $oid: string };
  owner: string;
  name: string;
  type: string;
  description: string;
  location: {
    street: string;
    city: string;
    state: string;
    zipcode: string;
  };
  beds: number;
  baths: number;
  square_feet: number;
  amenities: string[];
  rates: {
    weekly: number;
    monthly: number;
  };
  seller_info: {
    name: string;
    email: string;
    phone: string;
  };
  images: string[];
  is_featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function SingleProperty_PAGE() {
  const { id } = useParams();

  const [property, SET_property] = useState<Property | null>(null);
  const [loading, SET_loading] = useState(true);

  useEffect(() => {
    // useEffect( async () => ... doesnt work, so create an async function inside
    async function fetchProperty() {
      if (!id) return;
      try {
        const property = await FETCH_sinleProperty(id);
        SET_property(property);
      } catch (error) {
        console.error("Failed to fetch property", error);
      } finally {
        SET_loading(false);
      }
    }

    if (property === null) {
      fetchProperty();
    }
  }, [id, property]);

  if (!property && !loading) {
    return <h1 className="text-center text-2xl font-bold mt-10">Property not found</h1>;
  }

  return (
    <>
      {!loading && property && (
        <>
          <PropertyHeader_IMAGE image={property.images[0]} />
        </>
      )}
    </>
  );
}
