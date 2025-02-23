import moment, { DurationInputArg2 } from 'moment'

import { TimestampFormat } from '@/data/constants'

const TimestampPlusDays = (
    count: number,
    mode: DurationInputArg2,
    f?: string
): Date => {
    const now = moment()
    const format = f ? f : TimestampFormat

    now.add(count, mode)
    now.format(format)

    return now.toDate()
}

export default TimestampPlusDays