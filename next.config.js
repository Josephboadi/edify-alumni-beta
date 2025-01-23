/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "dblprzex8",
  },
  images: {
    domains: ["res.cloudinary.com", "utfs.io"],
  },
};

module.exports = nextConfig;
// const withNextIntl = require("next-intl/plugin")(
//   // Specify a custom path here
//   "./i18n.ts"
// );

// module.exports = withNextIntl({
//   reactStrictMode: false,
//   // Other Next.js configuration ...
// });

// const withNextIntl = require("next-intl/plugin")();

// module.exports = withNextIntl({
//   reactStrictMode: false,
//   // Other Next.js configuration ...
// });
