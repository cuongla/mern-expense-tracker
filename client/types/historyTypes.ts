import { StringNullableChain } from "lodash";

export interface ILocation {
    from: {
        pathname: string
    }
}

export interface ICredentials {
    t?: string
}

export interface IParams {
    userId?: string
    expenseId?: string
}