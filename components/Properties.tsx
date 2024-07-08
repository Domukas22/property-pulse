//
//
//

"use client";

import { useEffect, useState } from "react";
import Property_CARD from "./Property_CARD";
import Spinner from "@/components/Spinner";
import Pagination from "@/components/Pagination";

export default function Properties() {
  const [properties, SET_properties] = useState([]);
  const [loading, SET_loading] = useState(true);

  const [page, SET_page] = useState(1);
  const [pageSize, SET_pageSize] = useState(6);
  const [totalProperty_COUNT, SET_totalPropertyCount] = useState(0);

  const HANLDE_pageChange = (new_PAGE) => {
    SET_page(new_PAGE);
  };

  useEffect(() => {
    const FETCH_properties = async () => {
      try {
        const res = await fetch(`/api/properties?page=${page}&pageSize=${pageSize}`);

        if (!res.ok) {
          throw new Error("Failed to fetch properties");
        }

        const data = await res.json();
        SET_properties(data.properties);
        SET_totalPropertyCount(data.totalProperty_COUNT);
      } catch (error) {
        console.error(error);
      } finally {
        SET_loading(false);
      }
    };
    FETCH_properties();
  }, [page, pageSize]);

  if (loading) return <Spinner loading={loading} />;

  return (
    <section className="px-4 py-6">
      <h1 className="text-3xl font-bold  mt-8 text-center">Our properties</h1>
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <Property_CARD key={property._id} property={property} />
            ))}
            <Pagination
              page={page}
              pageSize={pageSize}
              totalProperty_COUNT={totalProperty_COUNT}
              onPageChange={HANLDE_pageChange}
            />
          </div>
        ) : (
          <p>No properties found</p>
        )}
      </div>
    </section>
  );
}
