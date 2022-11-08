import { gql } from '@apollo/client';

export const SEARCH_FOR_REPOSITORIES = gql`
  query searchForRepositories($query: String!) {
    search(type: REPOSITORY, query: $query, first: 20) {
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
