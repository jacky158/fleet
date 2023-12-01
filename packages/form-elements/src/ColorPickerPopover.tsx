import { Box } from "@mui/material";
import { hexToRgb, rgbToHex } from "@mui/system/colorManipulator";
import React, { useCallback, useEffect, useState } from "react";
import { HexAlphaColorPicker } from "react-colorful";

interface Props {
  color: string;
  onChange: (value: string) => void;
}

export default function ColorPopover({
  color: value = "#000",
  onChange,
}: Props) {
  try {
    value = /#/i.test(value) ? value : rgbToHex(value);
  } catch (err) {
    // color error.
  }

  const [color, setColor] = useState<string>(value);

  const testColor = useCallback((color: string) => {
    if (/#[0-9a-f]/i.test(color)) setColor(color); // test is valid color
  }, []);

  useEffect(() => {
    try {
      // required to check color is valid
      hexToRgb(color);
      onChange(color);
    } catch (err) {
      //
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color]);

  return (
    <Box sx={{ p: 2 }}>
      <HexAlphaColorPicker color={color} onChange={setColor} />
      <Box sx={{ pt: 1 }}>
        <input
          value={color}
          name="hex_alpha"
          placeholder="#aa00ccff"
          onChange={(evt) => testColor(evt.currentTarget.value)}
        />
      </Box>
    </Box>
  );
}
