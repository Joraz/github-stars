import { useState } from 'react';

import { useGetRepositories } from './hooks';

function App() {
  const [count, setCount] = useState(0);

  const { data, loading, error } = useGetRepositories({
    query: 'topic:react sort:stars-desc',
  });
  console.log(JSON.stringify(data?.search.nodes, null, 2));

  return (
    <div style={{}}>
      {data?.search.nodes.map(({ forkCount, name, stargazerCount }) => (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <p>
            {name} - {stargazerCount} - {forkCount}
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;
