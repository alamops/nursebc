import { FC, memo, useState, useEffect } from 'react';
import { HStack, Flex, Text } from '@chakra-ui/react'
import { Shift } from '../../../../api/src/routes/shifts/models/types';
import ShiftBox from '../ShiftBox';

const ShiftsList: FC = () => {
  const [ shifts, setShifts ] = useState<Shift[] | null | undefined>();
  const [ errorMessage, setErrorMessage ] = useState<string>('')

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/shifts/all`)
      .then(res => res.json())
      .then(res => {
        setErrorMessage('')
        setShifts(res)
      })
      .catch(e => {
        console.error(e)
        setShifts(null)
        setErrorMessage('Oops! Something wrong happened while trying to fetch the shift records.')
      })

    return () => {
      setErrorMessage('')
      setShifts(undefined)
    }
  }, [])

  if (errorMessage.length > 0) {
    return (
      <HStack width='full' padding={10} justifyContent='center' alignItems='center'>
        <Text>{errorMessage}</Text>
      </HStack>
    )
  }

  return (
    <Flex
      flexDirection={['column', 'row']}
      justifyContent={['center', 'flex-start']}
      gap={5} 
      flexWrap='wrap' 
      paddingX={5}>
      {shifts?.map(shift => (
        <ShiftBox key={shift.id} shift={shift} />
      ))}
    </Flex>
  );
}

export default memo(ShiftsList);
