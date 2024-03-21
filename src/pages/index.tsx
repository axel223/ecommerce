import { api } from "~/utils/api";
import * as React from "react";
import { Header } from "~/components/header";
import { FormHeader } from "~/components/formHeader";
import { BannerStrip } from "~/components/bannerStrip";

function EcommerceLoginPage() {
  return (
    <div className="flex flex-col rounded bg-white pb-20">
      <main className="mt-10 flex w-1/2 flex-col self-center rounded-3xl border border-solid border-stone-300 bg-white px-16 py-12 text-base max-md:px-5">
        <FormHeader
          heading="Login"
          subHeading="Welcome back to ECOMMERCE"
          description="The next gen business marketplace"
        />
      </main>
    </div>
  );
}

export default function Home() {
  // const hello = api.post.hello.useQuery({ text: "from tRPC" });
  const cats = api().category.getAll.useQuery();
  // console.log('cats', cats)
  return (
    <>
      <Header />
      <BannerStrip />
      <div className="w-3/4 m-auto">
      <EcommerceLoginPage />
      </div>
    </>
  );
}
