import { FC, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import MenuItem from '@mui/material/MenuItem';
import { FormControl, ListItemText } from '@mui/material';
import Select from './select';
import Checkbox from '../Checkbox/Checkbox';

const meta: Meta<typeof Select> = {
  title: 'Shared/MUI/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: { control: false },
    sx: { control: false },
    classes: { control: false },
    input: { control: false },
    MenuProps: { control: false },
    renderValue: { control: false },
    value: { control: false },
    inputProps: { control: false },
    SelectDisplayProps: { control: false },
    className: { control: false },
    IconComponent: { control: false },
    defaultValue: { control: false },
    onClose: { control: false },
    onOpen: { control: false },
    id: { control: false },
    labelId: { control: false },
    multiple: { control: false },
    native: { control: false },
    displayEmpty: { control: false },
    defaultOpen: { control: false },
    open: { control: false },
    name: { control: false },
    hiddenLabel: { control: false },
    fullWidth: { control: false },
    error: { control: false },
    disabled: { control: false },
  },
  args: {
    value: '',
    disabled: false,
    error: false,
    displayEmpty: true,
    autoWidth: false,
    label: 'Age',
    size: 'small',
    variant: 'filled',
    onChange: () => { /* empty */ }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <FormControl sx={{ width: 200}}>
      <Select {...args}>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={20}>20</MenuItem>
        <MenuItem value={30}>30</MenuItem>
      </Select>
    </FormControl>
  )
};

export const Disabled: Story = {
  ...Default,
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const ErrorState: Story = {
  ...Default,
  args: {
    ...Default.args,
    error: true,
  },
};

// Separate component so we can safely use hooks
const MultiSelectDemo: FC = () => {
  const [value, setValue] = useState<string[]>([]);

  const options = [
    { id: 1, label: 'Apples' },
    { id: 2, label: 'Oranges' },
    { id: 3, label: 'Bananas' },
  ];

  return (
    <FormControl sx={{ width: 200 }}>
        <Select
          label="Select Fruits"
          size="small"
          variant="filled"
          multiple
          value={value}
          onChange={(e: any) => setValue(e.target.value)}
          renderValue={(selected: any) => selected.join(', ')}
        >
          {options.map((option) => (
            <MenuItem key={option.id} value={option.label}>
              <Checkbox checked={value.includes(option.label)} />
              <ListItemText primary={option.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
  );
};

export const MultiSelectExample: Story = {
  render: () => <MultiSelectDemo />,
};
