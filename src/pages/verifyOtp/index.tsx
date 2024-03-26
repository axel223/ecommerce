import * as React from "react";
import OtpInput from "react-otp-input";
import { useState } from "react";
import { useRouter } from "next/router";

import { Header } from "~/components/header";
import { FormHeader } from "~/components/formHeader";
import { BannerStrip } from "~/components/bannerStrip";
import { PageLayout } from "~/components/layout";

import { api } from "~/utils/api";
import { OtpPageStrings } from "~/resourceStrings";

export const VerificationPage = () => {
  const router = useRouter();
  const [otp, setOtp] = useState("");

  const verifyOtpMutation = api().user.verifyOtp.useMutation({
    onSuccess: async () => {
      await router.push("/login");
    },
  });

  return (
    <div>
      <FormHeader
        heading={OtpPageStrings.heading}
        description={OtpPageStrings.description}
      />
      <form
        id="otp-form"
        className={"mt-[42px]"}
        onSubmit={() => {
          verifyOtpMutation.mutate({ otp });
        }}
      >
        <label htmlFor={"otp"} className=" text-black">
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
          {OtpPageStrings.verifyButton}
        </button>
      </form>
    </div>
  );
};

export default function Home() {
  return (
    <>
      <Header />
      <BannerStrip />
      <PageLayout>
        <VerificationPage />
      </PageLayout>
    </>
  );
}
