import * as React from "react";
import { Header } from "~/components/header";
import { FormInput } from "~/components/formInput";
import { FormHeader } from "~/components/formHeader";
import { BannerStrip } from "~/components/bannerStrip";

export const SignUpPage = () => {
    return (
      <div className="flex flex-col rounded bg-white pb-20">
        <main className="mt-10 flex w-[40%] flex-col self-center rounded-3xl border border-solid border-stone-300 bg-white px-16 py-12 text-base max-md:px-5">
          <FormHeader
            heading="Create your account"
          />
          <form>
          <FormInput
              label="Name"
              placeholder="Enter"
              name="name"
              id="name"
              protectedField={false}
              className="relative mt-2 box-border flex w-full shrink-0 flex-col rounded border border-solid border-stone-300 p-2.5"
            />
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
              {"CREATE ACCOUNT"}
            </button>
          </form>
          <div className="mt-8 flex gap-3.5 self-center">
            <p className="grow text-zinc-800">Have an Account?</p>
            <button
              className="relative mb-auto box-border shrink-0 cursor-pointer appearance-none rounded text-center text-black"
              type="button"
            >
              LOGIN
            </button>
          </div>
        </main>
      </div>
    );
  }
  
export default function Home() {
  return (
    <>
      <Header />
      <BannerStrip />
      <SignUpPage />
    </>
  );
}