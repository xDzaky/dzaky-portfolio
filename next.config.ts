import type { Configuration, RuleSetRule } from "webpack";

const assetRules: RuleSetRule[] = [
  {
    test: /\.(glb|gltf)$/i,
    type: "asset/resource",
  },
  {
    test: /\.(png|jpg|jpeg|gif|svg)$/i,
    type: "asset/resource",
  },
];

const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  webpack(config: Configuration) {
    if (!config.module) {
      config.module = { rules: [] };
    }

    config.module.rules = config.module.rules ?? [];
    config.module.rules.push(...assetRules);

    return config;
  },
  experimental: {
    optimizePackageImports: ["@react-three/fiber", "@react-three/drei", "@react-three/rapier"],
  },
};

export default nextConfig;
