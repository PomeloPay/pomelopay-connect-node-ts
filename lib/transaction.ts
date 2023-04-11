import _ from 'lodash'
import moment from 'moment'
import Client from './common/client'
import { CreateTransactionRequest, ReturnedTransaction, Transaction } from './transactions/transactions.types'

export default class Transactions {

    public readonly postBaseUrl = 'v2/transactions'
    public readonly baseUrl = 'transactions'

    constructor(private readonly client: Client) {
        this.client = client
    }

    create(transaction: CreateTransactionRequest) {

        let expires = null
        if(transaction.validForHours) {
            expires = moment().add('days', transaction.validForHours).toISOString()
        }
        const requestData: Transaction = _.omit(transaction, ['validForHours'])

        if(expires) {
            requestData.expires = expires
        }

        return this.client.post<ReturnedTransaction>({
            url: `/${this.postBaseUrl}`,
            data: requestData
        })
    }

    get(id: string) {
        return this.client.get<ReturnedTransaction>({
            url: `/${this.baseUrl}/${id}`
        })
    }
}
