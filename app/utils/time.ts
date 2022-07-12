import moment from 'moment'

export const formatDateTimeString = (date: Date) => moment(date).format('D MMMM YYYY, HH:mm UTCZ');