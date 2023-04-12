import { appId, apiKey } from '../utils/config'
import Client from '../../../lib/common/client'
import { expect } from 'chai'

describe('Get My Company', () => {

    const client = new Client({
        apiKey: apiKey,
        appId: appId,
        sandbox: true,
    })

    it('should get a comapany', async () => {
        const response = await client.companies.get()
        expect(response.id.length).to.eql(24)
        expect(response.enabledCurrencies.length).to.eql(1)
        expect(response.country).to.not.eql(null)
    })
})
