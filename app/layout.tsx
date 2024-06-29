//
//
//

import "@/assets/styles/globals.css";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { ReactNode } from "react";

interface MainLayout_PROPS {
  children: ReactNode;
}

const Main_LAYOUT = ({ children }: MainLayout_PROPS) => {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default Main_LAYOUT;
