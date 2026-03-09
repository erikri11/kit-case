import { forwardRef } from "react";
import { IMaskInput } from "react-imask";
import type { InputBaseComponentProps } from "@mui/material/InputBase";

interface PhoneMaskInputProps extends InputBaseComponentProps {
  name?: string;
  onChange?: (event: { target: { name?: string; value: string } }) => void;
}

export const PhoneMaskInput = forwardRef<HTMLInputElement, PhoneMaskInputProps>(
  function PhoneMaskInput(props, ref) {
    const { onChange, name, ...other } = props;

    return (
      <IMaskInput
        {...other}
        mask="(000) 000-0000"
        inputRef={ref}
        overwrite
        onAccept={(value: string) =>
          onChange?.({
            target: {
              name,
              value
            }
          })
        }
      />
    );
  }
);
