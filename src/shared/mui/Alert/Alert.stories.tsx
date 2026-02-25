import type { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertTitle } from './Alert';
import { Button } from '@mui/material';

const meta: Meta<typeof Alert> = {
  title: 'Shared/MUI/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    severity: {
      control: 'select',
      options: ['error', 'info', 'success', 'warning'],
    },
    variant: {
      control: 'select',
      options: ['standard', 'outlined', 'filled'],
    },
    color: {
      control: 'select',
      options: ['error', 'info', 'success', 'warning'], 
    },
    role: { control: false },
    action: { control: false },
    classes: { control: false },
    icon: { control: false },
    iconMapping: { control: false },
    sx: { control: false },
    className: { control: false },
    'data-testid': { control: false }
  },
  args: {
    severity: 'info',
    variant: 'standard',
    children: 'This is an alert message',
    closeText: 'Close',
    color: 'info',
    role: 'alert',
    onClose: () => {}
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithTitle: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Info</AlertTitle>
      This alert has a title.
    </Alert>
  ),
};

export const Success: Story = {
  args: {
    severity: 'success',
    color: 'success',
    children: 'Operation completed successfully!',
  },
};

export const Error: Story = {
  args: {
    severity: 'error',
    color: 'error',
    children: 'Something went wrong.',
  },
};

export const Warning: Story = {
  args: {
    severity: 'warning',
    color: 'warning',
    children: 'Be careful with this action.',
  },
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    severity: 'info',
    children: 'This is a filled alert.',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    severity: 'info',
    children: 'This is an outlined alert.',
  },
};

export const WithAction: Story = {
  args: {
    severity: 'info',
    action: <Button color="inherit" size="small">UNDO</Button>,
    children: 'This alert has an action.',
  },
};
