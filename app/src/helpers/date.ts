import moment from 'moment';

export const formatDay = (date: Date): string => {
  return moment(date).format('YYYY-MM-DD')
}

export const formatTime = (date: Date): string => {
  return moment(date).format('hh:mm A')
}
