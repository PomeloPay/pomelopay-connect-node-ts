import Client from './common/client'
import { Company } from './companies/companies.types'

export default class Companies {

    public readonly baseUrl = 'me'

    constructor(private readonly client: Client) {
        this.client = client
    }

    get() {
        return this.client.get<Company>({
            url: `/${this.baseUrl}`
        })
    }
}
