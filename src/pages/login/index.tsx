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
    <div className="flex flex-col rounded bg-white pb-20">
      <main className="mt-10 flex w-[40%] flex-col self-center rounded-3xl border border-solid border-stone-300 bg-white px-16 py-12 text-base max-md:px-5">
        <FormHeader
          heading="Login"
          subHeading="Welcome back to ECOMMERCE"
          description="The next gen business marketplace"
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
            onClick={() => console.log("login")}
          >
            {"LOGIN"}
          </button>
        </form>
        <div className="mt-7 h-px shrink-0 bg-stone-300 max-md:max-w-full" />
        <div className="mt-8 flex gap-3.5 self-center">
          <p className="grow text-zinc-800">{`Don't have an Account?`}</p>
          <Link
            className="relative mb-auto box-border shrink-0 cursor-pointer appearance-none rounded text-center text-black"
            href={"/signup"}
          >
            {"SIGN UP"}
          </Link>
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
      <LoginPage />
    </>
  );
}
