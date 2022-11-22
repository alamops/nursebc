import { VStack } from '@chakra-ui/react';
import React from 'react';
import QueryButtons from './components/QueryButtons';
import ShiftComparison from './components/ShiftComparison';
import ShiftsList from './components/ShiftsList';

function App() {
  return (
    <VStack backgroundColor='gray.100' width='full' gap={10}>
      <ShiftComparison />
      <ShiftsList />
      <QueryButtons />
    </VStack>
  );
}

export default App;
