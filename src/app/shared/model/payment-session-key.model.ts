export interface PaymentSessionKey {
    status: string;
    failedreason: string;
    sessionkey: string;
    gw: Gw;
    redirectGatewayURL: string;
    GatewayPageURL: string;
    directPaymentURL: string;
    storeBanner: string;
    storeLogo: string;
    desc: Desc[];
    is_direct_pay_enable: string;
}

interface Desc {
    name: string;
    type: string;
    logo: string;
    gw: string;
}

interface Gw {
    visa: string;
    master: string;
    amex: string;
    othercards: string;
    internetbanking: string;
    mobilebanking: string;
}
