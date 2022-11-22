import { FC, memo, useState, useCallback } from 'react';
import { Button, Flex } from '@chakra-ui/react'
import { QueryButton } from './types';

const QueryButtons: FC = () => {
  const [ buttons ] = useState<QueryButton[]>([
    {
      name: 'Execute Q4 Query',
      endpoint: '/facilities/availability'
    },
    {
      name: 'Execute Q5 Query',
      endpoint: '/nurses/hiring-availability'
    },
    {
      name: 'Execute Q6 Query',
      endpoint: '/nurses/coworkers?nurseId=1001'
    }
  ]);

  const handleButtonClick = useCallback((button: QueryButton) => {
    fetch(`${process.env.REACT_APP_API_URL}${button.endpoint}`)
      .then(res => res.json())
      .then(res => console.table(res))
      .catch(e => console.error(e))
   }, [])

  return (
    <Flex 
      flexDirection={['column', 'column', 'row']} 
      width={'full'} 
      gap={10} 
      justifyContent='space-between' 
      alignItems='center' paddingX={10}
    >
      {buttons.map(button => (
        <Button 
          key={button.name} 
          onClick={() => handleButtonClick(button)}
          colorScheme='blue'
        >
          {button.name}
        </Button>
      ))}
    </Flex>
  );
}

export default memo(QueryButtons);
