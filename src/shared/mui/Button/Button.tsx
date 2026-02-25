import './button.module.scss';
import MaterialButton from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { ReactNode } from 'react';

export interface ButtonProps {
  children?: ReactNode,
  classes?: object,
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | 'grey',
  component?: any
  disabled?: boolean,
  disableElevation?: boolean,
  disableFocusRipple?: boolean,
  disableRipple?: boolean,
  endIcon?: ReactNode,
  fullWidth?: boolean,
  href?: string,
  loading?: boolean,
  loadingIndicator?: ReactNode,
  loadingPosition?: 'start' | 'end' | 'center',
  size?: 'small' | 'medium' | 'large',
  startIcon?: ReactNode,
  sx?: object,
  variant?: 'contained' | 'outlined' | 'text',
  onClick?: (...args: any[]) => void,
  className?: string,
  download?: string,
  ['data-testid']?: string
}

const Input = styled('input')({
  display: 'none',
});

export function Button(props: ButtonProps) {
  const localSx = {
    textTransform: 'none',
  };

  return (
    <MaterialButton
      disabled={props.disabled}
      onClick={props.onClick}
      variant={props.variant}
      color={props.color}
      startIcon={props.startIcon}
      endIcon={props.endIcon}
      component={props.component}
      className={`${props.className}`}
      size={props.size}
      href={props.href}
      fullWidth={props.fullWidth}
      sx={Object.assign(localSx, props.sx)}
      classes={props.classes}
      disableElevation={props.disableElevation}
      disableFocusRipple={props.disableFocusRipple}
      disableRipple={props.disableRipple}
      loading={props.loading}
      loadingIndicator={props.loadingIndicator}
      loadingPosition={props.loadingPosition}
      download={props.download}
      data-testid={props['data-testid']}>
      {props.children}
    </MaterialButton>
  );
}

export function PrimaryButton(props: ButtonProps) {
  return (
    <Button {...props}
      className={props.className}
      color="primary"
    />
  );
}

export function SecondaryButton(props: ButtonProps) {
  return (
    <Button {...props}
      className={props.className}
      color="secondary"
    />
  );
}

export function SuccessButton(props: ButtonProps) {
  return (
    <Button {...props}
      className={props.className}
      color="success"
    />
  );
}

export function ErrorButton(props: ButtonProps) {
  return (
    <Button {...props}
      className={props.className}
      color="error"
    />
  );
}

export function InfoButton(props: ButtonProps) {
  return (
    <Button {...props}
      className={props.className}
      color="info"
    />
  );
}

export function WarningButton(props: ButtonProps) {
  return (
    <Button {...props}
      className={props.className}
      color="warning"
    />
  );
}

export function GrayButton(props: ButtonProps) {
  return (
    <Button {...props}
      className={props.className}
      color='grey'
    />
  );
}

export function UploadButton(props: ButtonProps) {
  return (
    <label>
      <Input accept="image/*" multiple type="file" />
      <Button {...props} className={props.className} />
    </label>
  );
}

export default Button;
