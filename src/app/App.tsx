import { Container, Space, Title } from '@mantine/core';

import { Table } from '../stars';

export function App() {
  return (
    <Container>
      <Title order={1}>React-tagged GitHub Repositories</Title>
      <Space h="lg" />
      <Table />
    </Container>
  );
}
