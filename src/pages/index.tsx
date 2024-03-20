import { api } from "~/utils/api";
import * as React from "react";
import { Header } from "~/components/header";
import { FormInput } from "~/components/formInput";
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
        <form>
          <FormInput
            label="Email"
            placeholder="Enter"
            name="email"
            id="email"
            protectedField={false}
            className="relative mt-2 box-border flex w-full shrink-0 flex-col rounded border border-solid border-stone-300 p-2.5"
          />
          <FormInput
            label="Password"
            placeholder="Enter"
            name="password"
            id="password"
            protectedField={true}
            className="relative mt-2 box-border flex w-full shrink-0 flex-col rounded border border-solid border-stone-300 p-2.5"
          />
          <button
            type="submit"
            className=" .box-border mt-[40px] flex w-full shrink-0 cursor-pointer appearance-none flex-col items-center rounded bg-black px-6 py-4 text-center font-medium tracking-wider text-[white]"
          >
            {"LOGIN"}
          </button>
        </form>
        <div className="mt-7 h-px shrink-0 bg-stone-300 max-md:max-w-full" />
        <div className="mt-8 flex gap-3.5 self-center">
          <p className="grow text-zinc-800">{`Don't have an Account?`}</p>
          <button
            className="relative mb-auto box-border shrink-0 cursor-pointer appearance-none rounded text-center text-black"
            type="button"
          >
            SIGN UP
          </button>
        </div>
      </main>
    </div>
  );
}

export default function Home() {
  // const hello = api.post.hello.useQuery({ text: "from tRPC" });
  const cats = api.category.getAll.useQuery();
  console.log('cats', cats)
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
