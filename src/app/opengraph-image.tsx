import { ImageResponse } from "next/og";

export const contentType = "image/png";

export const alt = "東京ディズニーリゾートポータル";
export const size = {
  width: 1200,
  height: 630,
};

export default async function Image() {
  const notosansJP = fetch(
    new URL("./NotoSansJP-Regular.ttf", import.meta.url),
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    <div
      style={{
        fontSize: 68,
        color: "#fff1f2",
        background: "#e11d48",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        paddingLeft: 50,
        justifyContent: "center",
      }}
    >
      🏰 東京ディズニーリゾートポータル
      <div
        style={{
          display: "flex",
          fontSize: 24,
        }}
      >
        <p>
          東京ディズニーリゾートの待ち時間を便利に簡単に確認できるポータルサイトです
          ✨
        </p>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "NotoSansJP-Regular",
          data: await notosansJP,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}