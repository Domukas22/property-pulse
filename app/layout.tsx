//
//
//

import "@/assets/styles/globals.css";
import Auth_PROVIDER from "@/components/Auth_PROVIDER";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { ReactNode } from "react";

interface MainLayout_PROPS {
  children: ReactNode;
}

const Main_LAYOUT = ({ children }: MainLayout_PROPS) => {
  return (
    <Auth_PROVIDER>
      <html lang="en">
        <body>
          <Nav />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </Auth_PROVIDER>
  );
};

export default Main_LAYOUT;
