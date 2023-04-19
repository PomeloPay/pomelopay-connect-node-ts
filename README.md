# Pomelo Pay Connect Node TS

> NodeJS with TypeScript types API Client and bindings for the [Pomelo Pay Connect API](https://docs.pomelopay.com)

Using this  Client you can interact with your Pomelo Pay Connect API:
- 💰 __Transactions__
- 💼 __Companies__
- 🔐 __Tokens__
- 💳 __Card Payments__ (_If you are certified as a PCI-DSS merchant_)

## Installation

- Requires NodeJS 8 or higher
- For contributing with development of this client: requires TypeScript 4

The recommended way to install pomelopay-connect-node-ts is through [NPM](https://npmjs.com):

To get started, just install the package:

```
$ npm i pomelopay-connect-node-ts
```

## Quick Start

First get your `production` or `sandbox` API key from your [Dashboard](https://dashboard.pomelopay.com).

If you want to get a `production` client:

```node
import Client from 'pomelopay-connect-node-ts'

const client = new Client({appId: <your-app-id>, apiKey: <your-api-key>})
```

If you want to get a `sandbox` client:

```node
import Client from 'pomelopay-connect-node-ts'

const client = new Client({appId: <your-app-id>, apiKey: <your-api-key>, sandbox: true})
```

If you want to get a `cardPayments` client (if you are certified as a PCI-DSS merchant and we've enabled this setting foryou):

```node
import Client from 'pomelopay-connect-node-ts'

// production client
const client = new Client({appId: <your-app-id>, apiKey: <your-api-key>, directCardAuthenticationHost: true})

 // sandbox client
const client = new Client({appId: <your-app-id>, apiKey: <your-api-key>, directCardAuthenticationHost: true, sandbox: true})
```

## Available API Operations

The following exposed API operations from the Pomelo Pay Connect API are available using the API Client.

See below for more details about each resource.

### 💰 __Transactions__

##### Get a single creation
https://docs.pomelopay.com/docs/connect/12ec79b138bce-get-transaction

```node
const transaction = await client.transactions.get('<transaction-id>')
```

##### Create a transaction
https://docs.pomelopay.com/docs/connect/7778c88abc14b-create-transaction-v2

The below example includes a lot of optional fields to give an extensive detail on what's possible. As a minimum just `currency` and `amount` is required.

```node
const transaction = await client.transactions.create({
        amount: 1234,
        currency: 'USD',
        customerReference: `iPhone 13`,
        localId: `TX-ID-30483-2023`,
        redirectUrl: 'https://www.apple.com/thank-you',
        paymentAttemptFailureUrl: 'https://www.apple.com/retry-checkout',
        tokenizationDetails: {
            tokenize: true,
            recurringFrequency: 'AD_HOC',
            paymentType: 'UNSCHEDULED'
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
```

You can then redirect the user to the `transaction.url` or `transaction.vendorUrl` to complete card payment.
You can also display the QR code image for the users to scan from `transaction.qr.url`. 

### 💼 __Companies__

##### Get your company details
https://docs.pomelopay.com/docs/connect/e0574ed2792c2-get-company

```node
const company = await client.companies.get()
```

### 🔐 __Tokens__

##### Get list of tokens for a customer
https://docs.pomelopay.com/docs/connect/809153cac2c6a-get-list-of-tokens-for-customer

```node
const tokens = await client.tokens.getList(<customer-id>)
```

##### Get a single token
https://docs.pomelopay.com/docs/connect/9d65f123f944e-get-single-token-for-customer

```node
const token = await client.tokens.get(<customer-id>, <token-id>)
```

### 💳 __Card Payments__

For card payment operations your merchant account has to be PCI-DSS certified to be able to send us card PANs and sensitive card data directly.

When using these API's you need to get a directCardAuthenticationHost client that connects to a specific domain at our API that is certified to accept card details.

```node
import Client from 'pomelopay-connect-node-ts'

// production client
const client = new Client({appId: <your-app-id>, apiKey: <your-api-key>, directCardAuthenticationHost: true})
```

##### Single Card Payment
https://docs.pomelopay.com/docs/pomelo-pay-pci-connect/3f679981bd5e2-direct-card-payments

```node

 const singlePayment = await client.cardPayments.singlePayment({
            cardNumberRaw: "4242424242424242", // this is a test card which can be published with full PAN
            cardExpDateRaw: "2312", // YYMM
            cardVDRaw: "488",
            transactionId: "<transaction-id>",
            postalCode: "E15 5AB",
            cardHolderName: "John Doe",
            customerId: "<customer-id>"
        })
```

This returns a `nextAction` URL that you can redirect to for the customer to complete card authentication with their bank.

##### Customer Initiated Tokenised Payment
https://docs.pomelopay.com/docs/pomelo-pay-pci-connect/339c0ea39d9ab-customer-initiated-stored-credentials

```node

const customerInitiated = await client.cardPayments.customerInitiatedStoredCredentialsPayment({
            token: "<token>", // you can use the list or get token API to get tokens for a customer
            customerId: "<ustomer-id>",
            transactionId: "<transaction-id>"
        })
```

This returns a `nextAction` URL that you can redirect to for the customer to complete card authentication with their bank.

##### Merchant Initiated Tokenised Payment
https://docs.pomelopay.com/docs/pomelo-pay-pci-connect/ca602830ad71b-merchant-initiated-stored-credentials

```node

const customerInitiated = await client.cardPayments.merchantInitiatedStoredCredentials({
            token: "<token>", // you can use the list or get token API to get tokens for a customer
            customerId: "<ustomer-id>",
            transactionId: "<transaction-id>"
        })
```

This will immediately charge the card and return an approval auth code if the recurring contract ID is still valid with the cardholder


## Contributing to this API Client Development

Thank you for contributing to this client

- Use the same pattern for types and API operations
- Add integration test coverage
- Create an .env file in this project root with the following contents

```
API_KEY='<sandbox-api-key>'
APP_ID='<sandbox-app-id>'
TX_ID='<sandbox-transaction-od>'
CURRENCY='<sandbox-currency>'
CUSTOMER_ID='<sandbox-customer-id>'
MERCHANT_TOKEN='<sandbox-merchant-recurring-token>'
CUSTOMER_TOKEN='<sandbox-customer-recurring-token>'
```

- Run npm test:integration and verify all test succeeds
- Open a PR describing the changes


## About

⭐ Sign up as a merchant at https://dashboard.pomelopay.com and start receiving payments in seconds.
