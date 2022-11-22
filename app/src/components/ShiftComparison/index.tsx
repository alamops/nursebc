import { FC, memo, useState, useEffect, useCallback } from 'react';
import { Button, HStack, VStack, Text, Tooltip } from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons'

const ShiftComparison: FC = () => {
  const [ value, setValue ] = useState<string>('');

  const handleClick = useCallback(() => {
    setValue('');
  }, [ setValue ]);

  useEffect(() => {
    setValue('');
  }, [ setValue ]);

  return (
    <HStack 
      gap={2} 
      width='full' 
      backgroundColor='white' 
      padding={4} 
      justifyContent='space-between' 
      alignItems='center'
    >
      <VStack gap={1} alignItems='flex-start'>
        <Text>
          <b>Overlap Minutes:</b> -
        </Text>

        <Text>
          <b>Max Overlap Threshold:</b> -
        </Text>

        <Text>
          <b>Exceeds Overlap Threshold:</b> -
        </Text>
      </VStack>

      <Tooltip 
        hasArrow
        label="Select two shifts for comparison" 
        aria-label="Compare Button Helper"
        isDisabled={false}
      >
        <Button colorScheme='blue' leftIcon={<ViewIcon />} loadingText='Comparing...'>
          Compare
        </Button>
      </Tooltip>
    </HStack>
  );
}

export default memo(ShiftComparison);
