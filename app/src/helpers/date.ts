import moment from 'moment';

export const formatDateTime = (date: Date): string => {
  return moment(date).format('MM/DD/YYYY HH:mm:ss')
}
