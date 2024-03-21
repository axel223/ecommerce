import Link from "next/link"
import { useRouter } from "next/router"
import * as React from "react";

const links = [
  { text: "index", route: "/" },
  { text: "LOGIN", route: "/login" },
  { text: "SIGN UP", route: "/signup" },
]
export function PageLinks() {
  const router = useRouter()

  return (
    <div className="mt-8 flex gap-3.5 self-center">
      <p className="grow text-zinc-800">{`Don't have an Account?`}</p>
      <Link
        className="relative mb-auto box-border shrink-0 cursor-pointer appearance-none rounded text-center text-black"
        href={"/signup"}
      >
        {"SIGN UP"}
      </Link>
    </div>
  )
}