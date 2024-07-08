//
//
//

import Link from "next/link";
import Property_CARD from "@/components/Property_CARD";
import { FETCH_allProperties } from "@/utils/request";
import PropertySearch_FORM from "@/components/PropertySearch_FORM";
import Properties from "@/components/Properties";

export default async function AllProperties_PAGE() {
  const properties = await FETCH_allProperties();

  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <PropertySearch_FORM />
        </div>
      </section>

      <Properties />
    </>
  );
}
