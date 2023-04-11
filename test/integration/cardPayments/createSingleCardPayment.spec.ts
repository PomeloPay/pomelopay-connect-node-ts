import { appId, apiKey, currency, customerId } from '../utils/config'
import Client from '../../../lib/common/client'
import { expect } from 'chai'
import { PAYMENT_TYPES, RECURRING_FREQUENCY } from '../../../lib/tokenization/tokenizationDetails.types'

describe('Create Single Payment', () => {

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

    it('should create a transaction and then pay it with a card', async () => {
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
            provider: 'debit_credit_card',
            customerId: customerId
        })

        const singlePayment = await cardPaymentClient.cardPayments?.singlePayment({
            cardNumberRaw: "4242424242424242", // this is a test card which can be published with full PAN
            cardExpDateRaw: "2312",
            cardVDRaw: "488",
            transactionId: response.id,
            postalCode: "E15 5AB",
            cardHolderName: "John Doe",
            customerId: customerId
        })

        expect(singlePayment?.nextAction).to.not.equal(null)
        expect(singlePayment?.nextAction.substring(0,5)).to.eql('https')
        console.log(singlePayment?.nextAction)
    })
})
