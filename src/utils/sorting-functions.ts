import { SortMode } from '../components';
import { Repo } from '../models';

// Would normally test these, but not doing so in the interests of expediency.
export const SortingFunctionMap: Record<
  SortMode,
  (a: Repo, b: Repo) => number
> = {
  'stars-desc': (a: Repo, b: Repo): number => {
    return b.stargazerCount - a.stargazerCount;
  },
  'stars-asc': (a: Repo, b: Repo): number => {
    return a.stargazerCount - b.stargazerCount;
  },
  'forks-desc': (a: Repo, b: Repo): number => {
    return b.forkCount - a.forkCount;
  },
  'forks-asc': (a: Repo, b: Repo): number => {
    return a.forkCount - b.forkCount;
  },
};
