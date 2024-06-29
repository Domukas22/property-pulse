//
//
//

import { FETCH_allProperties } from "@/utils/request";
import Property_CARD from "./Property_CARD";
import Link from "next/link";

export default async function HomePoperty_CARDS() {
  const properties = await FETCH_allProperties();
  const recent_PROPERTIES = properties.sort(() => Math.random() - Math.random()).slice(0, 3);

  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">Recent Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recent_PROPERTIES === 0 ? (
              <p>No Properties found</p>
            ) : (
              recent_PROPERTIES.map((property) => (
                <Property_CARD key={property._id} property={property} />
              ))
            )}
          </div>
        </div>
      </section>
      <section className="m-auto max-w-lg my-10 px-6">
        <Link
          href="/properties"
          className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >
          View All Properties
        </Link>
      </section>
    </>
  );
}
