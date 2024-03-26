import * as React from "react";
import { Header } from "~/components/header";
import { BannerStrip } from "~/components/bannerStrip";

export default function Home() {
  return (
    <>
      <Header />
      <BannerStrip />
      <div className="w-3/4 m-auto">
      </div>
    </>
  );
}
