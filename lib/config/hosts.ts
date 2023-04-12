export enum Config {
    tenantDomain = 'pomelopay.com',
    tenantSandboxDomain = 'dev.pomelopay.com'
}

export enum Hosts {
    // tenant main domain
    merchantApiProduction = `https://api.[tenantDomain]/public`,
    merchantApiSandbox = `https://api.[tenantSandboxDomain]/public`,
    customerApiProduction = `https://api.[tenantDomain]/public-customers`,
    customertApiSandbox = `https://api.[tenantSandboxDomain]/public-customers`,
    cardPaymentApiProduction = `https://api.pay.[tenantDomain]`,
    cardPaymentApiSandbox = `https://api.pay.[tenantSandboxDomain]`
}
