import { appId, apiKey, currency, merchantToken, customerId } from '../utils/config'
import Client from '../../../lib/common/client'
import { expect } from 'chai'
import { PAYMENT_TYPES, RECURRING_FREQUENCY } from '../../../lib/tokenization/tokenizationDetails.types'

describe('Stored Credentials Merchant Initiated', () => {

    const baseConfig = {
        apiKey: apiKey,
        appId: appId,
        sandbox: true,
    }
    const client = new Client(baseConfig)
    const cardPaymentClient = new Client({
        ...baseConfig,
        directCardAuthenticationHost: true
    })

    it('should create a transaction and then create a card payment using stored credentials initiated by the merchant', async () => {
        const response = await client.transactions.create({
            amount: 1234,
            currency: currency,
            customerReference: `John Doe INV-${Math.floor(Math.random() * 100)}`,
            localId: `TX-ID-${Math.floor(Math.random() * 100)}`,
            redirectUrl: 'https://www.apple.com',
            tokenizationDetails: {
                tokenize: false,
                recurringFrequency: RECURRING_FREQUENCY.AD_HOC,
                paymentType: PAYMENT_TYPES.UNSCHEDULED
            },
            provider: 'debit_credit_card',
            customerId: customerId,
            customerAsPayer: true
        })

        const merchantInitiated = await cardPaymentClient.cardPayments?.merchantInitiatedStoredCredentials({
            token: merchantToken,
            customerId: customerId,
            transactionId: response.id
        })

        expect(merchantInitiated?.transactionId).to.not.equal(null)
        expect(merchantInitiated?.transactionId.length).to.equal(24)
        expect(merchantInitiated?.authCode).to.not.eql(null)
    })
})
