export type Customer = {
    name: string
    email: string
    billingEmail: string
    billingAddress1: string
    billingAddress2?: string
    billingCity: string
    billingCountry: string
    billingPostCode: string
    customerGroup?: string
    currency?: string
    paymentDue?: number
    invoicePrefix?: string
    taxInformation?: string
    taxId?: string
}
