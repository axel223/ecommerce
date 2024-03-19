import type { PropsWithChildren } from "react";

export const PageLayout = (props: PropsWithChildren) => {
    return (
      <div className="flex flex-col rounded bg-white pb-20">
        <main className="mt-10 flex w-[40%] flex-col self-center rounded-3xl border border-solid border-stone-300 bg-white px-16 py-12 text-base max-md:px-5">
            {props.children}
        </main>
      </div>
    );
  }