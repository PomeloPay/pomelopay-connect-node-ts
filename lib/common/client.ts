import axios, { Axios, AxiosDefaults } from 'axios'
import { merge, omit } from 'lodash'
import Transactions from '../transaction'
import CardPayments from '../cardPayments'
import { Hosts } from '../config/hosts'
import Tokens from '../tokens'

interface RequestOptions {
    url: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params?: any
}

type Constructor = {
    appId: string
    apiKey: string
    directCardAuthenticationHost?: boolean|undefined
    sandbox?: boolean|undefined
}

export default class Client {
    axiosInstance: Axios
    transactions: Transactions
    tokens: Tokens
    cardPayments?: CardPayments
    requestOpts: Partial<AxiosDefaults>
    propertiesToOmitInRequestOpts: string[]
    appId: string|undefined
    apiKey: string|undefined
    directCardAuthenticationHost: boolean|undefined
    sandbox: boolean | undefined

    constructor(args: Constructor) {

        this.directCardAuthenticationHost = args.directCardAuthenticationHost

        const [appId, apiKey] = Client.getAuthDetails(args)

        this.appId = appId
        this.apiKey = apiKey
        this.sandbox = args.sandbox

        if (!this.appId || this.apiKey === undefined) {
            throw new Error(
                'Missing required appId and apiKey to build a client'
            )
        }

        if(this.directCardAuthenticationHost) {
            this.cardPayments = new CardPayments(this)
        } else {
            this.transactions = new Transactions(this)
            this.tokens = new Tokens(this)
        }

        this.requestOpts = {
            baseURL: this.getBaseUrl(args)
        }

        this.propertiesToOmitInRequestOpts = ['headers.common.Accept']

        this.axiosInstance = this.initiateAxiosInstance()


    }

    initiateAxiosInstance(): Axios {
        const defaultHeaders = {
            'User-Agent': `pomelopay-connect-node-ts/${this.appId}`,
            Accept: 'application/json',
            Authorization: this.apiKey
        }

        const axiosInstance = axios.create({
            baseURL: this.requestOpts.baseURL
        })

        axiosInstance.defaults.headers.common = merge(
            axiosInstance.defaults.headers.common,
            defaultHeaders
        )

        return axiosInstance
    }

    useRequestOpts(opts: Partial<AxiosDefaults>) {
        const filteredOpts = this.filterUnwantedProperties(opts)

        this.requestOpts = merge(this.requestOpts, filteredOpts)
        this.updateAxiosInstanceDefaults()

        return this
    }

    updateAxiosInstanceDefaults(): void {
        this.axiosInstance.defaults = merge(
            this.axiosInstance.defaults,
            this.requestOpts
        )
    }

    filterUnwantedProperties(
        opts: Partial<AxiosDefaults>
    ): Partial<AxiosDefaults> {
        return omit(opts, this.propertiesToOmitInRequestOpts)
    }

    getBaseUrl(args: Constructor): string {
        if(args.directCardAuthenticationHost) {
            if(args.sandbox) {
                return Hosts.cardPaymentApiSandbox
            }
            return Hosts.cardPaymentApiProduction
        }

        if(args.sandbox) {
            return Hosts.merchantApiSandbox
        }

        return Hosts.merchantApiProduction
    }

    async post<T>({ url, data }: RequestOptions): Promise<T> {
        try {
            const response = await this.axiosInstance.post(url, data)

            return response.data
        } catch (err) {
            throw err
        }
    }

    async get<T>({ url, data, params }: RequestOptions): Promise<T> {
        try {
            const response = await this.axiosInstance.get(url, {
                params,
                data,
            })

            return response.data
        } catch (err) {
            throw err
        }
    }

    private static getAuthDetails(
        args: Constructor
    ): [appId: string | undefined, apiKey: string | undefined] {
        if (args.appId && args.apiKey) {
            return [args.appId, args.apiKey]
        }

        return [undefined, undefined]
    }
}
