import './select.module.scss';
import MaterialSelect, { type SelectChangeEvent } from '@mui/material/Select';
import FilledInput from '@mui/material/FilledInput';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import FormControl from '../FormControl/FormControl';
import Checkbox from '../Checkbox/Checkbox';
import type { ReactNode } from 'react';

export interface SelectProps {
  autoWidth?: boolean,
  children: ReactNode,
  classes?: object,
  defaultOpen?: boolean,
  defaultValue?: any,
  displayEmpty?: boolean,
  IconComponent?: any,
  id?: string,
  input?: any,
  inputProps?: object,
  label?: ReactNode,
  labelId?: string,
  MenuProps?: object,
  multiple?: boolean,
  native?: boolean,
  onChange?: (event: SelectChangeEvent) => void,
  onClose?: (event: object) => void,
  onOpen?: (event: object) => void,
  open?: boolean,
  renderValue?: any,
  SelectDisplayProps?: object,
  sx?: object,
  value?: any,
  variant?: 'filled' | 'outlined' | 'standard',
  className?: string,
  size?: 'small' | 'medium',
  name?: string,
  fullWidth?: boolean,
  error?: boolean,
  disabled?: boolean,
  hiddenLabel?: boolean,
}

export interface MultiSelectProps {
  value: any,
  options: any,
  keyValue: any,
  displayValue: any,
  onChange: (event: SelectChangeEvent) => void,
  renderValue: any,
  label: ReactNode,
}

export function Select(props: SelectProps) {
  return (
    <FormControl
      fullWidth={props.fullWidth}
      label={props.label}
      error={props.error}
      hiddenLabel={props.hiddenLabel || true}>
      <MaterialSelect
        autoWidth={props.autoWidth}
        value={props.value}
        renderValue={props.renderValue}
        MenuProps={props.MenuProps}
        multiple={props.multiple}
        onChange={props.onChange}
        onOpen={props.onOpen}
        onClose={props.onClose}
        disabled={props.disabled}
        size={props.size || 'small'}
        variant={props.variant || 'filled'}
        displayEmpty={props.displayEmpty}
        sx={props.sx}
        input={props.input}
        open={props.open}
        className={props.className}
        name={props.name}>
        {props.children}
      </MaterialSelect>
    </FormControl>
  )
}

export function MultiSelect(props: MultiSelectProps) {
  return (
    <Select
      label={props.label}
      multiple
      fullWidth
      value={props.value}
      onChange={props.onChange}
      input={<FilledInput />}
      renderValue={props.renderValue}>
      {props.options?.map((option: any) => (
        <MenuItem key={option[props.keyValue]} value={option}>
          <Checkbox checked={props.value.findIndex((u: any) => u[props.keyValue] === option[props.keyValue]) > -1} />
          <ListItemText primary={option[props.displayValue]} />
        </MenuItem>
      ))}
    </Select>
  );
}

export default Select;
