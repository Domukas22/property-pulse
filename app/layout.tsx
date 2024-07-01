//
//
//

import "@/assets/styles/globals.css";
import Auth_PROVIDER from "@/components/Auth_PROVIDER";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { ReactNode } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface MainLayout_PROPS {
  children: ReactNode;
}

export const metadata = {
  title: "PropertyPulse | Find the perfect rental",
  description: "PropertyPulse helps you find the perfect rental property.",
  keywords: "rent, rental, property, properties, real estate, house, apartment, condo",
};

const Main_LAYOUT = ({ children }: MainLayout_PROPS) => {
  return (
    <Auth_PROVIDER>
      <html lang="en">
        <body>
          <Nav />
          <main>{children}</main>
          <Footer />
          <ToastContainer />
        </body>
      </html>
    </Auth_PROVIDER>
  );
};

export default Main_LAYOUT;
