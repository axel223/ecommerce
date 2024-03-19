import * as React from "react";
import { Header } from "~/components/header";
import { FormHeader } from "~/components/formHeader";
import { BannerStrip } from "~/components/bannerStrip";
import { OTPField } from "~/components/otpField";

export const VerificationPage = () => {
  return (
    <div className="flex flex-col rounded bg-white pb-20">
      <main className="mt-10 flex w-[40%] flex-col self-center rounded-3xl border border-solid border-stone-300 bg-white px-16 py-12 text-base max-md:px-5">
        <FormHeader
          heading="Verify your email"
          description="Enter the 8 digit code you have received on"
        />
        <form id="otp-form">
            <OTPField />
          <button
            type="submit"
            className=" .box-border mt-[40px] flex w-full shrink-0 cursor-pointer appearance-none flex-col items-center rounded bg-black px-6 py-4 text-center font-medium tracking-wider text-[white]"
          >
            {"VERIFY"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default function Home() {
  return (
    <>
      <Header />
      <BannerStrip />
      <VerificationPage />
    </>
  );
}
