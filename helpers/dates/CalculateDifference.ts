import moment from 'moment'

const CalculateDifference = (startTimestamp: Date, endTimestamp?: Date) => {
    const endTimestampValue = endTimestamp ? endTimestamp : moment()

    const start = moment(startTimestamp)
    const end = moment(endTimestampValue)

    const duration = moment.duration(end.diff(start))
    const seconds = duration.asSeconds()
    const minutes = duration.asMinutes()
    const hours = duration.asHours()
    const days = Math.floor(duration.asDays())

    return { 
        seconds, 
        minutes,
        hours,
        days
    }
}

export default CalculateDifference