import { api } from "~/utils/api";
import { appName, header, navLinks } from "~/resourceStrings";
import { useRouter } from "next/router";

export const Header = () => {
  const loggedIn = true;
  const displayName = "Jon";

  const router = useRouter();
  const logoutMutation = api().user.logout.useMutation({
    onSuccess: async () => {
      await router.push("/login");
    },
  });

  return (
    <header>
      <div className="w-full bg-white">
        <div className="flex h-[35px] w-full justify-end">
          <div className="mr-10 mt-2 flex items-center gap-4 text-[12px] font-light">
            {header?.map((item: string, index: number) => (
              <p className="cursor-pointer text-black" key={index}>
                {item}
              </p>
            ))}
            {loggedIn && (
              <p className="cursor-pointer text-black">Hi, {displayName}</p>
            )}
            {loggedIn && (
              <p
                onClick={() => {
                  logoutMutation.mutate();
                }}
                className={
                  "cursor-pointer text-black underline duration-200 hover:scale-[1.1] hover:text-gray-600 hover:transition"
                }
              >
                Logout
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="mx-10 flex h-[65px] items-center justify-between">
        <div className="text-[32px] font-bold">{appName}</div>
        <nav className="-ml-16 flex items-center gap-8 text-[16px] font-semibold">
          {navLinks.map((label) => (
            <div key={label}>{label}</div>
          ))}
        </nav>
        <div className="flex justify-between gap-9">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c9f44306bbd0e51cef956764fb35d9e4b335c6ceedf4ac4305b4a39d615e8c5b?apiKey=9139e17dc5ec422a818dffbee82b8eff&"
            alt=""
            className="aspect-square w-8 shrink-0"
          />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/7b5a1d1ea050cd8214a3c6b75f35155739321540846412f1523e93187ba89f96?apiKey=9139e17dc5ec422a818dffbee82b8eff&"
            alt=""
            className="aspect-square w-8 shrink-0"
          />
        </div>
      </div>
    </header>
  );
};
