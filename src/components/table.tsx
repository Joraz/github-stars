import { Table as MantineTable, Text } from '@mantine/core';

import { Repo } from '../models';
import { RepoRow } from './RepoRow';

export type TableProps = {
  isLoading?: boolean;
  data?: Array<Repo>;
};

export const Table = ({ data, isLoading }: TableProps) => {
  return (
    <>
      <MantineTable striped>
        <thead>
          <tr>
            <th>
              <Text>Repository Name</Text>
            </th>
            <th>
              <Text>No. of Stars</Text>
            </th>
            <th>
              <Text>No. of Forks</Text>
            </th>
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
