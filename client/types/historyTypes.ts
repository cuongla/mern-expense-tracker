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
    shopId?: string
    productId?: string
    orderId?: string
    auctionId?: string
    category?: string
    search?: string
    cartItemId?: string
}