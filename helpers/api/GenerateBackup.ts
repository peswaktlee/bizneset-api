import type { Context } from 'hono'

import { HttpResponder } from '@/helpers/http'
import { Console } from '@/helpers/logs'
import { FormatModelBackupName } from '@/helpers/generals'
import { Backup } from '@/helpers/api'
import { BackupDate, CurrentTimestamp } from '@/helpers/dates'
import { MODELS_BACKUPS_NAMES } from '@/data/constants'

import { 
    AnalyticModel,
    BackupModel,
    BusinessModel,
    CategoryModel,
    LogModel,
    SaveModel,
    UserModel
} from '@/data/models'

const GenerateBackup = async (c: Context) => {
    try {
        const isGeneratingOne = await BackupModel
            .findOne({ Finished_Generation_At: null })
            .select({ _id: 1 })
            .lean()

        if (!isGeneratingOne) {      
            const startTime = Date.now()
            const entities = Object.keys(MODELS_BACKUPS_NAMES).length

            const backup = new BackupModel({
                Items: 0,
                Entities: entities,
                Size: 0,
                Time: 0,
                Started_Generation_At: CurrentTimestamp(),
                Finished_Generation_At: null
            })

            await backup.save()

            const backups = await BackupModel.find().lean()
            const businesses = await BusinessModel.find().lean()
            const categories = await CategoryModel.find().lean()
            const logs = await LogModel.find().lean()
            const saves = await SaveModel.find().lean()
            const users = await UserModel.find().lean()
            const analytics = await AnalyticModel.find().lean()

            const date = BackupDate()

            const { size: sBackups, path: pBackups } = await Backup(FormatModelBackupName(MODELS_BACKUPS_NAMES.BACKUPS), date, backups)
            const { size: sBusinesses, path: pBusinesses } = await Backup(FormatModelBackupName(MODELS_BACKUPS_NAMES.BUSINESSES), date, businesses)
            const { size: sCategories, path: pCategories } = await Backup(FormatModelBackupName(MODELS_BACKUPS_NAMES.CATEGORIES), date, categories)
            const { size: sLogs, path: pLogs } = await Backup(FormatModelBackupName(MODELS_BACKUPS_NAMES.LOGS), date, logs)
            const { size: sSaves, path: pSaves } = await Backup(FormatModelBackupName(MODELS_BACKUPS_NAMES.USER_SAVES), date, saves)
            const { size: sUsers, path: pUsers } = await Backup(FormatModelBackupName(MODELS_BACKUPS_NAMES.USERS), date, users)
            const { size: sAnalytics, path: pAnalytics } = await Backup(FormatModelBackupName(MODELS_BACKUPS_NAMES.ANALYTICS), date, analytics)

            const endTime = Date.now()
            const miliseconds = endTime - startTime

            const size =
                sBackups +
                sBusinesses +
                sCategories +
                sLogs +
                sSaves +
                sUsers +
                sAnalytics

            const length = 
                backups.length +
                businesses.length +
                categories.length +
                logs.length +
                saves.length +
                users.length +
                analytics.length

            backup.Time = miliseconds
            backup.Items = length
            backup.Size = size

            backup.Paths = [
                pBackups,
                pBusinesses,
                pCategories,
                pLogs,
                pSaves,
                pUsers,
                pAnalytics
            ]

            backup.Finished_Generation_At = CurrentTimestamp()

            await backup.save()

            return await HttpResponder({
                c,
                success: true,
                code: 200,
                data: backup,
                message: 'database-backup-was-successfully-generated'
            })
        }

        else return await HttpResponder({
            c,
            success: false,
            code: 500,
            data: null,
            message: 'a-backup-is-currently-being-generated'
        })
    }

    catch (error) {
        Console.Error('GenerateBackup', error)

        return await HttpResponder({
            c,
            success: false,
            code: 500,
            data: null,
            message: 'something-went-wrong-while-trying-to-backup-the-database'
        })
    }
}

export default GenerateBackup