import React from "react";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";
import { useColorMode } from "@chakra-ui/react";

import "react-datepicker/dist/react-datepicker.css";

/**
 * @see https://gist.github.com/igoro00/99e9d244677ccafbf39667c24b5b35ed
 */
export function DatePicker<DatePickerModifiers>(
  props: ReactDatePickerProps<DatePickerModifiers>
) {
  const isLight = useColorMode().colorMode === "light"; //you can check what theme you are using right now however you want

  return (
    // if you don't want to use chakra's colors or you just wwant to use the original ones,
    // set className to "light-theme-original" ↓↓↓↓
    <div className={isLight ? "light-theme" : "dark-theme"}>
      <ReactDatePicker className="react-datapicker__input-text" {...props} />
    </div>
  );
}
