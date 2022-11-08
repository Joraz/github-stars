import { useQuery } from '@apollo/client';

import { SEARCH_FOR_REPOSITORIES } from '../graphql/search.query';
import { Repo } from '../models';

type SearchVariables = {
  query: string;
};

type SearchQueryData = {
  search: {
    nodes: Array<Repo>;
  };
};

export const useGetRepositories = (variables: SearchVariables) => {
  return useQuery<SearchQueryData, SearchVariables>(SEARCH_FOR_REPOSITORIES, {
    variables,
  });
};
