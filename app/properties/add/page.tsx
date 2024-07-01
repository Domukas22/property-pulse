//
//
//

import AddProperty_FORM from "@/components/AddProperty_FORM";
import { useState } from "react";

// create the starting useSatte according ot the form

export default function AddProperty_PAGE() {
  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <AddProperty_FORM />
        </div>
      </div>
    </section>
  );
}
