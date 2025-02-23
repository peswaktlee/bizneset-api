import type { ObjectId } from 'mongoose'

import type { 
    BusinessStatusTypes,
    LogTypes, 
    UserRoleTypes 
} from '@/ts'

export interface AuthStateInterface {
    User: UserInterface | null | false
    Loading: boolean
    Error: boolean
    SmallLoading: boolean
    UserModal: boolean
    SetAuthState: (payload: Partial<AuthStateInterface>) => void
}

export interface ConfirmationStateInterface {
    Title: string
    Open: boolean
    onConfirm: () => void
    SetConfirmationState: (payload: Partial<ConfirmationStateInterface>) => void
}

export interface RequestFunctionReturnProps {
    success: boolean
    message: string
    code: number
    data: any
}

export interface CountryInterface {
    _id: string
    Name: string
    Code: string
    Posts: number
    Users: number
    Cities: number
    Created_At: Date
    Updated_At: Date
}

export interface UserInterface {
    _id: string
    Uid: string
    Name: string | null
    Surname: string | null
    Email: string
    Avatar: string | null
    Phone: string | null
    Role: UserRoleTypes
    Visits: number
    Businesses: number
    DeletedBusinesses: number
    Saves: number
    Country: CountryInterface | null
    City: CityInterface | null
    HasPendingBusinessSubmission: boolean
    Notifications: {
        GeneralUpdates: boolean
        OnBusinessStatuses: boolean
    }
    Last_Active_At: Date
    Created_At: Date
    Updated_At: Date | null
    Last_Avatar_Update_At: Date | null
    Mails: {
        OnWelcome: boolean
    }
}

export interface SaveInterface {
    _id: string
    User: UserInterface
    Business: BusinessInterface
    Saved_At: Date
}

export interface CityInterface {
    _id: string
    Name: string
    Country: CountryInterface
    Users: number
    Posts: number
    Created_At: Date
    Updated_At: Date | null
}

export interface LogInterface {
    _id: string
    Message: string
    Func: string
    Type: LogTypes
    Path: string
    IsServer: boolean
    User: UserInterface | null
    Occurred_At: Date
}

export interface CategoryInterface {
    _id: string
    Name: string
    Slug: string
    Businesses: number
    Position: number
    Created_At: Date
    Updated_At: Date | null
}


export interface HoursInterface {
    Monday: string | false
    Tuesday: string | false
    Wednesday: string | false
    Thursday: string | false
    Friday: string | false
    Saturday: string | false
    Sunday: string | false
}

export interface BusinessLocationInterface {
    Name: string
    Address: string
    Phone: string
    Email: string
    Website: string
    Hours: HoursInterface
}

export interface BusinessLinkInterface {
    Name: string
    Link: string
}

export interface BusinessInterface {
    _id: string
    Title: string
    Slug: string
    Logo: string | null
    Description: string
    User: UserInterface
    Category: CategoryInterface
    Website: string | null
    Email: string | null
    Status: BusinessStatusTypes
    RejectionNote: string
    Links: Array<BusinessLinkInterface>
    LinkCount: number
    Gallery: Array<string>
    Locations: Array<BusinessLocationInterface>
    LocationCount: number
    Visits: number
    Reach: number
    Saves: number
    Mails: {
        OnApprovalMail: boolean
        OnRejectionMail: boolean
        OnKViewsMail: boolean
        OnKKViewsMail: boolean
        OnKKKViewsMail: boolean
        OnKKKKViewsMail: boolean
    }
    Created_At: Date
    Delete_At: Date | null
    Updated_At: Date | null
}

export type BackupInterface = {
    _id: ObjectId
    Items: number
    Paths: Array<string | null>
    Entities: number
    Size: number
    Time: number
    Started_Generation_At: Date
    Finished_Generation_At: Date
}

export interface AnalyticInterface {
    TotalUsers: number
    TotalBusinesses: number
    TotalBusinessesViews: number
    TotalBusinessesReach: number
    TotalUserVisits: number
    TotalBusinessSaves: number
    Updated_At: Date
}