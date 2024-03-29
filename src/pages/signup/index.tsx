import * as React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";

import { api } from "~/utils/api";

import { Header } from "~/components/header";
import { FormInput } from "~/components/formInput";
import { FormHeader } from "~/components/formHeader";
import { BannerStrip } from "~/components/bannerStrip";
import { PageLayout } from "~/components/layout";

import { SignUpPageStrings } from "~/resourceStrings";

const FormSchema = z.object({
  name: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(3).max(20),
});
type FormType = z.infer<typeof FormSchema>;

export const SignUpPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormType>({
    resolver: zodResolver(FormSchema),
  });

  const generateOtpMutation = api().user.generateOtp.useMutation();

  const mutation = api().user.register.useMutation({
    onSuccess: async (params) => {
      generateOtpMutation.mutate();
      await router.push("/verifyOtp");
    },
  });

  return (
    <div>
      <FormHeader heading={SignUpPageStrings.heading} />
      <form
        onSubmit={handleSubmit(
          async (formData) => {
            mutation.mutate(formData);
            const userId = mutation.data;

            if (userId) {
              reset();
              toast.success("register successful");
            }
          },
          (errors) => {
            console.error(errors);
            toast.error("invalid Params");
          },
        )}
      >
        <FormInput<FormType>
          register={register}
          label="Name"
          placeholder="Enter"
          name="name"
          id="name"
          protectedField={false}
          className="relative mt-2 box-border flex w-full shrink-0 flex-col rounded border border-solid border-stone-300 p-2.5"
        />
        <FormInput<FormType>
          register={register}
          label="Email"
          placeholder="Enter"
          name="email"
          id="email"
          protectedField={false}
          className="relative mt-2 box-border flex w-full shrink-0 flex-col rounded border border-solid border-stone-300 p-2.5"
        />
        <FormInput<FormType>
          register={register}
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
          {SignUpPageStrings.signUpButton}
        </button>
      </form>
      <div className="mt-8 gap-3.5 w-full flex justify-center">
        <p className="text-zinc-800">{SignUpPageStrings.loginPrompt}</p>
        <Link
          className="relative mb-auto box-border shrink-0 cursor-pointer appearance-none rounded text-center text-black"
          href={"/login"}
        >
          {SignUpPageStrings.loginButton}
        </Link>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <>
      <Header />
      <BannerStrip />
      <PageLayout>
        <SignUpPage />
      </PageLayout>
    </>
  );
}
