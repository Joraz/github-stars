import { Center, Group, Text, UnstyledButton } from '@mantine/core';
import { IconSelector, IconChevronDown, IconChevronUp } from '@tabler/icons';

export type SortableHeaderProps = {
  text: string;
  sorted: boolean;
  reversed: boolean;
  onClick: () => void;
};

export const SortableHeader = ({
  onClick,
  reversed,
  sorted,
  text,
}: SortableHeaderProps) => {
  let Icon = IconSelector;
  if (sorted) {
    if (reversed) {
      Icon = IconChevronUp;
    } else {
      Icon = IconChevronDown;
    }
  }
  return (
    <th>
      <UnstyledButton onClick={onClick}>
        <Group position="apart">
          <Text>{text}</Text>
          <Center>
            <Icon size={14} data-testid="header-icon" />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  );
};
