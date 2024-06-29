//
//
//

import InfoBox from "./InfoBox";

export default function InfoBoxes() {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox
            heading="For Renters"
            backgroundColor="bg-gray-100"
            textColor="text-gray-800"
            buttonInfo={{
              link: "/properties",
              backgroundColor: "bg-black",
              text: "Browse Properties",
            }}
          />

          <InfoBox
            heading="For Property Owners"
            backgroundColor="bg-blue-100"
            textColor="text-blue-800"
            buttonInfo={{
              link: "/properties/add",
              backgroundColor: "bg-blue-500",
              text: "Add Property",
            }}
          />
        </div>
      </div>
    </section>
  );
}
