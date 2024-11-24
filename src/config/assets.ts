import type { AssetsManifest } from 'pixi.js';

export const manifest: AssetsManifest = {
  bundles: [
    {
      name: 'images',
      assets: {
        // Example
        bunny: './static/assets/images/bunny.png',
      },
    },
    {
      name: 'sounds',
      assets: {},
    },
    {
      name: 'music',
      assets: {},
    },
    {
      name: 'backgrounds',
      assets: {},
    },
  ],
};
