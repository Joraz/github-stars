import { useState } from 'react';

import {
  Button,
  Center,
  Flex,
  Group,
  Space,
  Table as MantineTable,
  Text,
  UnstyledButton,
} from '@mantine/core';

import { useGetRepositories } from '../hooks';
import { SortableHeader } from './SortableHeader';
import { Pagination } from './Pagination';
import { RepoRow } from './RepoRow';

type SortMode = 'stars-desc' | 'stars-asc' | 'forks-desc' | 'forks-asc';

export const Table = () => {
  const [sortMode, setSortMode] = useState<SortMode>('stars-desc');
  const { data, loading, refetch } = useGetRepositories({
    query: `topic:react sort:${sortMode}`,
    first: 20,
  });
  const [offset, setOffset] = useState(0);

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

  return (
    <>
      <MantineTable striped>
        <thead>
          <tr>
            <th>
              <Text>Repository Name</Text>
            </th>
            <SortableHeader
              text="No. of Stars"
              sorted={sortMode === 'stars-asc' || sortMode === 'stars-desc'}
              reversed={sortMode === 'stars-asc'}
              onClick={() => {
                setOffset(0);
                setSortMode(
                  sortMode === 'stars-desc' ? 'stars-asc' : 'stars-desc'
                );
              }}
            />
            <SortableHeader
              text="No. of Forks"
              sorted={sortMode === 'forks-asc' || sortMode === 'forks-desc'}
              reversed={sortMode === 'forks-asc'}
              onClick={() => {
                setOffset(0);
                setSortMode(
                  sortMode === 'forks-desc' ? 'forks-asc' : 'forks-desc'
                );
              }}
            />
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={3}>Loading...</td>
            </tr>
          ) : (
            data?.search.nodes.map((repo) => (
              <RepoRow key={repo.id} {...repo} />
            ))
          )}
        </tbody>
      </MantineTable>
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
