import { fireEvent, render as rtlRender, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { noop } from '../utils/noop';
import { SortableHeader, SortableHeaderProps } from './SortableHeader';

const render = (overrides: Partial<SortableHeaderProps> = {}) =>
  rtlRender(
    <SortableHeader
      onClick={noop}
      reversed={false}
      sorted={false}
      text="Name"
      {...overrides}
    />
  );

describe('SortableHeader', () => {
  it('displays header text', () => {
    render();

    expect(screen.getByText('Name')).toBeInTheDocument();
  });
  it('displays correct icon when not sorted', () => {
    render();

    expect(screen.getByTestId('header-icon')).toHaveClass(
      'icon-tabler-selector'
    );
  });

  it('displays correct icon when sorted asc', () => {
    render({ sorted: true, reversed: false });

    expect(screen.getByTestId('header-icon')).toHaveClass(
      'icon-tabler-chevron-down'
    );
  });

  it('displays correct icon when sorted desc', () => {
    render({ sorted: true, reversed: true });

    expect(screen.getByTestId('header-icon')).toHaveClass(
      'icon-tabler-chevron-up'
    );
  });

  it('triggers onClick prop', () => {
    const onClick = vi.fn();
    render({ onClick });

    fireEvent.click(screen.getByText('Name'));

    expect(onClick).toHaveBeenCalled();
  });
});
