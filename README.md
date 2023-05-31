# chroma-harmony.js
![npm bundle size](https://img.shields.io/bundlephobia/min/chroma-harmony)
![GitHub](https://img.shields.io/github/license/Beilinson/chroma-harmony.js)

A minimal TypeScript Color Harmony library built on top of [chroma-js](https://www.npmjs.com/package/chroma-js).

## Color Palettes
Use it in order to quickly generate [sequential, diverging, or qualitative](https://colorbrewer2.org) brewer color scales for data visualization, or more general color palettes using simple color harmonies like complementary or analogous, like https://color.adobe.com/create/color-wheel.

## Install
```
npm install chroma-harmony
```

## API
```ts
import Harmony from 'chroma-harmony';

/**
 * {chroma.InterpolationMode} mode: https://gka.github.io/chroma.js/#scale-mode
 * {boolean} correctLightness: https://gka.github.io/chroma.js/#scale-correctlightness
 */
const generator = new Harmony();

// Generate a chroma.Scale object using a complementary color palette
const complementary: chroma.Scale = generator.complementary(0x3182bd);

// Generate a 3 color equidistant triadic color palette
const triadic: [chroma.Color, chroma.Color, chroma.Color] = generator.triadic(0xf03b20);
```
