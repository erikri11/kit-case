import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox, CheckboxLabel } from './checkbox';

describe('<Checkbox />', () => {
  test('renders unchecked by default', () => {
    render(<Checkbox checked={false} />);
    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).not.toBeChecked();
  });

  test('renders as checked when checked prop is true', () => {
    render(<Checkbox checked={true} />);
    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toBeChecked();
  });

  test('renders disabled state', () => {
    render(<Checkbox disabled />);
    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toBeDisabled();
  });

  test('calls onChange when clicked', () => {
    const handleChange = jest.fn();
    render(<Checkbox checked={false} onChange={handleChange} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});

describe('<CheckboxLabel />', () => {
  test('renders label text', () => {
    render(<CheckboxLabel label="Accept terms" />);
    expect(screen.getByText('Accept terms')).toBeInTheDocument();
  });

  test('clicking the label toggles the checkbox', () => {
    const handleChange = jest.fn();
    render(
      <CheckboxLabel
        label="Accept terms"
        onChange={handleChange}
      />
    );

    const label = screen.getByText('Accept terms');
    fireEvent.click(label);

    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
