import moment from 'moment'

const BackupDate = (): string => {
    const now = moment()
    return now.format('YYYY-MM-DD_HH-mm-ss')
}

export default BackupDate