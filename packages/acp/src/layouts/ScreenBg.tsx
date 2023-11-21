import { CSSProperties, useEffect } from "react";

interface Props {
  bgImg?: string;
  color?: CSSProperties["backgroundColor"];
  repeat?: CSSProperties["backgroundRepeat"];
  size?: CSSProperties["backgroundSize"];
  position?: CSSProperties["backgroundSize"];
}

export function ScreenBg(props: Props) {
  const { bgImg: image, color, repeat, size, position } = props;
  useEffect(() => {
    const body = document.body;

    if (body) {
      const keepStyles: Props = {
        color: body.style.backgroundColor,
        repeat: body.style.backgroundRepeat,
        bgImg: body.style.backgroundImage,
        size: body.style.backgroundSize,
      };

      if (repeat) {
        body.style.backgroundRepeat = repeat;
      }
      if (size) {
        body.style.backgroundSize = size as string;
      }

      if (color) {
        body.style.backgroundColor = color;
      }

      if (image) {
        body.style.backgroundImage = `url(${image})`;
      }

      return () => {
        if (body) {
          body.style.backgroundImage = keepStyles.bgImg as string;
          body.style.backgroundRepeat = keepStyles.repeat as string;
          body.style.backgroundColor = keepStyles.color as string;
          body.style.backgroundSize = keepStyles.size as string;
          body.style.backgroundPosition = keepStyles.position as string;
        }
      };
    }
  }, [image, color, repeat, size, position]);
  return null;
}

export default ScreenBg;
