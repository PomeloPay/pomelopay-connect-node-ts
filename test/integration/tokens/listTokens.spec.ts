import { appId, apiKey, customerId } from '../utils/config'
import Client from '../../../lib/common/client'
import { expect } from 'chai'

describe('List Tokens', () => {
    const client = new Client({
        apiKey: apiKey,
        appId: appId,
        sandbox: true,
    })

    it('should get list tokens for a customer', async () => {
        const response = await client.tokens.getList(customerId)
        expect(response.items[0].provider).to.not.eql(null)
        expect(response.items[0].provider).to.not.eql(undefined)
        expect(response.items[0].token).to.not.eql(undefined)
        expect(response.items[0].token).to.not.eql(null)

    })
})
