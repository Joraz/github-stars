import { Repo } from '../models';

export type RepoRowProps = Repo;

export const RepoRow = ({
  forkCount,
  name,
  stargazerCount,
  url,
}: RepoRowProps) => {
  return (
    <tr>
      <td>
        <a href={url} target="_blank" rel="noreferrer">
          {name}
        </a>
      </td>
      <td>{stargazerCount}</td>
      <td>{forkCount}</td>
    </tr>
  );
};
