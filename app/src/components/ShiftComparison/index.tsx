import { FC, memo, useCallback, useMemo } from 'react';
import { Button, VStack, Text, Tooltip, Flex } from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons'
import { useDispatch, useSelector } from 'react-redux';
import { getIsComparing, getSelectedShifts, getShiftsComparisonResult } from '../../redux/comparison/selectors';
import { compareShifts } from '../../redux/comparison/thunks';
import { AppDispatch } from '../../redux';

const ShiftComparison: FC = () => {
  const dispatch = useDispatch<AppDispatch>()

  const selectedShifts = useSelector(getSelectedShifts)
  const shiftsComparisonResult = useSelector(getShiftsComparisonResult)
  const isComparing = useSelector(getIsComparing)

  const {
    overlapMinutes,
    maximumOverlapThreshold,
    exceedsOverlapThreshold
  } = useMemo(() => {
    return {
      overlapMinutes: shiftsComparisonResult?.overlapMinutes ?? '-',
      maximumOverlapThreshold: shiftsComparisonResult?.maximumOverlapThreshold ?? '-',
      exceedsOverlapThreshold: shiftsComparisonResult ? shiftsComparisonResult.exceedsOverlapThreshold ? 'True' : 'False' : '-'
    }
  }, [shiftsComparisonResult])

  const isCompareButtonAvailable = useMemo((): boolean => {
    return selectedShifts.length === 2
  }, [selectedShifts])

  const handleClick = useCallback(() => {
    dispatch(compareShifts())
  }, [ dispatch ]);

  return (
    <Flex 
      flexDirection={['column', 'column', 'row']}
      gap={2} 
      width='full' 
      backgroundColor='white' 
      padding={4} 
      justifyContent='space-between' 
      alignItems='center'
    >
      <VStack gap={1} alignItems='flex-start'>
        <Text>
          <b>Overlap Minutes:</b> {overlapMinutes}
        </Text>

        <Text>
          <b>Max Overlap Threshold:</b> {maximumOverlapThreshold}
        </Text>

        <Text>
          <b>Exceeds Overlap Threshold:</b> {exceedsOverlapThreshold}
        </Text>
      </VStack>

      <Tooltip 
        hasArrow
        label="Select two shifts for comparison" 
        aria-label="Compare Button Helper"
        isDisabled={isCompareButtonAvailable}
      >
        <Button 
          colorScheme='blue' 
          leftIcon={<ViewIcon />} 
          isLoading={isComparing}
          loadingText='Comparing...'
          onClick={handleClick}
          isDisabled={!isCompareButtonAvailable}
        >
          Compare
        </Button>
      </Tooltip>
    </Flex>
  );
}

export default memo(ShiftComparison);
