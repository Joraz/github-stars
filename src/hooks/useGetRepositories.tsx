import { useQuery } from '@apollo/client';

import { SEARCH_FOR_REPOSITORIES } from '../graphql/search.query';

type SearchVariables = {
  query: string;
};

type SearchQueryData = {
  search: {
    nodes: Array<{
      name: string;
      url: string;
      stargazerCount: number;
      forkCount: number;
    }>;
  };
};

export const useGetRepositories = (variables: SearchVariables) => {
  return useQuery<SearchQueryData, SearchVariables>(SEARCH_FOR_REPOSITORIES, {
    variables,
  });
};
