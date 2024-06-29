//
//
//

import Image from "next/image";
import logo from "@/assets/images/logo-white.png";

export default function Footer() {
  const current_YEAR = new Date().getFullYear();

  return (
    <footer className="bg-gray-200 py-4 mt-24">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="mb-4 md:mb-0">
          <Image width={50} height={50} src={logo} alt="Logo" className="h-8 w-auto" />
        </div>
        <div className="flex flex-wrap justify-center md:justify-start mb-4 md:mb-0"></div>
        <div>
          <p className="text-sm text-gray-500 mt-2 md:mt-0">
            &copy; {current_YEAR} PropertyPulse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
