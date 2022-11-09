import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { noop } from '../utils/noop';
import { Table } from './table';

describe('Table', () => {
  it('displays loading state', () => {
    render(<Table isLoading sortMode="forks-asc" onSortModeChange={noop} />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays repo data', () => {
    render(
      <Table
        data={[
          {
            forkCount: 2,
            name: 'Test',
            stargazerCount: 3,
            url: 'https://github.com/Joraz/github-stars',
          },
        ]}
        sortMode="forks-asc"
        onSortModeChange={noop}
      />
    );

    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('triggers sort mode change', () => {
    const onSortModeChange = vi.fn();
    render(
      <Table
        isLoading
        sortMode="forks-asc"
        onSortModeChange={onSortModeChange}
      />
    );

    fireEvent.click(screen.getByText('No. of Stars'));

    expect(onSortModeChange).toHaveBeenCalledWith('stars-desc');
  });
});
