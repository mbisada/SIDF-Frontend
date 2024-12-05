// Spinner.test.tsx
import { render } from '@testing-library/react';
import Spinner from '../Spinner';

describe('Spinner component', () => {
  it('renders the ClipLoader with correct props', () => {
    const color = '#000000';
    const loading = true;
    const cssOverride = { border: '2px solid red' };

    const { getByTestId } = render(<Spinner color={color} loading={loading} cssOverride={cssOverride} />);
    const loader = getByTestId('loader');

    expect(loader).toBeInTheDocument();
    expect(loader).toHaveAttribute('aria-label', 'Loading Spinner');
    expect(loader).toHaveStyle(`border: ${cssOverride.border}`);
  });

  it('does not render the ClipLoader when loading is false', () => {
    const color = '#000000';
    const loading = false;

    const { queryByTestId } = render(<Spinner color={color} loading={loading} />);
    const loader = queryByTestId('loader');

    expect(loader).toBeNull();
  });

  it('applies default styles when cssOverride is not provided', () => {
    const color = '#000000';
    const loading = true;

    const { getByTestId } = render(<Spinner color={color} loading={loading} />);
    const loader = getByTestId('loader');

    expect(loader).toBeInTheDocument();
    expect(loader).toHaveAttribute('aria-label', 'Loading Spinner');
  });
});
