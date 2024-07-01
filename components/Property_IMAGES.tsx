//
//
//

import Image from "next/image";
export default function Property_IMAGES({ images }) {
  return (
    <section className="bg-blue-50 p-4">
      <div className="container mx-auto">
        {images.length === 1 ? (
          <Image
            src={images[0]}
            alt=""
            width={1800}
            height={400}
            // priority={true}
            className="object-cover h-[400] mx-auto rounded-xl"
          />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {images.map((image, index) => (
              <div
                className={images.length === 3 && index === 2 ? "col-span-2" : "col-span-1"}
                key={index}
              >
                <Image
                  key={index}
                  src={image}
                  alt=""
                  width={800}
                  height={400}
                  // priority={true}
                  className="object-cover h-[400] w-full rounded-xl"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
