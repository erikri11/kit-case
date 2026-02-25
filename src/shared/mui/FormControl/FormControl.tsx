import './formControl.module.scss';
import MaterialFormControl from '@mui/material/FormControl';
import { ReactNode } from 'react';

/* eslint-disable-next-line */
export interface FormControlProps {
  children: ReactNode,
  classes?: object,
  color?:'primary'| 'secondary'| 'error'| 'info'| 'success'| 'warning',
  component?: any,
  disabled?: boolean,
  error?: boolean,
  focused?: boolean,
  fullWidth?: boolean,
  hiddenLabel?: boolean,
  margin?:'dense'| 'none'| 'normal',
  required?: boolean,
  size?:'medium'| 'small',
  sx?: object,
  variant?: 'filled' | 'outlined' | 'standard',
  label?: ReactNode,
  className?: string
}

export function FormControl(props: FormControlProps) {
  return (
    <MaterialFormControl
      fullWidth={props.fullWidth}
      component={props.component}
      error={props.error}
      hiddenLabel={props.hiddenLabel}
      variant={props.variant || 'filled'}
      sx={props.sx}
      required={props.required}
      className={props.className}>
      <label>{props.label}</label>
      {props.children}
    </MaterialFormControl>
  );
}

export default FormControl;
