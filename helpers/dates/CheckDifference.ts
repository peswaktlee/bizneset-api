import moment, { unitOfTime } from 'moment'

const CheckDifference = (compareTo: string, unitOfTime?: unitOfTime.Diff): number => {
    const now = moment()
    const compare = moment(compareTo)

    const diff = now.diff(compare, unitOfTime)

    return diff
}

export default CheckDifference