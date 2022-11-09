import { fireEvent, render as rtlRender, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { noop } from '../utils/noop';
import { Pagination, PaginationProps } from './Pagination';

const render = (overrides: Partial<PaginationProps> = {}) =>
  rtlRender(
    <Pagination
      disableBack={false}
      disableForwards={false}
      offset={0}
      onClick={noop}
      totalCount={100}
      {...overrides}
    />
  );

describe('Pagination', () => {
  it('renders text based on offset and total', () => {
    render();

    expect(screen.getByText('1 to 20 of 100 results')).toBeInTheDocument();
  });

  it('disables back button based on props', () => {
    render({ disableBack: true });

    // Mantine buttons are composed of several elements, so getting by text does not find the button element. Falling back to using testids
    expect(screen.getByTestId('previous-button')).toHaveAttribute(
      'data-disabled',
      'true'
    );
  });

  it('disables forwards button based on props', () => {
    render({ disableForwards: true });

    expect(screen.getByTestId('next-button')).toHaveAttribute(
      'data-disabled',
      'true'
    );
  });

  it('triggers onClick for back button', () => {
    const onClick = vi.fn();
    render({ onClick });

    fireEvent.click(screen.getByTestId('previous-button'));

    expect(onClick).toHaveBeenCalledWith('back');
  });

  it('triggers onClick for forwards button', () => {
    const onClick = vi.fn();
    render({ onClick });

    fireEvent.click(screen.getByTestId('next-button'));

    expect(onClick).toHaveBeenCalledWith('forward');
  });
});
