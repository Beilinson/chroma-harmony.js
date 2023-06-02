# chroma-harmony.js
A [tiny](https://bundlephobia.com/package/chroma-harmony) TypeScript Color Harmony library built on top of [chroma-js](https://www.npmjs.com/package/chroma-js).

Try out with the interactive [online editor](https://beilinson.github.io/chroma-harmony.js/visual/)!

## Color Palettes
Use it in order to quickly generate [sequential, diverging, or qualitative](https://colorbrewer2.org) brewer color scales for data visualization:
![A table of 7 Color Harmonies](https://raw.githubusercontent.com/beilinson/chroma-harmony.js/main/assets/brewer.png)

Or Generate more general color palettes using simple color harmonies like complementary or analogous:
![A table of 7 Color Harmonies](https://raw.githubusercontent.com/beilinson/chroma-harmony.js/main/assets/seven-color-harmonies.jpg)

## Color Spaces
Since this library uses `chroma-js` objects for color manipulations, we gain full advantage of advanced
color spaces for manipulating colors to generate automatic color palettes.

## Install
First install the `chroma-js` peer-dependency:
```
npm install chroma-js
```
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
const complementary = generator.complementary(0x3182bd);

// Generate a 3 color equidistant triadic color palette
const triadic = generator.triadic(0xf03b20); // [chroma.Color, chroma.Color, chroma.Color]
```

## TypeScript
To use in TypeScript, don't forget to install the `chroma-js` typings:
```
npm install @types/chroma-js
```
