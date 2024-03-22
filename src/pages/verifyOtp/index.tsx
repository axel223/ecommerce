import * as React from "react";
import OtpInput from "react-otp-input";

import { Header } from "~/components/header";
import { FormHeader } from "~/components/formHeader";
import { BannerStrip } from "~/components/bannerStrip";
import { useState } from "react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

export const VerificationPage = () => {
  const router = useRouter();
  const [otp, setOtp] = useState("");

  const verifyOtpMutation = api().user.verifyOtp.useMutation({
    onSuccess: async () => {
      await router.push("/login");
    },
  });

  return (
    <div className="flex flex-col rounded bg-white pb-20">
      <main className="mt-10 flex w-[40%] flex-col self-center rounded-3xl border border-solid border-stone-300 bg-white px-16 py-12 text-base max-md:px-5">
        <FormHeader
          heading="Verify your email"
          description={`Enter the 8 digit code you have received on your Email`}
        />
        <form
          id="otp-form"
          onSubmit={() => {
            verifyOtpMutation.mutate({ otp });
          }}
        >
          <label htmlFor={"otp"} className="mb-3 mt-9 text-black">
            Code
          </label>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={8}
            inputType={"tel"}
            containerStyle={"flex items-center justify-between text-black"}
            inputStyle={
              "h-12 !w-12 rounded border-2 bg-transparent text-center outline-none"
            }
            renderInput={(props) => (
              <input {...props} maxLength={undefined} inputMode={undefined} />
            )}
          />
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
