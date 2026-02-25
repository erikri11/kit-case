import './checkbox.module.scss';
import { ChangeEvent, ReactNode } from 'react';
import MaterialCheckbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import MaterialFormControlLabel from '@mui/material/FormControlLabel';

export interface CheckboxProps {
  checked?: boolean,
  checkedIcon?: ReactNode,
  classes?: object,
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning',
  defaultChecked?: boolean,
  disabled?: boolean,
  disableRipple?: boolean,
  icon?: ReactNode,
  id?: string,
  indeterminate?: boolean,
  indeterminateIcon?: ReactNode,
  onChange?: (event: ChangeEvent, checked: boolean) => void,
  required?: boolean,
  size?: 'medium' | 'small',
  slotProps?: object,
  slots?: object,
  sx?: object,
  value?: string | number,
  className?: string,
  label?: ReactNode
}

export function Checkbox(props: CheckboxProps) {
  return (
    <MaterialCheckbox
      disabled={props.disabled}
      checked={props.checked}
      onChange={props.onChange}
      color={props.color}
      defaultChecked={props.defaultChecked}
      value={props.value}
      size={props.size}
      sx={props.sx}
      className={props.className}
    />
  );
}

export function CheckboxLabel(props: CheckboxProps) {
  return (
    <FormGroup>
      <MaterialFormControlLabel
        control={<Checkbox {...props} />}
        label={props.label}
        sx={props.sx}
        className={props.className}
        disabled={props.disabled}
      />
    </FormGroup>
  );
}

export default Checkbox;
