//
//
//
"use client";

// when fetching from a client component, you have to use useEffect
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FETCH_singleProperty } from "@/utils/request";
import { loadBindings } from "next/dist/build/swc";
import PropertyHeader_IMAGE from "@/components/PropertyHeader_IMAGE";
import Link from "next/link";
import Property_DETAILS from "@/components/Property_DETAILS";
import { FaArrowLeft } from "react-icons/fa";
import Spinner from "@/components/Spinner";
import Property_IMAGES from "@/components/Property_IMAGES";
import BookmarkBtn from "@/components/buttons/BookmarkBtn";
import ShareBtns from "@/components/buttons/ShareBtns";
import PropertyContact_FORM from "@/components/PropertyContact_FORM";

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
        const property = await FETCH_singleProperty(id);
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
      {loading && <Spinner loading={loading} />}
      {!loading && property && (
        <>
          <PropertyHeader_IMAGE image={property.images[0]} />
          <section>
            <div className="container m-auto py-6 px-6">
              <Link
                href="/properties"
                className="text-blue-500 hover:text-blue-600 flex items-center"
              >
                <FaArrowLeft className="mr-2" /> Back to Properties
              </Link>
            </div>
          </section>
          <section className="bg-blue-50">
            <div className="container m-auto py-10 px-6">
              <div className="grid grid-cols-1 900:grid-cols-70/30 w-full gap-6">
                <Property_DETAILS property={property} />

                {/* <!-- Sidebar --> */}
                <aside className="space-y-4">
                  <BookmarkBtn property={property} />
                  <ShareBtns property={property} />

                  <PropertyContact_FORM property={property} />
                </aside>
              </div>
            </div>
          </section>
          <Property_IMAGES images={property.images} />
        </>
      )}
    </>
  );
}
