import chroma from 'chroma-js';

export type Color = number | string | chroma.Color;

/**
 * `shades` adds black
 *
 * `tones` adds gray
 *
 * `tints` adds white
 */
export type MonochromaticVariation = 'shades' | 'tones' | 'tints';

export class Harmony {
  constructor(private mode: chroma.InterpolationMode = 'lab', private correctLightness: boolean = true) {}
  /**
   * Generate a sequential color scale for continous data
   */
  public sequential(color: Color | Color[]): chroma.Scale {
    return this.scale(color instanceof Array ? color.map((c) => chroma(c)) : chroma(color));
  }

  /**
   * Generate a diverging color scale for when a critical data class or break point needs to be emphasized
   * @param color The color to be used for 'high' values
   */
  public diverging(color: Color): chroma.Scale {
    const [h, s] = chroma(color).hsl();

    return this.scale([
      chroma(h - 180, s, 0.25, 'hsl'),
      chroma(h - 180, s, 0.25, 'hsl'),
      chroma(h - 90, s, 0.95, 'hsl'),
      chroma(h, s, 0.5, 'hsl'),
      chroma(h, s, 0.25, 'hsl'),
    ]);
  }

  public qualitative(color: Color, count: number): chroma.Color[] {
    // Round up to nearest integer just in case
    count = Math.ceil(count);
    if (count < 2) return [chroma(color)];
    if (count == 2)
      return this.complementary(color)
        .colors(2)
        .map((c) => chroma(c));
    if (count == 3) return this.triadic(color);
    if (count == 4) return this.tetradic(color);
    if (count <= 12) return this.analogous(color, 160, count);
    return this.sequential(color)
      .colors(count)
      .map((c) => chroma(c));
  }

  public monochromatic(color: Color, range: number = 2, variation: MonochromaticVariation = 'tints'): chroma.Scale {
    const chromaColor = chroma(color);
    let monochromeScaleEnd: chroma.Color;
    switch (variation) {
      case 'shades':
        monochromeScaleEnd = chromaColor.darken(range);
        break;
      case 'tones':
        monochromeScaleEnd = chromaColor.desaturate(range);
        break;
      case 'tints':
        monochromeScaleEnd = chromaColor.brighten(range);
        break;
      default:
        throw TypeError(`Unknown monochromatic variation ${variation}`);
    }
    return this.scale([chromaColor, monochromeScaleEnd]);
  }

  /**
   * Generates a complementary color palette range from the input color to the hue opposite color
   * @param color The color used to generate the palette
   * @returns a chroma {@link chroma.Scale}
   */
  public complementary(color: Color): chroma.Scale {
    const chromaColor = chroma(color);

    const hsl = chromaColor.hsl();
    hsl[0] += 180;
    return this.scale([chroma(hsl, 'hsl'), chromaColor]);
  }

  /**
   * Generates a color palette by rotating the hue of the input color by [-angle, 0, angle]
   * @param color The color used to generate the palette
   * @returns a split complementary color palette of 3 Chroma Colors
   */
  public splitComplementary(color: Color, angle: number = 150): [chroma.Color, chroma.Color, chroma.Color] {
    const [h, s, l] = chroma(color).hsl();
    return [chroma(h - angle, s, l, 'hsl'), chroma(color), chroma(h + angle, s, l, 'hsl')];
  }

  /**
   * Generates a color palette by selecting equidistant hues in the range [color.h - angle, color.h + angle]
   * @param color The color used to generate the palette
   * @returns an analogous color palette of n Chroma Colors
   */
  public analogous(color: Color, angle: number = 15, stops: number = 5): chroma.Color[] {
    const startHsl = chroma(color).hsl();
    startHsl[0] - angle;
    const colors: chroma.Color[] = [];
    const angleInterval = (angle * 2) / stops;
    for (let i = 0; i < stops; i++) {
      const hsl = [...startHsl];
      hsl[0] += angleInterval * i;
      colors.push(chroma(hsl, 'hsl'));
    }
    return colors;
  }

  /**
   * Generates a color palette by rotating the hue of the input color by [-120, 0, 120]
   * @param color The color used to generate the palette
   * @returns a triadic color palette of 3 Chroma Colors
   */
  public triadic(color: Color): [chroma.Color, chroma.Color, chroma.Color] {
    return this.splitComplementary(color, 120);
  }

  /**
   * Generates a color palette by rotating the hue of the input color by [0, 60, 180, 240]
   * @param color The color used to generate the palette
   * @returns a tetradic color palette of 4 Chroma Colors
   */
  public tetradic(color: Color): [chroma.Color, chroma.Color, chroma.Color, chroma.Color] {
    const chromaColor = chroma(color);
    const [h, s, l] = chromaColor.hsl();

    return [chromaColor, chroma(h + 60, s, l, 'hsl'), chroma(h + 180, s, l, 'hsl'), chroma(h + 240, s, l, 'hsl')];
  }

  /**
   * Generates a color palette by rotating the hue of the input color by [0, 90, 180, 270]
   * @param color The color used to generate the palette
   * @returns a square color palette of 4 Chroma Colors
   */
  public square(color: Color): [chroma.Color, chroma.Color, chroma.Color, chroma.Color] {
    return this.analogous(color, 90, 4) as [chroma.Color, chroma.Color, chroma.Color, chroma.Color];
  }

  private scale(colors: chroma.Color | chroma.Color[]): chroma.Scale {
    // @ts-ignore
    return chroma.scale(colors).mode(this.mode).correctLightness(this.correctLightness);
  }
}

export default Harmony;
