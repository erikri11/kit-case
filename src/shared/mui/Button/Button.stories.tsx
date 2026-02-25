import type { Meta, StoryObj } from '@storybook/react-vite';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import UploadIcon from '@mui/icons-material/Upload';
import Button, {GrayButton} from './Button';

const meta: Meta<typeof Button> = {
  title: 'Shared/MUI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    startIcon: { control: false },
    endIcon: { control: false },
    sx: { control: false },
    classes: { control: false },
    component: { control: false },
    loading: { control: false },
    loadingIndicator: { control: false },
    loadingPosition: { control: false },
    disableFocusRipple: { control: false },
    href: { control: false },
    download: { control: false },
    className: { control: false },
    "data-testid": { control: false }
  },
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'medium',
    disabled: false,
    disableElevation: false,
    disableRipple: false,
    fullWidth: false,
    onClick: () => { /* empty */ }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Button',
    color: 'primary'
  }
};

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    color: 'primary'
  }
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    color: 'secondary'
  }
};

export const Success: Story = {
  args: {
    children: 'Success Button',
    color: 'success'
  }
};

export const Error: Story = {
  args: {
    children: 'Error Button',
    color: 'error'
  }
};

export const Info: Story = {
  args: {
    children: 'Info Button',
    color: 'info'
  }
};

export const Warning: Story = {
  args: {
    children: 'Warning Button',
    color: 'warning'
  }
};

export const Gray: Story = {
  render: (args) => <GrayButton {...args} />,
  args: {
    children: 'Gray Button'
  }
};

export const Upload: Story = {
  args: {
    children: 'Upload Button',
    color: 'primary',
    startIcon: <UploadIcon />
  }
};

export const WithStartIcon: Story = {
  args: {
    children: 'WithStartIcon Button',
    color: 'primary',
    startIcon: <AddIcon />
  },
};

export const WithEndIcon: Story = {
  args: {
    children: 'WithEndIcon Button',
    color: 'primary',
    endIcon: <SendIcon />
  }
};

export const LoaderAtStart: Story = {
  args: {
    children: 'Loading...',
    color: 'primary',
    loading: true,
    loadingPosition: 'start',
  },
};

export const LoaderAtEnd: Story = {
  args: {
    children: 'Loading...',
    color: 'primary',
    loading: true,
    loadingPosition: 'end',
  },
};
