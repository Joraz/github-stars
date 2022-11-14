import { useState } from 'react';

import styled from '@emotion/styled';
import { CloseButton, Text, TextInput } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';

import { Pagination } from '../app/shared';
import { Table as PresTable } from './components/Table';
import { useGetRepositories } from './hooks';

const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const DEFAULT_TOPIC = 'react';

export const Table = () => {
  const [offset, setOffset] = useState(0);
  const [topic, setTopic] = useState(DEFAULT_TOPIC);
  const [debouncedTopic] = useDebouncedValue(topic, 500);

  const { data, error, loading, refetch } = useGetRepositories({
    query: `topic:${debouncedTopic} sort:stars-desc`,
    first: 20,
  });

  if (error) {
    return <Text c="red">Oops! An error occurred when fetching the data</Text>;
  }

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
    <TableWrapper>
      <TextInput
        label="Topic Tag"
        value={topic}
        onChange={({ target: { value } }) => {
          setTopic(value.toLowerCase());
        }}
        rightSection={
          <CloseButton
            onClick={() => {
              setTopic('');
            }}
          />
        }
      />
      <PresTable isLoading={loading} data={data?.search.nodes} />
      <Pagination
        disableBack={!data?.search.pageInfo.hasPreviousPage}
        disableForwards={!data?.search.pageInfo.hasNextPage}
        totalCount={data?.search.repositoryCount}
        offset={offset}
        onClick={handlePaginationChange}
      />
    </TableWrapper>
  );
};
