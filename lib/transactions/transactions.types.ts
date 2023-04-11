import { Customer } from '../customers/customers.types'
import { TokenizationDetails } from '../tokenization/tokenizationDetails.types'

export type CreateTransactionRequest = {
    amount: number
    currency: string
    isPreAuthorization?: boolean
    localId?: string
    provider?: string
    redirectUrl?: string
    webhook?: string
    validForHours?: number
    customerReference?: string
    paymentAttemptFailureUrl?: string
    customer?: Customer
    customerId?: string
    tokenizationDetails?: TokenizationDetails
    customerAsPayer?: boolean
    sendCustomerEmailReceipt?: boolean
}

export type Transaction = Omit<CreateTransactionRequest, 'validForHours'> & { expires? : string }

export type ReturnedTransaction = Omit<Transaction, 'customerId'> & { id: string, qr?: { url: string }, url: string, vendorUrl?: string, vendorQrCode?: string, shortUrl?: string, customerId: string }
