import Client from './common/client'
import { Config, Hosts } from './config/hosts'
import { Token } from './tokenization/tokens.types'

export default class Tokens {

    constructor(private client: Client) {
        this.client = client
    }

    getList(customerId: string) {
        return this.client.useRequestOpts({baseURL: this.getBaseUrl()}).get<{count: number, items: Array<Token>}>({
            url: `/${customerId}/tokens`
        })
    }

    get(customerId: string, tokenId: string) {
        return this.client.get<Token>({
            url: `/${customerId}/tokens/${tokenId}`
        })
    }

    private getBaseUrl(): string {
        if(this.client.sandbox) {
            return Hosts.customertApiSandbox.replace('[tenantSandboxDomain]', Config.tenantSandboxDomain)
        }
        return Hosts.customerApiProduction.replace('[tenantDomain]', Config.tenantDomain)
    }
}
