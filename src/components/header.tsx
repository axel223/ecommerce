const navLinks = [
  { label: "Categories" },
  { label: "Sale" },
  { label: "Clearance" },
  { label: "New stock" },
  { label: "Trending" },
];

interface NavLinkProps {
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ children }) => <div>{children}</div>;

export const Header = () => {
  return (
    <header className="flex w-full flex-col bg-white pb-4">
      <div className="w-full items-end justify-center bg-white py-3 px-10 text-xs text-zinc-800">
        <nav className="flex justify-end gap-5">
          <NavLink>Help</NavLink>
          <NavLink>Orders & Returns</NavLink>
          <NavLink>Hi, John</NavLink>
        </nav>
      </div>
      <div className="flex w-full items-start gap-5 self-center px-10">
        <h1 className="shrink text-3xl font-bold text-black">
          ECOMMERCE
        </h1>
        <nav className="my-auto flex grow justify-center gap-5 self-stretch text-base font-semibold text-black">
          {navLinks.map(({ label }) => (
            <NavLink key={label}>{label}</NavLink>
          ))}
        </nav>
        <div className="flex justify-between gap-5">
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
