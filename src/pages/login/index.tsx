import * as React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/router";

import { api } from "~/utils/api";

import { Header } from "~/components/header";
import { FormInput } from "~/components/formInput";
import { FormHeader } from "~/components/formHeader";
import { BannerStrip } from "~/components/bannerStrip";
import { PageLayout } from "~/components/layout";

import { LoginPageStrings } from "~/resourceStrings";

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(20),
});
type FormType = z.infer<typeof FormSchema>;

function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormType>({
    resolver: zodResolver(FormSchema),
  });

  const mutation = api().user.login.useMutation({
    onSuccess: async () => {
      await router.push("/interests");
    },
  });

  return (
    <div>
      <FormHeader
        heading={LoginPageStrings.heading}
        subHeading={LoginPageStrings.subHeading}
        description={LoginPageStrings.description}
      />
      <form
        onSubmit={handleSubmit(
          async (formData) => {
            mutation.mutate(formData);
            const response = mutation.data;
            if (response) {
              reset();
              toast.success("Login successful");
            }
          },
          (errors) => {
            console.error(errors);
            toast.error("invalid email or password");
          },
        )}
      >
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
          {LoginPageStrings.loginButton}
        </button>
      </form>
      <div className="mt-7 h-px shrink-0 bg-stone-300" />
      <div className="mt-8 flex w-full justify-center gap-3.5">
        <p className="text-zinc-800">{LoginPageStrings.signUpPrompt}</p>
        <Link
          className="relative mb-auto box-border shrink-0 cursor-pointer appearance-none rounded text-center text-black"
          href={"/signup"}
        >
          {LoginPageStrings.signUpButton}
        </Link>
      </div>
    </div>
  );
}
export default function Home() {
  return (
    <>
      <Header />
      <BannerStrip />
      <PageLayout>
        <LoginPage />
      </PageLayout>
    </>
  );
}
