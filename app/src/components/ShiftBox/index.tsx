import { FC, memo, useCallback, useMemo, useState } from 'react';
import { Card, CardBody, Heading, Text, VStack } from '@chakra-ui/react'
import { ShiftBoxProps } from './types';
import { formatDateTime } from '../../helpers/date';
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
