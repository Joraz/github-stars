import { useQuery } from '@apollo/client';

import { SEARCH_FOR_REPOSITORIES } from '../graphql';
import { Repo } from '../models';

type SearchVariables = {
  query: string;
  first?: number;
  last?: number;
  after?: string;
  before?: string;
};

type SearchQueryData = {
  search: {
    nodes: Array<Repo>;
    repositoryCount: number;
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
};

export const useGetRepositories = (variables: SearchVariables) => {
  return useQuery<SearchQueryData, SearchVariables>(SEARCH_FOR_REPOSITORIES, {
    variables,
    notifyOnNetworkStatusChange: true,
  });
};
