//
//
//

import Link from "next/link";
import Property_CARD from "@/components/Property_CARD";
import { FETCH_allProperties } from "@/utils/request";

export default async function AllProperties_PAGE() {
  const properties = await FETCH_allProperties();

  return (
    <>
      <h1 className="text-3xl font-bold text-blue-500 mt-8 text-center">Our properties</h1>
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
