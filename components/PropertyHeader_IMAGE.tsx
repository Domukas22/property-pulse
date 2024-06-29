//
//
//

import Image from "next/image";

export default function PropertyHeader_IMAGE({ image }) {
  return (
    // <!-- Property Header Image -->
    <section>
      <div className="container-xl m-auto">
        <div className="grid grid-cols-1">
          <Image
            src={`/images/properties/${image}`} // taken from the public folder
            alt=""
            className="object-cover h-[400px] w-full"
            width="1800"
            height={400}
          />
        </div>
      </div>
    </section>
  );
}
