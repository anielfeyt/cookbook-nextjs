import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";

type ImageLoaderProps = {
  width?: number;
  height?: number;
};

export default function ImageLoader({
  width = 600,
  height = 600,
}: ImageLoaderProps) {
  const shimmer = (w: number, h: number) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#dbca9a" offset="20%" />
          <stop stop-color="#fff" offset="50%" />
          <stop stop-color="#dbca9a" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#dbca9a" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>`;

  const toBase64 = (str: string) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);

  return `data:image/svg+xml;base64,${toBase64(
    shimmer(width, height)
  )}` as PlaceholderValue;
}
