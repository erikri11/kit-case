import './alert.module.scss';
import MaterialAlert from '@mui/material/Alert';
import MaterialAlertTitle from '@mui/material/AlertTitle';
import { ReactNode } from 'react';

export interface AlertProps {
  action?: ReactNode,
  children: ReactNode,
  classes?: object,
  closeText?: string,
  color?: 'error' | 'info' | 'success' | 'warning',
  icon?: ReactNode,
  iconMapping?: {
    error?: ReactNode, info?: ReactNode, success?: ReactNode, warning?: ReactNode
  },
  onClose?: (event: any) => void,
  role?: string,
  severity?: 'error' | 'info' | 'success' | 'warning',
  sx?: any,
  variant?: 'filled' | 'outlined' | 'standard',
  className?: string,
  ['data-testid']?: string
}

export interface AlertTitleProps {
  children: any,
  classes?: object,
  sx?: any
}

export function Alert(props: AlertProps) {
  return (
    <MaterialAlert
      severity={props.severity}
      variant={props.variant}
      onClose={props.onClose}
      className={props.className}
      color={props.color}
      closeText={props.closeText}
      sx={props.sx}
      icon={props.icon}
      action={props.action}
      data-testid={props['data-testid']}>
      {props.children}
    </MaterialAlert>
  );
}

export function AlertTitle(props: AlertTitleProps) {
  return (
    <MaterialAlertTitle
      sx={props.sx}>
      {props.children}
    </MaterialAlertTitle>
  );
}

export default Alert;