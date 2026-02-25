import type { Meta, StoryObj } from '@storybook/react-vite';
import Checkbox, { CheckboxLabel } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
   title: 'Shared/MUI/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    sx: { control: false },
    classes: { control: false },
    checkedIcon: { control: false },
    defaultChecked: { control: false },
    disableRipple: { control: false },
    icon: { control: false },
    indeterminateIcon: { control: false },
    slotProps: { control: false },
    slots: { control: false },
    className: { control: false },
    label: { control: false },
    id: { control: false },
    indeterminate: { control: false },
    required: { control: false },
    value: { control: false }
  },
  args: {
    checked: false,
    disabled: false,
    color: 'primary',
    size: 'medium',
    onChange: () => { /* empty */ }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: {
    checked: true
  }
};

export const Disabled: Story = {
  args: {
    disabled: true
  }
};

export const WithLabel: Story = {
  render: (args) => <CheckboxLabel {...args} />,
  args: {
    label: 'Accept terms',
  }
};
