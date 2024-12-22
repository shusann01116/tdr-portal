export const BASE_URL = () => {
  let base: string;
  if (process.env.NODE_ENV === "development") {
    base = "localhost:3000";
  } else {
    base = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "";
  }
  return `https://${base}`;
};
