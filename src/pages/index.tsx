import { api } from "~/utils/api";
import * as React from "react";
import { Header } from "~/components/header";
import { BannerStrip } from "~/components/bannerStrip";
import {useRouter} from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Header />
      <BannerStrip />
      <div className="w-3/4 m-auto">
      </div>
    </>
  );
}
