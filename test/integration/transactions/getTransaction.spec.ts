import { appId, apiKey, transactionId } from '../utils/config'
import Client from '../../../lib/common/client'
import { expect } from 'chai'

describe('Get Transactions', () => {
    const client = new Client({
        apiKey: apiKey,
        appId: appId,
        sandbox: true,
    })

    it('should get a transaction', async () => {
        const response = await client.transactions.get(transactionId)
        expect(response.amount).to.not.eql(null)
        expect(response.currency.length).to.eql(3)
        expect(response.id.length).to.eql(24)
    })
})
