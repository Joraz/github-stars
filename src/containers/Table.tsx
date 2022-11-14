import { useState } from 'react';

import { Space, Text } from '@mantine/core';

import { Pagination, SortMode, Table as PresTable } from '../components';
import { useGetRepositories } from '../hooks';
import { SortingFunctionMap } from '../utils/sorting-functions';

export const Table = () => {
  const [sortMode, setSortMode] = useState<SortMode>('stars-desc');
  const [offset, setOffset] = useState(0);

  const { data, error, loading, refetch } = useGetRepositories({
    query: 'topic:react sort:stars-desc',
    first: 20,
  });

  if (error) {
    return <Text c="red">Oops! An error occurred when fetching the data</Text>;
  }

  // Sort mutates the original array, so we have to make a copy to avoid React erroring
  const sortedData = [...(data?.search.nodes || [])].sort(
    SortingFunctionMap[sortMode]
  );

  const handlePaginationChange = (direction: 'back' | 'forward') => {
    if (direction === 'back') {
      setOffset(offset - 20);
      refetch({
        before: data?.search.pageInfo.startCursor,
        last: 20,
        first: undefined,
        after: undefined,
      });
    } else {
      setOffset(offset + 20);
      refetch({
        after: data?.search.pageInfo.endCursor,
        first: 20,
        last: undefined,
        before: undefined,
      });
    }
  };

  const handleSortChange = (sortMode: SortMode) => {
    setSortMode(sortMode);
  };

  return (
    <>
      <PresTable
        isLoading={loading}
        onSortModeChange={handleSortChange}
        sortMode={sortMode}
        data={sortedData}
      />
      <Space h="lg" />
      <Pagination
        disableBack={!data?.search.pageInfo.hasPreviousPage}
        disableForwards={!data?.search.pageInfo.hasNextPage}
        totalCount={data?.search.repositoryCount}
        offset={offset}
        onClick={handlePaginationChange}
      />
    </>
  );
};
