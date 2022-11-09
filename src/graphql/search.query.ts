import { gql } from '@apollo/client';

export const SEARCH_FOR_REPOSITORIES = gql`
  query searchForRepositories(
    $query: String!
    $first: Int
    $last: Int
    $after: String
    $before: String
  ) {
    search(
      type: REPOSITORY
      query: $query
      first: $first
      last: $last
      after: $after
      before: $before
    ) {
      repositoryCount
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      nodes {
        ... on Repository {
          name
          url
          stargazerCount
          forkCount
        }
      }
    }
  }
`;
