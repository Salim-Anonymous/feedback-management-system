/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  eslint:{
    ignoreDuringBuilds:true
  },
  //image
  images: {
    domains: ["picsum.photos", "images.unsplash.com","uploadthing.com","lh3.googleusercontent.com"],
  },
  // experimental: {
  //   esmExternals: false, // THIS IS THE FLAG THAT MATTERS
  // },
};
export default config;
