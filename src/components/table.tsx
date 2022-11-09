import { Table as MantineTable, Text } from '@mantine/core';

import { Repo } from '../models';
import { RepoRow } from './RepoRow';
import { SortableHeader } from './SortableHeader';

export type SortMode = 'stars-desc' | 'stars-asc' | 'forks-desc' | 'forks-asc';

export type TableProps = {
  isLoading?: boolean;
  data?: Array<Repo>;
  sortMode: SortMode;
  onSortModeChange: (mode: SortMode) => void;
};

export const Table = ({
  sortMode,
  data,
  isLoading,
  onSortModeChange,
}: TableProps) => {
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
                onSortModeChange(
                  sortMode === 'stars-desc' ? 'stars-asc' : 'stars-desc'
                );
              }}
            />
            <SortableHeader
              text="No. of Forks"
              sorted={sortMode === 'forks-asc' || sortMode === 'forks-desc'}
              reversed={sortMode === 'forks-asc'}
              onClick={() => {
                onSortModeChange(
                  sortMode === 'forks-desc' ? 'forks-asc' : 'forks-desc'
                );
              }}
            />
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={3}>Loading...</td>
            </tr>
          ) : (
            data?.map((repo) => <RepoRow key={repo.url} {...repo} />)
          )}
        </tbody>
      </MantineTable>
    </>
  );
};
