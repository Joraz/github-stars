import { MockedProvider } from '@apollo/client/testing';
import { render, screen } from '@testing-library/react';
import { GraphQLError } from 'graphql';
import { SEARCH_FOR_REPOSITORIES } from '../graphql/search.query';

import { Table } from './Table';

describe('Table Container', () => {
  it('shows a message when there is an error fetching data', async () => {
    render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: SEARCH_FOR_REPOSITORIES,
              variables: {
                first: 20,
                query: 'topic:react sort:stars-desc',
              },
            },
            result: {
              errors: [new GraphQLError('Server on fire!')],
            },
          },
        ]}
        addTypename={false}
      >
        <Table />
      </MockedProvider>
    );

    expect(
      await screen.findByText('Oops! An error occurred when fetching the data')
    ).toBeInTheDocument();
  });

  it('shows loading state', async () => {
    render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: SEARCH_FOR_REPOSITORIES,
              variables: {
                first: 20,
                query: 'topic:react sort:stars-desc',
              },
            },
            result: {},
          },
        ]}
        addTypename={false}
      >
        <Table />
      </MockedProvider>
    );

    expect(await screen.findByText('Loading...')).toBeInTheDocument();
  });

  it.only('shows data', async () => {
    render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: SEARCH_FOR_REPOSITORIES,
              variables: {
                first: 20,
                query: 'topic:react sort:stars-desc',
              },
            },
            result: {
              data: {
                search: {
                  repositoryCount: 247165,
                  pageInfo: {
                    hasNextPage: true,
                    hasPreviousPage: false,
                    startCursor: 'Y3Vyc29yOjE=',
                    endCursor: 'Y3Vyc29yOjIw',
                  },
                  nodes: [
                    {
                      name: 'freeCodeCamp',
                      url: 'https://github.com/freeCodeCamp/freeCodeCamp',
                      stargazerCount: 356715,
                      forkCount: 30370,
                      __typename: 'Repository',
                    },
                  ],
                },
              },
            },
          },
        ]}
        addTypename={false}
      >
        <Table />
      </MockedProvider>
    );

    expect(await screen.findByText('freeCodeCamp')).toBeInTheDocument();
  });
});
