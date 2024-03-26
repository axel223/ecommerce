import { bannerStripText } from "~/resourceStrings";

export const BannerStrip = () => {
  return (
    <div className="flex w-full items-center justify-center bg-zinc-100 px-16 py-2.5 text-sm font-medium text-black max-md:max-w-full max-md:px-5">
      <div className="flex items-start gap-5">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/0d0e43c6157dac81b4659d4a258ab52a17e6f73251e43b1bd0dd27e644dbdd6e?apiKey=9139e17dc5ec422a818dffbee82b8eff&"
          alt=""
          className="aspect-square w-4 shrink-0"
        />
        <div className="flex-auto self-stretch">{bannerStripText}</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/ff3effd7635170030964f3361bea79472b59f0f6634371170e446c93b7552c9e?apiKey=9139e17dc5ec422a818dffbee82b8eff&"
          alt=""
          className="aspect-square w-4 shrink-0"
        />
      </div>
    </div>
  );
};
