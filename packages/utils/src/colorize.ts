/**
 * @type: service
 * @name: colorize
 */
export default class Colorize {
  public static hexToRgb(color: string) {
    color = color.slice(1);
    const re = new RegExp(`.{1,${color.length >= 6 ? 2 : 1}}`, "g");
    let colors = color.match(re);
    if (colors && colors[0].length === 1) {
      colors = colors.map((n) => n + n);
    }
    return colors
      ? `rgb${colors.length === 4 ? "a" : ""}(${colors
          .map((n, index) => {
            return index < 3
              ? parseInt(n, 16)
              : Math.round((parseInt(n, 16) / 255) * 1000) / 1000;
          })
          .join(", ")})`
      : "";
  }
  public static darken(col: string, amt: number) {
    let usePound = false;
    if (col[0] == "#") {
      col = col.slice(1);
      usePound = true;
    }

    const num = parseInt(col, 16);

    let r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    let b = ((num >> 8) & 0x00ff) + amt;

    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    let g = (num & 0x0000ff) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
  }
}
