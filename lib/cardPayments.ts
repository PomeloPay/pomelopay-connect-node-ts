import { MerchantInitiatedResult } from './cardPayments/merchantInitiatedResult.types'
import { NextAction } from './cardPayments/nextAction.types'
import { SinglePaymentRequest } from './cardPayments/singlePayment.types'
import { StoredCredentialCustomerInitiated } from './cardPayments/storedCredentialCustomerInitiated.types'
import { StoredCredentialMerchantInitiated } from './cardPayments/storedCredentialMerchantInitiated.types'
import Client from './common/client'


export default class CardPayments {

    private readonly pathCardPaymentsDirect = 'card-payments-direct'
    private readonly pathCustomerInitiatedStoredCredentials = 'card-payments-stored-credentials'
    private readonly pathMerchantInitiatedStoredCredentials = 'card-payments-recurring'

    constructor(private client: Client) {
        if(!client.directCardAuthenticationHost) {
            throw Error('Client has not been initiated with direct card authentication host')
        }
        this.client = client
    }

    singlePayment(singlePayment: SinglePaymentRequest) {
        return this.client.post<NextAction>({
            url: `/${this.pathCardPaymentsDirect}`,
            data: singlePayment
        })
    }

    customerInitiatedStoredCredentialsPayment(customerStoredCredentials: StoredCredentialCustomerInitiated) {
        return this.client.post<NextAction>({
            url: `/${this.pathCustomerInitiatedStoredCredentials}`,
            data: customerStoredCredentials
        })
    }

    merchantInitiatedStoredCredentials(merchantStoredCredentials: StoredCredentialMerchantInitiated) {
        return this.client.post<MerchantInitiatedResult>({
            url: `/${this.pathMerchantInitiatedStoredCredentials}`,
            data: merchantStoredCredentials
        })
    }
}
