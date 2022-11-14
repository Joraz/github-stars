import { render, screen } from '@testing-library/react';

import { RepoRow } from './RepoRow';

describe('Stars/RepoRow', () => {
  it('displays correct data for repository', () => {
    render(
      <RepoRow
        forkCount={2}
        name="We ❤ testing"
        stargazerCount={10}
        url="https://github.com/Joraz/github-stars"
      />
    );

    expect(screen.getByText('We ❤ testing')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('includes a link to the repository URL', () => {
    render(
      <RepoRow
        forkCount={2}
        name="We ❤ testing"
        stargazerCount={10}
        url="https://github.com/Joraz/github-stars"
      />
    );

    expect(screen.getByText('We ❤ testing')).toHaveAttribute(
      'href',
      'https://github.com/Joraz/github-stars'
    );
  });
});
