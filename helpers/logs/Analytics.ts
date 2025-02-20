import type { AnalyticInterface } from '@/ts'

import { AnalyticModel } from '@/data/models'
import { Console } from '@/helpers/logs'
import { CurrentTimestamp } from '@/helpers/dates'

const Analytics = {
    Increase: async (properties: Array<keyof AnalyticInterface>): Promise<boolean> => {
        try {
            const changes: Record<keyof AnalyticInterface, number> = {} as Record<keyof AnalyticInterface, number>

            properties.forEach(property => {
                changes[property] = 1
            })

            await AnalyticModel.updateOne({}, { 
                $inc: changes, 
                set: { 
                    Updated_At: CurrentTimestamp() 
                } 
            })

            return true
        }

        catch (error) {
            Console.Error('Analytica.Increase', error)
            return false
        }
    },
    Decrease: async (properties: Array<keyof AnalyticInterface>): Promise<boolean> => {
        try {
            const changes: Record<keyof AnalyticInterface, number> = {} as Record<keyof AnalyticInterface, number>

            properties.forEach(property => {
                changes[property] = -1
            })

            await AnalyticModel.updateOne({}, { 
                $inc: changes, 
                set: { 
                    Updated_At: CurrentTimestamp() 
                } 
            })

            return true
        }

        catch (error) {
            Console.Error('Analytica.Decrease', error)
            return false
        }
    },
    Set: async (properties: Partial<AnalyticInterface>): Promise<boolean> => {
        try {
            await AnalyticModel.updateOne({}, { 
                $set: {
                    ...properties,
                    Updated_At: CurrentTimestamp()
                } 
            })

            return true
        }

        catch (error) {
            Console.Error('Analytica.Set', error)
            return false
        }
    },
    IncreaseDecreaseBulk: async (properties: Partial<AnalyticInterface>): Promise<boolean> => {
        try {
            await AnalyticModel.updateOne({}, { $inc: properties })
            return true
        }

        catch (error) {
            Console.Error('Analytica.IncreaseDecreaseBulk', error)
            return false
        }
    },
    Init: async (): Promise<boolean> => {
        try {
            const analyticInstance = new AnalyticModel({})
            await analyticInstance.save()

            return true
        }

        catch (error) {
            Console.Error('Analytica.Init', error)

            return false
        }
    }
}

export default Analytics