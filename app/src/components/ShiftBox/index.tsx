import { FC, memo, useCallback, useState } from 'react';
import { Box, Card, CardBody, Heading, Text, VStack } from '@chakra-ui/react'
import { ShiftBoxProps } from './types';
import { formatDateTime } from '../../helpers/date';

const ShiftBox: FC<ShiftBoxProps> = ({ shift }) => {
  const [isSelected, setSelected] = useState<boolean>(false)
  
  const handleCardClick = useCallback(() => {
    // TODO:
    setSelected(!isSelected)
  }, [isSelected])

  return (
    <Card
      cursor='pointer'
      backgroundColor={isSelected ? 'blue.300' : 'white'}
      boxShadow='md'
      onClick={handleCardClick}
    >
      <CardBody>
        <VStack gap={4}>
          <Heading size='lg'>
            {shift.facility.name}
          </Heading>

          <VStack gap={1}>
            <Text>
              <b>Start At:</b> {formatDateTime(shift.startAt)}
            </Text>
            <Text>
              <b>End At:</b> {formatDateTime(shift.endAt)}
            </Text>
          </VStack>
        </VStack>
      </CardBody>
    </Card>
  );
}

export default memo(ShiftBox);
