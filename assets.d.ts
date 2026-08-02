/// <reference types="expo/types" />

// Expo SDK 57 no longer ships ambient declarations for image assets, so the
// `import logo from "@/assets/images/logo.png"` pattern needs them here.
// Metro resolves these to an asset module registry id at runtime.
declare module "*.png" {
  const asset: number;
  export default asset;
}

declare module "*.jpg" {
  const asset: number;
  export default asset;
}

declare module "*.jpeg" {
  const asset: number;
  export default asset;
}

declare module "*.gif" {
  const asset: number;
  export default asset;
}

declare module "*.webp" {
  const asset: number;
  export default asset;
}

declare module "*.ttf" {
  const asset: number;
  export default asset;
}

declare module "*.otf" {
  const asset: number;
  export default asset;
}
