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

For example, a Triadic color harmony with a Red/Green/Blue may look like this using the generic HSL workflow:
![A triadic Red/Green/Blue harmony](https://raw.githubusercontent.com/beilinson/chroma-harmony.js/main/assets/triadic_hsl.png)

And like this using the CSS4 `oklch` color space:
![A triadic Red/Green/Blue harmony in oklch](https://raw.githubusercontent.com/beilinson/chroma-harmony.js/main/assets/triadic_oklch.png)

If using in a data visualization context, choosing the `oklch` triad may be preferred, as can be clearly seen in the following comparison where the `hsl` trid (on the left) makes the blue bars stand out much more against the red and green.
This is in contrast to the `oklch` triad (on the right), where no color is visually stronger than the other 2.

![A triadic Red/Green/Blue harmony in hsl](https://raw.githubusercontent.com/beilinson/chroma-harmony.js/main/assets/triadic_hsl_demo.png) ![A triadic Red/Green/Blue harmony in oklch](https://raw.githubusercontent.com/beilinson/chroma-harmony.js/main/assets/triadic_oklch_demo.png)

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
