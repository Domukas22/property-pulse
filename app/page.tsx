//
//
//

import Hero from "@/components/Hero";
import HomePoperty_CARDS from "@/components/HomePoperty_CARDS";
import InfoBoxes from "@/components/Infoboxes";
import Link from "next/link";
import CONNECT_db from "@/config/database";

export default function Home_PAGE() {
  return (
    <div>
      <Hero />
      <InfoBoxes />

      <HomePoperty_CARDS />
    </div>
  );
}
