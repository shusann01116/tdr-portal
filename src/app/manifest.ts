import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "東京ディズニーリゾートポータル",
    short_name: "東京ディズニーリゾートポータル",
    description:
      "東京ディズニーリゾートの待ち時間を便利に簡単に確認できるポータルサイトです。",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
