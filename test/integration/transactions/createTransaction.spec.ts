import { appId, apiKey, currency } from '../utils/config'
import Client from '../../../lib/common/client'
import { expect } from 'chai'
import { PAYMENT_TYPES, RECURRING_FREQUENCY } from '../../../lib/tokenization/tokenizationDetails.types'

describe('Create Transactions', () => {
    const client = new Client({
        apiKey: apiKey,
        appId: appId,
        sandbox: true,
    })

    it('should create a transaction', async () => {
        const response = await client.transactions.create({
            amount: 1234,
            currency: currency,
            customerReference: `John Doe INV-${Math.floor(Math.random() * 100)}`,
            localId: `TX-ID-${Math.floor(Math.random() * 100)}`,
            redirectUrl: 'https://www.apple.com',
            tokenizationDetails: {
                tokenize: true,
                recurringFrequency: RECURRING_FREQUENCY.AD_HOC,
                paymentType: PAYMENT_TYPES.UNSCHEDULED
            },
            customer: {
                name: 'John Doe',
                email: 'john.doe@example.com',
                billingAddress1: 'Infinite Loop',
                billingAddress2: '1',
                billingCity: 'Cupertino',
                billingPostCode: '95014',
                billingCountry: 'US',
                billingEmail: 'john.doe@example.com'
            }
        })
        expect(response.amount).to.eql(1234)
        expect(response.currency).to.eql(currency)
        expect(response.customerId).to.not.eql(null)
        expect(response.url).to.not.eql(null)
        expect(response.tokenizationDetails?.tokenize).to.eql(true)
    })
})
