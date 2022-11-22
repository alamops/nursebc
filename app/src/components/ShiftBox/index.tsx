import { FC, memo, useCallback, useMemo } from 'react';
import { Card, CardBody, Heading, Text, VStack } from '@chakra-ui/react'
import { ShiftBoxProps } from './types';
import { formatDay, formatTime } from '../../helpers/date';
import { useDispatch, useSelector } from 'react-redux';
import { toggleShift } from '../../redux/comparison';
import { getSelectedShifts } from '../../redux/comparison/selectors';

const ShiftBox: FC<ShiftBoxProps> = ({ shift }) => {
  const dispatch = useDispatch()

  const selectedShifts = useSelector(getSelectedShifts)

  const isSelected = useMemo((): boolean => {
    return !!selectedShifts.find(item => item.id === shift.id)
  }, [selectedShifts, shift])

  const handleCardClick = useCallback(() => {
    dispatch(toggleShift(shift))
  }, [shift])

  return (
    <Card
      cursor='pointer'
      backgroundColor={isSelected ? 'blue.300' : 'white'}
      boxShadow='md'
      onClick={handleCardClick}
      marginStart={'0px !important'}
      marginInline={'0px !important'}
    >
      <CardBody>
        <VStack gap={2}>
          <Heading size='lg'>
            {shift.facility.name}
          </Heading>

          <VStack>
            <Text>
              {formatDay(shift.startAt)}
            </Text>
            <Text>
              {formatTime(shift.startAt)} - {formatTime(shift.endAt)}
            </Text>
          </VStack>
        </VStack>
      </CardBody>
    </Card>
  );
}

export default memo(ShiftBox);
