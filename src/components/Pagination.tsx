import { Button, Flex } from '@mantine/core';

export type PaginationProps = {
  disableBack?: boolean;
  disableForwards?: boolean;
  totalCount?: number;
  offset: number;
  onClick: (direction: 'back' | 'forward') => void;
};

export const Pagination = ({
  offset,
  onClick,
  totalCount,
  disableBack,
  disableForwards,
}: PaginationProps) => {
  return (
    <Flex justify="space-between">
      <Button
        disabled={disableBack}
        onClick={() => onClick('back')}
        data-testid="previous-button"
      >
        Prev
      </Button>
      {offset + 1} to {offset + 20} of {totalCount} results
      <Button
        disabled={disableForwards}
        onClick={() => onClick('forward')}
        data-testid="next-button"
      >
        Next
      </Button>
    </Flex>
  );
};
