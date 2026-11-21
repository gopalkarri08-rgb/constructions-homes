/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
      { source: "/get-started", destination: "/signup", permanent: false },
      { source: "/stage/1", destination: "/stage/structural-construction", permanent: false },
      { source: "/stage/2", destination: "/stage/masonry-concealed-services", permanent: false },
      { source: "/stage/3", destination: "/stage/plastering", permanent: false },
      { source: "/stage/4", destination: "/stage/flooring-tiles", permanent: false },
      { source: "/stage/5", destination: "/stage/doors-windows", permanent: false },
      { source: "/stage/6", destination: "/stage/interior-woodwork", permanent: false },
      { source: "/stage/7", destination: "/stage/painting", permanent: false },
      { source: "/stage/8", destination: "/stage/final-fittings-handover", permanent: false },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
