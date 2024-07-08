//
//
//

import "@/assets/styles/globals.css";
import Auth_PROVIDER from "@/components/Auth_PROVIDER";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { GlobalProvider } from "@/context/GlobalContext";
import { ReactNode } from "react";
import "photoswipe/dist/photoswipe.css";

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
    <GlobalProvider>
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
    </GlobalProvider>
  );
};

export default Main_LAYOUT;
