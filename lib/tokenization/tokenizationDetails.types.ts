export enum PAYMENT_TYPES {
    RECURRING = 'RECURRING',
    UNSCHEDULED = 'UNSCHEDULED'
}

export enum RECURRING_FREQUENCY {
    DAILY = 'DAILY',
    WEEKLY ='WEEKLY',
    BIWEEKLY = 'BIWEEKLY',
    FORTNIGHTLY = 'FORTNIGHTLY',
    MONTHLY = 'MONTHLY',
    QUARTERLY = 'QUARTERLY',
    YEARLY = 'YEARLY',
    AD_HOC = 'AD_HOC'
}

export type TokenizationDetails = {
    tokenize: boolean
    paymentType: keyof typeof PAYMENT_TYPES
    recurringFrequency?: keyof typeof RECURRING_FREQUENCY
    expiryDate?: string
}
