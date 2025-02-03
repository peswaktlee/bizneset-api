import type { Context } from 'hono'

import { HttpResponder } from '@/helpers/http'
import { Console } from '@/helpers/logs'
import { FormatModelBackupName } from '@/helpers/generals'
import { Backup } from '@/helpers/api'
import { BackupDate, CurrentTimestamp } from '@/helpers/dates'
import { MODELS } from '@/data/constants'

import { 
    BackupModel,
    BusinessModel,
    CategoryModel,
    CityModel,
    CountryModel,
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
            const entities = Object.keys(MODELS).length

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
            const cities = await CityModel.find().lean()
            const countries = await CountryModel.find().lean()
            const logs = await LogModel.find().lean()
            const saves = await SaveModel.find().lean()
            const users = await UserModel.find().lean()

            const date = BackupDate()

            const { size: sBackups, path: pBackups } = await Backup(FormatModelBackupName(MODELS.BACKUP), date, backups)
            const { size: sBusinesses, path: pBusinesses } = await Backup(FormatModelBackupName(MODELS.BUSINESS), date, businesses)
            const { size: sCategories, path: pCategories } = await Backup(FormatModelBackupName(MODELS.CATEGORY), date, categories)
            const { size: sCities, path: pCities } = await Backup(FormatModelBackupName(MODELS.CITY), date, cities)
            const { size: sCountries, path: pCountries } = await Backup(FormatModelBackupName(MODELS.COUNTRY), date, countries)
            const { size: sLogs, path: pLogs } = await Backup(FormatModelBackupName(MODELS.LOG), date, logs)
            const { size: sSaves, path: pSaves } = await Backup(FormatModelBackupName(MODELS.USER_SAVE), date, saves)
            const { size: sUsers, path: pUsers } = await Backup(FormatModelBackupName(MODELS.USER), date, users)

            const endTime = Date.now()
            const miliseconds = endTime - startTime

            const size =
                sBackups +
                sBusinesses +
                sCategories +
                sCities +
                sCountries +
                sLogs +
                sSaves +
                sUsers

            const length = 
                backups.length +
                businesses.length +
                categories.length +
                cities.length +
                countries.length +
                logs.length +
                saves.length +
                users.length

            backup.Time = miliseconds
            backup.Items = length
            backup.Size = size

            backup.Paths = [
                pBackups,
                pBusinesses,
                pCategories,
                pCities,
                pCountries,
                pLogs,
                pSaves,
                pUsers
                
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