export type Address = {
    building_number: string|null
    building_name: string|null
    street: string
    postcode: string
    country: string
}

export type Provider = {
    ecommerce: boolean
    mobile: boolean
    description: string
    customerDescription: string
    value: string
    shopBadge: string|null
}

export type Company = {
    id: string
    created: string
    tradingName: string
    registeredName: string
    enabledCurrencies: Array<string>
    reviewStatus: string
    companyNumber: string|null
    vatNumber: string|null
    tradingAddress: Address
    registeredAddress: Address
    country: string
    paymentProviders: Array<Provider>
}