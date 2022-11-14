import { render, screen } from '@testing-library/react';

import { Table } from './Table';

describe('Stars/Table', () => {
  it('displays loading state', () => {
    render(<Table isLoading />);

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
      />
    );

    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
