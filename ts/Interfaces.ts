import type { 
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
    Code: number
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
    Country: CountryInterface | null
    City: CityInterface | null
    Last_Active_At: Date
    Created_At: Date
    Updated_At: Date | null
}

export interface CityInterface {
    _id: string
    Name: string
    Users: number
    Country: CountryInterface
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

export interface BusinessInterface {
    _id: string
    Name: string
    Slug: string
    Website: string
    Links: Array<string>
    Locations: Array<string>
    User: UserInterface
}